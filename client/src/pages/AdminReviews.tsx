import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { type Testimonial } from '@shared/schema';
import { Star, Trash2, Lock, LogOut } from 'lucide-react';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star 
          key={star}
          className={`h-4 w-4 ${rating >= star ? 'fill-secondary text-secondary' : 'text-gray-300'}`} 
        />
      ))}
    </div>
  );
}

export default function AdminReviews() {
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [storedPassword, setStoredPassword] = useState('');

  const verifyMutation = useMutation({
    mutationFn: async (pwd: string) => {
      const response = await apiRequest('POST', '/api/admin/verify', { password: pwd });
      return response.json();
    },
    onSuccess: () => {
      setIsAuthenticated(true);
      setStoredPassword(password);
      toast({ title: "Autentificare reușită" });
    },
    onError: () => {
      toast({ 
        title: "Parolă incorectă", 
        variant: "destructive" 
      });
    },
  });

  const { data: testimonials, isLoading } = useQuery<Testimonial[]>({
    queryKey: ['/api/admin/testimonials'],
    queryFn: async () => {
      const response = await apiRequest('POST', '/api/admin/testimonials', { password: storedPassword });
      return response.json();
    },
    enabled: isAuthenticated,
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await fetch(`/api/admin/testimonials/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: storedPassword }),
      });
      if (!response.ok) throw new Error('Failed to delete');
      return response.json();
    },
    onSuccess: () => {
      toast({ title: "Recenzia a fost ștearsă" });
      queryClient.invalidateQueries({ queryKey: ['/api/admin/testimonials'] });
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
    },
    onError: () => {
      toast({ 
        title: "Eroare la ștergere", 
        variant: "destructive" 
      });
    },
  });

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password.trim()) {
      verifyMutation.mutate(password);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setStoredPassword('');
    setPassword('');
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <Lock className="h-12 w-12 mx-auto text-primary mb-4" />
            <CardTitle className="font-playfair text-2xl">Administrare Recenzii</CardTitle>
            <p className="text-muted-foreground text-sm mt-2">
              Introduceți parola pentru a accesa pagina
            </p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Parola"
                data-testid="input-admin-password"
              />
              <Button 
                type="submit" 
                className="w-full"
                disabled={verifyMutation.isPending}
                data-testid="button-admin-login"
              >
                {verifyMutation.isPending ? "Se verifică..." : "Autentificare"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="font-playfair text-3xl text-primary">Administrare Recenzii</h1>
          <Button 
            variant="outline" 
            onClick={handleLogout}
            data-testid="button-admin-logout"
          >
            <LogOut className="h-4 w-4 mr-2" />
            Deconectare
          </Button>
        </div>

        {isLoading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Se încarcă recenziile...</p>
          </div>
        ) : testimonials && testimonials.length > 0 ? (
          <div className="space-y-4">
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} data-testid={`card-review-${testimonial.id}`}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <StarRating rating={testimonial.rating} />
                        <span className="font-semibold text-primary">{testimonial.name}</span>
                        {testimonial.eventType && (
                          <span className="text-sm text-secondary">• {testimonial.eventType}</span>
                        )}
                      </div>
                      <p className="text-muted-foreground">{testimonial.content}</p>
                      {testimonial.createdAt && (
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(testimonial.createdAt).toLocaleDateString('ro-RO')}
                        </p>
                      )}
                    </div>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(testimonial.id)}
                      disabled={deleteMutation.isPending}
                      data-testid={`button-delete-review-${testimonial.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-12 text-center">
              <p className="text-muted-foreground">Nu există recenzii de administrat.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
