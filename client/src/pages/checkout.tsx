import { useStripe, Elements, PaymentElement, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { useEffect, useState } from 'react';
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/hooks/use-auth";
import { useLocation } from "wouter";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

// Make sure to call `loadStripe` outside of a component's render to avoid
// recreating the `Stripe` object on every render
if (!import.meta.env.VITE_STRIPE_PUBLIC_KEY) {
  throw new Error('Missing required Stripe key: VITE_STRIPE_PUBLIC_KEY');
}

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

interface CheckoutFormProps {
  amount: number;
}

const CheckoutForm = ({ amount }: CheckoutFormProps) => {
  const stripe = useStripe();
  const elements = useElements();
  const { toast } = useToast();
  const [processing, setProcessing] = useState(false);
  const [, navigate] = useLocation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!stripe || !elements) {
      return;
    }
    
    setProcessing(true);

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: window.location.origin,
      },
    });

    if (error) {
      toast({
        title: "Plata a eșuat",
        description: error.message,
        variant: "destructive",
      });
      setProcessing(false);
    } else {
      toast({
        title: "Plată reușită",
        description: "Mulțumim pentru comandă!",
      });
      navigate("/");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <PaymentElement />
        <div className="text-sm text-muted-foreground">
          <p>* Toate datele sunt securizate și criptate</p>
        </div>
      </div>
      
      <div className="flex justify-between items-center border-t pt-4">
        <div>
          <p className="text-sm text-muted-foreground">Total de plată:</p>
          <p className="text-xl font-semibold">{amount} RON</p>
        </div>
        <Button 
          type="submit" 
          size="lg"
          disabled={!stripe || processing}
        >
          {processing ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Se procesează...
            </>
          ) : (
            "Finalizează plata"
          )}
        </Button>
      </div>
    </form>
  );
};

export default function Checkout() {
  const [clientSecret, setClientSecret] = useState("");
  const [amount, setAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user, isLoading } = useAuth();
  const [, navigate] = useLocation();
  
  useEffect(() => {
    // Check if user is authenticated
    if (!isLoading && !user) {
      navigate("/auth");
      return;
    }
    
    // Create PaymentIntent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        setLoading(true);
        const res = await apiRequest("POST", "/api/create-payment-intent");
        const data = await res.json();
        
        if (res.ok) {
          setClientSecret(data.clientSecret);
          setAmount(data.amount);
        } else {
          setError(data.message || "Eroare la procesarea plății");
        }
      } catch (err) {
        setError("Nu s-a putut conecta la server. Vă rugăm încercați din nou.");
        console.error("Error creating payment intent:", err);
      } finally {
        setLoading(false);
      }
    };

    if (user) {
      createPaymentIntent();
    }
  }, [user, isLoading, navigate]);

  if (isLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-10 h-10 animate-spin mx-auto mb-4 text-primary" />
          <p className="text-muted-foreground">Se încarcă detaliile plății...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle className="text-destructive">Eroare la procesarea plății</CardTitle>
            <CardDescription>
              Nu am putut procesa plata dumneavoastră
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="mb-4">{error}</p>
            <p className="text-sm text-muted-foreground">
              Coșul dumneavoastră este posibil să fie gol sau a intervenit o eroare la procesare.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/")}>
              Înapoi la pagina principală
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  if (!clientSecret) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader>
            <CardTitle>Nu s-a putut inițializa plata</CardTitle>
            <CardDescription>
              A apărut o eroare la inițializarea plății
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              Coșul dvs. este posibil să fie gol. Adăugați produse în coș pentru a continua.
            </p>
          </CardContent>
          <CardFooter>
            <Button onClick={() => navigate("/shop")}>
              Înapoi la magazin
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }

  // Make SURE to wrap the form in <Elements> which provides the stripe context
  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-playfair text-foreground mb-2">Finalizare comandă</h1>
          <p className="text-muted-foreground">
            Introduceți detaliile plății pentru a finaliza comanda
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Detaliile plății</CardTitle>
            <CardDescription>
              Toate tranzacțiile sunt securizate și criptate
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Elements stripe={stripePromise} options={{ clientSecret, locale: 'ro' }}>
              <CheckoutForm amount={amount} />
            </Elements>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}