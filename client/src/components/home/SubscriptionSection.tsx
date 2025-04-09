import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

const subscriptionSchema = z.object({
  email: z.string().email("Adresa de email este invalidă"),
});

type SubscriptionFormValues = z.infer<typeof subscriptionSchema>;

export default function SubscriptionSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const form = useForm<SubscriptionFormValues>({
    resolver: zodResolver(subscriptionSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: SubscriptionFormValues) => {
    setIsSubmitting(true);
    try {
      await apiRequest("POST", "/api/subscribe", { email: data.email });
      toast({
        title: "Mulțumim pentru abonare!",
        description: "Vei primi curând codul tău de reducere de 10%.",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Eroare",
        description: "Nu am putut procesa abonarea. Te rugăm să încerci din nou.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-12 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h3 className="font-serif text-2xl mb-2">Abonează-te la noutăți și primești un</h3>
        <p className="text-xl font-medium text-accent mb-6">COD DE REDUCERE de 10%!</p>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="flex flex-col md:flex-row gap-3">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-grow">
                    <FormControl>
                      <Input
                        placeholder="Adresa ta de email"
                        className="px-4 py-3 border border-gray-300 rounded-md"
                        {...field}
                        disabled={isSubmitting}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                className="bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-6"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Se procesează..." : "ABONARE"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </section>
  );
}
