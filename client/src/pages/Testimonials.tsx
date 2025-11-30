import { useState } from 'react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { type Testimonial } from '@shared/schema';
import { Star, Send } from 'lucide-react';

function StarRating({ rating, onRatingChange, interactive = false }: { 
  rating: number; 
  onRatingChange?: (rating: number) => void;
  interactive?: boolean;
}) {
  const [hoverRating, setHoverRating] = useState(0);
  
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={!interactive}
          className={`transition-colors ${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'}`}
          onClick={() => interactive && onRatingChange?.(star)}
          onMouseEnter={() => interactive && setHoverRating(star)}
          onMouseLeave={() => interactive && setHoverRating(0)}
        >
          <Star 
            className={`h-6 w-6 ${
              (interactive ? (hoverRating || rating) : rating) >= star 
                ? 'fill-secondary text-secondary' 
                : 'text-gray-300'
            }`} 
          />
        </button>
      ))}
    </div>
  );
}

function ReviewForm() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [eventType, setEventType] = useState('');
  const [content, setContent] = useState('');
  const [rating, setRating] = useState(0);

  const submitMutation = useMutation({
    mutationFn: async (data: { name: string; eventType: string; content: string; rating: number }) => {
      return await apiRequest('POST', '/api/testimonials', data);
    },
    onSuccess: () => {
      toast({
        title: "Mulțumim pentru recenzia ta!",
        description: "Recenzia va fi publicată după aprobare.",
      });
      setName('');
      setEventType('');
      setContent('');
      setRating(0);
      queryClient.invalidateQueries({ queryKey: ['/api/testimonials'] });
    },
    onError: () => {
      toast({
        title: "Eroare",
        description: "Nu am putut trimite recenzia. Te rugăm să încerci din nou.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim() || !content.trim() || rating === 0) {
      toast({
        title: "Câmpuri incomplete",
        description: "Te rugăm să completezi numele, recenzia și să selectezi o notă.",
        variant: "destructive",
      });
      return;
    }
    
    submitMutation.mutate({ name, eventType, content, rating });
  };

  return (
    <Card className="mb-12 border-secondary/20">
      <CardHeader className="text-center">
        <CardTitle className="font-playfair text-2xl text-primary">Lasă o recenzie</CardTitle>
        <p className="text-muted-foreground text-sm mt-2">
          Ne-ar face plăcere să aflăm părerea ta despre experiența cu noi
        </p>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Numele tău *</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Ex: Maria Ionescu"
                data-testid="input-review-name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="eventType">Evenimentul</Label>
              <Input
                id="eventType"
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                placeholder="Ex: Nuntă, Botez, Workshop"
                data-testid="input-review-event"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <Label>Nota ta *</Label>
            <StarRating 
              rating={rating} 
              onRatingChange={setRating}
              interactive={true}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="content">Recenzia ta *</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Spune-ne despre experiența ta..."
              rows={4}
              data-testid="input-review-content"
            />
          </div>
          
          <Button 
            type="submit" 
            className="w-full md:w-auto bg-primary hover:bg-primary/90"
            disabled={submitMutation.isPending}
            data-testid="button-submit-review"
          >
            {submitMutation.isPending ? (
              "Se trimite..."
            ) : (
              <>
                <Send className="h-4 w-4 mr-2" />
                Trimite recenzia
              </>
            )}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}

export default function Testimonials() {
  const { data: testimonials, isLoading, error } = useQuery<Testimonial[]>({
    queryKey: ['/api/testimonials'],
  });

  if (error) {
    return (
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center text-red-500">
            <p>A apărut o eroare la încărcarea recenziilor. Vă rugăm încercați din nou mai târziu.</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl text-primary mb-4">Recenzii</h1>
          <p className="text-muted-foreground">Ce spun clienții noștri despre experiența lor</p>
        </div>
        
        <ReviewForm />
        
        {isLoading ? (
          <div className="space-y-12">
            {[1, 2].map((i) => (
              <div key={i} className="mb-12">
                <div className="flex justify-center mb-2">
                  <Skeleton className="h-5 w-32" />
                </div>
                <div className="text-center mb-4">
                  <Skeleton className="h-8 w-48 mx-auto" />
                </div>
                <div className="space-y-4">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-3/4" />
                </div>
              </div>
            ))}
          </div>
        ) : testimonials && testimonials.length > 0 ? (
          <div className="space-y-8">
            <h2 className="font-playfair text-xl text-primary text-center mb-8">Recenzii aprobate</h2>
            {testimonials.map((testimonial) => (
              <Card key={testimonial.id} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex justify-center mb-3">
                    <StarRating rating={testimonial.rating} />
                  </div>
                  <h3 className="font-playfair text-xl text-primary text-center mb-1">
                    {testimonial.name}
                  </h3>
                  {testimonial.eventType && (
                    <p className="text-sm text-secondary text-center mb-4">{testimonial.eventType}</p>
                  )}
                  <div className="text-muted-foreground text-center">
                    {testimonial.content.split('\n').map((paragraph, index) => (
                      <p key={index} className="mb-2">{paragraph}</p>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <div className="text-center text-muted-foreground py-8">
            <p>Nu există încă recenzii. Fii primul care lasă o recenzie!</p>
          </div>
        )}
      </div>
    </section>
  );
}
