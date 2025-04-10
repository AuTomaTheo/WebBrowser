import { Helmet } from "react-helmet";
import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Heart, ShoppingCart } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { apiRequest, queryClient } from "@/lib/queryClient";
import { useQuery, useMutation } from "@tanstack/react-query";

const categories = [
  { id: "all", name: "Toate Produsele" },
  { id: "bouquets", name: "Buchete de Flori" },
  { id: "arrangements", name: "Aranjamente Florale" },
  { id: "christmas", name: "Decorațiuni de Crăciun" },
  { id: "special", name: "Ocazii Speciale" },
];

const products = [
  {
    id: 1,
    name: "Buchet Romantic",
    price: 180,
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "bouquets",
  },
  {
    id: 2,
    name: "Aranjament Elegant",
    price: 250,
    image: "https://images.unsplash.com/photo-1484900893291-c5f9f0e68db1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "arrangements",
  },
  {
    id: 3,
    name: "Coronița de Crăciun",
    price: 170,
    image: "https://images.unsplash.com/photo-1606654810102-9ed643d0dcbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "christmas",
  },
  {
    id: 4,
    name: "Buchet Aniversar",
    price: 200,
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "special",
  },
  {
    id: 5,
    name: "Aranjament de Masă",
    price: 220,
    image: "https://images.unsplash.com/photo-1516476892398-bdcab4c8dab8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "arrangements",
  },
  {
    id: 6,
    name: "Buchet Trandafiri",
    price: 190,
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "bouquets",
  },
  {
    id: 7,
    name: "Brad Decorat",
    price: 350,
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "christmas",
  },
  {
    id: 8,
    name: "Buchet Mireasă",
    price: 280,
    image: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "special",
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");
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
  const handleWishlistToggle = (productId: number) => {
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
  const handleAddToCart = (productId: number) => {
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

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Shop - Atelierul cu flori</title>
        <meta name="description" content="Descoperă selecția noastră de buchete de flori, aranjamente florale și decorațiuni pentru orice ocazie." />
      </Helmet>
      
      <section className="py-12 bg-[#F5F5F0]">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl text-center mb-8">Shop</h1>
          
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="w-full flex overflow-x-auto p-1 bg-white rounded-lg">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex-1 whitespace-nowrap px-4"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="font-serif text-lg">{product.name}</h3>
                    <button 
                      onClick={(e) => {
                        e.preventDefault();
                        handleWishlistToggle(product.id);
                      }}
                      className={`p-1.5 rounded-full transition duration-200 ${
                        wishlistMap[product.id] 
                          ? 'text-red-500 bg-red-50 hover:bg-red-100' 
                          : 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                      }`}
                      aria-label={wishlistMap[product.id] ? "Remove from wishlist" : "Add to wishlist"}
                    >
                      <Heart className={`h-5 w-5 ${wishlistMap[product.id] ? 'fill-current' : ''}`} />
                    </button>
                  </div>
                  <p className="text-accent font-medium mb-3">{product.price} lei</p>
                  <button 
                    onClick={() => handleAddToCart(product.id)}
                    className="w-full bg-primary hover:bg-opacity-90 text-white py-2 rounded-md transition flex items-center justify-center gap-2"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    <span>Adaugă în coș</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
