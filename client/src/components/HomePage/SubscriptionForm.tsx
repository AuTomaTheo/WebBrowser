import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useSubscription } from '@/hooks/useSubscription';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { Copy, Check, Gift } from 'lucide-react';

export default function SubscriptionForm() {
  const { email, setEmail, handleSubscribe, isLoading, showSuccessDialog, closeSuccessDialog, discountCode } = useSubscription();
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(discountCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <>
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

      <Dialog open={showSuccessDialog} onOpenChange={closeSuccessDialog}>
        <DialogContent className="sm:max-w-lg p-8 text-center">
          <div className="flex justify-center mb-4">
            <div className="bg-secondary/20 rounded-full p-4">
              <Gift className="h-12 w-12 text-secondary" />
            </div>
          </div>
          
          <DialogTitle className="text-2xl font-playfair text-primary mb-2">
            Mulțumim pentru abonare!
          </DialogTitle>
          
          <DialogDescription className="text-gray-600 text-base mb-6">
            Bine ai venit în comunitatea Atelierul cu Flori! Folosește codul de mai jos pentru a beneficia de 10% reducere la prima comandă.
          </DialogDescription>
          
          <div className="bg-gray-50 border-2 border-dashed border-secondary rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-500 mb-2">Codul tău de reducere:</p>
            <p className="text-3xl font-bold text-primary tracking-wide">{discountCode}</p>
          </div>
          
          <Button 
            onClick={handleCopy}
            className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-base"
            data-testid="copy-discount-code"
          >
            {copied ? (
              <>
                <Check className="h-5 w-5 mr-2" />
                Cod copiat!
              </>
            ) : (
              <>
                <Copy className="h-5 w-5 mr-2" />
                Copiază codul
              </>
            )}
          </Button>
        </DialogContent>
      </Dialog>
    </>
  );
}
