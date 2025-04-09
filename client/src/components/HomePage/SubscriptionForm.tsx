import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSubscription } from '@/hooks/useSubscription';

export default function SubscriptionForm() {
  const { email, setEmail, handleSubscribe, isLoading } = useSubscription();

  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center">
        <h3 className="font-playfair text-lg text-primary mb-2">Abonează-te la noutăți și primești un</h3>
        <p className="text-2xl font-playfair text-primary font-semibold mb-6">COD DE REDUCERE de 10%!</p>
        
        <div className="max-w-md mx-auto">
          <form 
            className="flex flex-col md:flex-row gap-4"
            onSubmit={(e) => {
              e.preventDefault();
              handleSubscribe();
            }}
          >
            <Input
              type="email"
              placeholder="Adresa ta de email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 border border-gray-300 rounded flex-grow"
            />
            <Button 
              type="submit" 
              className="bg-primary text-white px-6 py-3 font-medium rounded hover:bg-opacity-90 transition"
              disabled={isLoading}
            >
              {isLoading ? 'Se procesează...' : 'ABONARE'}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}
