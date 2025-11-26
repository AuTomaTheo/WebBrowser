import { useState } from 'react';
import { apiRequest } from '@/lib/queryClient';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useToast } from '@/hooks/use-toast';

interface SubscribeResponse {
  message: string;
  discountCode?: string;
}

const DISCOUNT_CODE = 'atelierulcuflori10';

export function useSubscription() {
  const [email, setEmail] = useState('');
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (email: string) => {
      const response = await apiRequest('POST', '/api/subscribe', { email });
      return response.json() as Promise<SubscribeResponse>;
    },
    onSuccess: () => {
      setEmail('');
      setShowSuccessDialog(true);
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

  const closeSuccessDialog = () => {
    setShowSuccessDialog(false);
  };

  return {
    email,
    setEmail,
    handleSubscribe,
    isLoading: mutation.isPending,
    isSuccess: mutation.isSuccess,
    isError: mutation.isError,
    error: mutation.error,
    showSuccessDialog,
    closeSuccessDialog,
    discountCode: DISCOUNT_CODE
  };
}
