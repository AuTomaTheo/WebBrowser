import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { Heart, Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useLocation } from 'wouter';

export default function WishlistPage() {
  const { user } = useAuth();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Fetch user's wishlist
  const { data: wishlist, isLoading } = useQuery({
    queryKey: ['/api/wishlist'],
    queryFn: async () => {
      if (!user) return null;
      const response = await apiRequest('GET', '/api/wishlist');
      if (!response.ok) throw new Error('Failed to fetch wishlist');
      return response.json();
    },
    enabled: !!user,
  });

  // Remove from wishlist mutation
  const removeFromWishlistMutation = useMutation({
    mutationFn: async (itemId: number) => {
      const response = await apiRequest('DELETE', `/api/wishlist/items/${itemId}`);
      if (!response.ok) throw new Error('Failed to remove from wishlist');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/wishlist'] });
      toast({
        title: "Articolul a fost eliminat din favorite",
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

  // Handle remove from wishlist
  const handleRemoveFromWishlist = (itemId: number) => {
    removeFromWishlistMutation.mutate(itemId);
  };

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!user && !isLoading) {
      toast({
        title: "Trebuie să fii autentificat",
        description: "Pentru a vedea lista de favorite, te rugăm să te autentifici.",
        variant: "default",
      });
      setLocation('/auth');
    }
  }, [user, isLoading, setLocation, toast]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[50vh]">
        <div className="animate-spin w-10 h-10 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Lista de favorite - Atelierul cu flori</title>
        <meta name="description" content="Lista ta de produse favorite de la Atelierul cu flori." />
      </Helmet>
      
      <div className="py-12 bg-[#F5F5F0]">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl text-center mb-8">Lista de favorite</h1>
          
          {!wishlist?.items?.length ? (
            <div className="bg-white p-8 rounded-lg shadow-sm text-center">
              <Heart className="mx-auto h-12 w-12 text-gray-300 mb-4" />
              <h2 className="text-xl font-serif mb-2">Lista ta de favorite este goală</h2>
              <p className="text-gray-500">Nu ai adăugat încă niciun articol la favorite.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlist.items.map((item: any) => (
                <Card key={item.id} className="overflow-hidden">
                  <div className="relative h-64 overflow-hidden">
                    <img 
                      src={item.itemImageUrl || 'https://via.placeholder.com/300'} 
                      alt={item.itemName || 'Item'} 
                      className="w-full h-full object-cover"
                    />
                    <button
                      onClick={() => handleRemoveFromWishlist(item.id)}
                      className="absolute top-3 right-3 p-2 rounded-full bg-red-100 text-red-500 hover:bg-red-200 transition-colors"
                      aria-label="Remove from wishlist"
                      data-testid={`button-remove-wishlist-${item.id}`}
                    >
                      <Heart className="h-5 w-5 fill-current" />
                    </button>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif text-lg mb-2" data-testid={`text-item-name-${item.id}`}>{item.itemName}</h3>
                    {item.itemDescription && (
                      <p className="text-sm text-gray-600 mb-2" data-testid={`text-item-description-${item.id}`}>{item.itemDescription}</p>
                    )}
                    <div className="flex justify-end">
                      <button
                        onClick={() => handleRemoveFromWishlist(item.id)}
                        className="rounded-full p-2 hover:bg-gray-100 text-gray-700"
                        aria-label="Remove from wishlist"
                        data-testid={`button-delete-wishlist-${item.id}`}
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}