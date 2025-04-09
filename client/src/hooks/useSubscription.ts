import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface SubscribeResponse {
  message: string;
  discountCode?: string;
}

export function useSubscription() {
  const [email, setEmail] = useState('');
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('POST', '/api/subscribe', { email });
      return response.json() as Promise<SubscribeResponse>;
    },
    onSuccess: (data) => {
      toast({
        title: 'Mulțumim pentru abonare!',
        description: `Codul tău de reducere este: ${data.discountCode || 'MILK&HONEY10'}`,
        variant: 'default',
      });
      setEmail('');
    },
    onError: (error: Error) => {
      toast({
        title: 'Eroare',
        description: error.message || 'A apărut o eroare. Vă rugăm încercați din nou.',
        variant: 'destructive',
      });
    }
  });

  const handleSubscribe = () => {
    if (!email) {
      toast({
        title: 'Formular incomplet',
        description: 'Vă rugăm să introduceți adresa de email.',
        variant: 'destructive',
      });
      return;
    }
    
    mutation.mutate(email);
  };

  return {
    email,
    setEmail,
    handleSubscribe,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error
  };
}
