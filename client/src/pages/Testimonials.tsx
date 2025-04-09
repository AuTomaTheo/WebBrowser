import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '@/components/ui/skeleton';
import { type Testimonial } from '@shared/schema';
import { Star } from 'lucide-react';

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
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-5/6" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="mb-16">
            {testimonials?.map((testimonial) => (
              <div key={testimonial.id} className="mb-12">
                <div className="flex justify-center mb-2">
                  <div className="text-secondary flex">
                    {Array.from({ length: testimonial.rating }, (_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                </div>
                <h3 className="font-dancing text-2xl text-primary text-center mb-4">{testimonial.name}</h3>
                <div className="text-muted-foreground space-y-4">
                  {testimonial.content.split('\n').map((paragraph, index) => (
                    <p key={index}>{paragraph}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
