import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';
import { useState, useEffect } from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/use-auth';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useQuery, useMutation } from '@tanstack/react-query';

const products = [
  {
    id: 1,
    title: "Buchet Primăvară",
    price: 180,
    image: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Aranjament Festiv",
    price: 250,
    image: "https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Buchet Trandafiri",
    price: 200,
    image: "https://images.unsplash.com/photo-1537033206914-9d3551ff8103?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Aranjament Rustic",
    price: 220,
    image: "https://images.unsplash.com/photo-1455659817273-f96807779a8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 5,
    title: "Buchet Mixt",
    price: 190,
    image: "https://images.unsplash.com/photo-1542212237-a2665b5cd2ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 6,
    title: "Aranjament de Masă",
    price: 170,
    image: "https://images.unsplash.com/photo-1531120364508-a6b656c3e78d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

export default function Shop() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [wishlistMap, setWishlistMap] = useState<Record<number, boolean>>({});

  // Fetch user's wishlist if logged in
  const { data: wishlist, isLoading: isWishlistLoading } = useQuery({
    queryKey: ['/api/wishlist'],
    queryFn: async () => {
      if (!user) return null;
      const response = await apiRequest('GET', '/api/wishlist');
      if (!response.ok) throw new Error('Failed to fetch wishlist');
      return response.json();
    },
    enabled: !!user,
  });

  // Update wishlist map when data is received
  useEffect(() => {
    if (wishlist?.items) {
      const newWishlistMap: Record<number, boolean> = {};
      wishlist.items.forEach((item: any) => {
        newWishlistMap[item.productId] = true;
      });
      setWishlistMap(newWishlistMap);
    }
  }, [wishlist]);

  // Add to wishlist mutation
  const addToWishlistMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest('POST', '/api/wishlist/items', { productId });
      if (!response.ok) throw new Error('Failed to add to wishlist');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] });
      toast({
        title: "Produsul a fost adăugat la favorite",
        description: "Poți găsi lista de favorite în profilul tău.",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Eroare",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation({
    mutationFn: async (productId: number) => {
      const response = await apiRequest('DELETE', `/api/wishlist/items/${productId}`);
      if (!response.ok) throw new Error('Failed to remove from wishlist');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] });
      toast({
        title: "Produsul a fost eliminat din favorite",
        variant: "default",
      });
    },
    onError: (error: Error) => {
      toast({
        title: "Eroare",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  // Handle wishlist toggle
  const handleWishlistToggle = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Trebuie să fii autentificat",
        description: "Pentru a adăuga produse la favorite, te rugăm să te autentifici.",
        variant: "default",
      });
      return;
    }

    if (wishlistMap[productId]) {
      removeFromWishlistMutation.mutate(productId);
    } else {
      addToWishlistMutation.mutate(productId);
    }
  };

  // Add to cart handler
  const handleAddToCart = (e: React.MouseEvent, productId: number) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      toast({
        title: "Trebuie să fii autentificat",
        description: "Pentru a adăuga produse în coș, te rugăm să te autentifici.",
        variant: "default",
      });
      return;
    }

    toast({
      title: "Produsul a fost adăugat în coș",
      variant: "default",
    });
  };

  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl text-primary mb-6">FLORĂRIE ONLINE</h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descoperă colecția noastră de buchete și aranjamente florale, create cu pasiune pentru a aduce bucurie și culoare în viața ta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
            <div key={product.id} className="relative group">
              <Link href={`/shop/product/${product.id}`}>
                <a className="block">
                  <Card className="overflow-hidden">
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                      <button
                        onClick={(e) => handleWishlistToggle(e, product.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                          wishlistMap[product.id] 
                            ? 'bg-red-100 text-red-500' 
                            : 'bg-white/80 text-gray-500 hover:bg-white'
                        }`}
                        aria-label={wishlistMap[product.id] ? "Remove from wishlist" : "Add to wishlist"}
                      >
                        <Heart className={`h-5 w-5 ${wishlistMap[product.id] ? 'fill-current' : ''}`} />
                      </button>
                    </div>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-playfair text-primary text-lg">{product.title}</h3>
                      </div>
                      <div className="flex justify-between items-center">
                        <p className="text-secondary font-semibold">{product.price} lei</p>
                        <button
                          onClick={(e) => handleAddToCart(e, product.id)}
                          className="rounded-full p-2 hover:bg-gray-100 text-gray-700"
                        >
                          <ShoppingCart className="h-5 w-5" />
                        </button>
                      </div>
                    </CardContent>
                  </Card>
                </a>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
