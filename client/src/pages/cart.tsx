import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Trash, MinusCircle, PlusCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Layout from "@/components/Layout";

interface CartProduct {
  id: number;
  name: string;
  price: string;
  imageUrl: string;
  category: string;
  description: string;
}

interface CartItem {
  id: number;
  productId: number;
  quantity: number;
  cartId: number;
  product: CartProduct;
}

interface Cart {
  id: number;
  items: CartItem[];
}

export default function Cart() {
  const { user, isLoading: authLoading } = useAuth();
  const [, navigate] = useLocation();
  const { toast } = useToast();

  const { data: cart, isLoading, error, refetch } = useQuery<Cart>({
    queryKey: ["/api/cart"],
    enabled: !!user,
  });

  const updateCartItemMutation = useMutation({
    mutationFn: async ({ id, quantity }: { id: number; quantity: number }) => {
      const res = await apiRequest("PUT", `/api/cart/items/${id}`, { quantity });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Coș actualizat",
        description: "Cantitatea a fost actualizată cu succes",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Eroare",
        description: error.message || "Nu s-a putut actualiza cantitatea",
        variant: "destructive",
      });
    },
  });

  const removeCartItemMutation = useMutation({
    mutationFn: async (id: number) => {
      await apiRequest("DELETE", `/api/cart/items/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/cart"] });
      toast({
        title: "Produs eliminat",
        description: "Produsul a fost eliminat din coș",
      });
    },
    onError: (error: any) => {
      toast({
        title: "Eroare",
        description: error.message || "Nu s-a putut elimina produsul",
        variant: "destructive",
      });
    },
  });

  // Calculate total
  const calculateTotal = () => {
    if (!cart || !cart.items || cart.items.length === 0) return 0;
    
    return cart.items.reduce((total, item) => {
      return total + parseFloat(item.product.price) * item.quantity;
    }, 0);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!authLoading && !user) {
      navigate("/auth");
    }
  }, [user, authLoading, navigate]);

  if (authLoading || isLoading) {
    return (
      <Layout>
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  if (error) {
    return (
      <Layout>
        <div className="container py-12">
          <div className="text-center">
            <h1 className="text-2xl font-playfair text-primary mb-4">Eroare</h1>
            <p className="text-muted-foreground mb-6">
              Nu am putut încărca coșul de cumpărături. Vă rugăm să încercați din nou.
            </p>
            <Button onClick={() => refetch()}>Încearcă din nou</Button>
          </div>
        </div>
      </Layout>
    );
  }

  // Cart is empty
  if (!cart || !cart.items || cart.items.length === 0) {
    return (
      <Layout>
        <div className="container py-12">
          <h1 className="text-3xl font-playfair text-primary mb-8 text-center">Coșul meu</h1>
          
          <Card className="max-w-lg mx-auto">
            <CardHeader className="text-center">
              <ShoppingBag className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
              <CardTitle>Coșul tău este gol</CardTitle>
            </CardHeader>
            <CardContent className="text-center">
              <p className="text-muted-foreground mb-6">
                Nu ai produse în coșul de cumpărături. Descoperă produsele noastre și adaugă-le în coș.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button onClick={() => navigate("/shop")}>
                Explorează magazinul
              </Button>
            </CardFooter>
          </Card>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container py-12">
        <h1 className="text-3xl font-playfair text-primary mb-8 text-center">Coșul meu</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Produse ({cart.items.length})</CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <ul className="divide-y">
                  {cart.items.map((item) => (
                    <li key={item.id} className="p-4 flex">
                      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border">
                        <img
                          src={item.product.imageUrl}
                          alt={item.product.name}
                          className="h-full w-full object-cover object-center"
                        />
                      </div>
                      
                      <div className="ml-4 flex flex-1 flex-col">
                        <div>
                          <div className="flex justify-between text-base font-medium">
                            <h3>{item.product.name}</h3>
                            <p className="ml-4">{parseFloat(item.product.price) * item.quantity} RON</p>
                          </div>
                          <p className="mt-1 text-sm text-muted-foreground">
                            Categorie: {item.product.category}
                          </p>
                        </div>
                        
                        <div className="flex flex-1 items-end justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => {
                                if (item.quantity > 1) {
                                  updateCartItemMutation.mutate({
                                    id: item.id,
                                    quantity: item.quantity - 1
                                  });
                                }
                              }}
                              disabled={item.quantity <= 1 || updateCartItemMutation.isPending}
                            >
                              <MinusCircle className="h-4 w-4" />
                            </Button>
                            <span>{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-8 w-8 rounded-full"
                              onClick={() => {
                                updateCartItemMutation.mutate({
                                  id: item.id,
                                  quantity: item.quantity + 1
                                });
                              }}
                              disabled={updateCartItemMutation.isPending}
                            >
                              <PlusCircle className="h-4 w-4" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeCartItemMutation.mutate(item.id)}
                            disabled={removeCartItemMutation.isPending}
                          >
                            <Trash className="h-4 w-4 mr-2" />
                            Elimină
                          </Button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Sumar comandă</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{calculateTotal().toFixed(2)} RON</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Livrare</span>
                    <span>Calculată la checkout</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col">
                <div className="flex justify-between font-bold mb-4 text-lg w-full">
                  <span>Total</span>
                  <span>{calculateTotal().toFixed(2)} RON</span>
                </div>
                <Button 
                  className="w-full" 
                  size="lg"
                  onClick={() => navigate("/checkout")}
                >
                  Finalizează comanda
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
}