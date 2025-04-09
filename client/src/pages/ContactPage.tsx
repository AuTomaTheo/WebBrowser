import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, { message: "Numele trebuie să conțină cel puțin 2 caractere" }),
  email: z.string().email({ message: "Adresa de email invalidă" }),
  phone: z.string().min(10, { message: "Numărul de telefon trebuie să conțină cel puțin 10 caractere" }),
  subject: z.string().min(2, { message: "Subiectul trebuie să conțină cel puțin 2 caractere" }),
  message: z.string().min(10, { message: "Mesajul trebuie să conțină cel puțin 10 caractere" }),
});

type FormValues = z.infer<typeof formSchema>;

export default function ContactPage() {
  const { toast } = useToast();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log(data);
    toast({
      title: "Mesaj trimis",
      description: "Vom reveni cu un răspuns în cel mai scurt timp posibil.",
    });
    form.reset();
  };

  return (
    <>
      <Helmet>
        <title>Contact - Atelierul cu flori</title>
        <meta name="description" content="Contactează echipa Atelierul cu flori pentru orice întrebări despre serviciile noastre, pentru a programa o consultație sau pentru a solicita o ofertă personalizată." />
      </Helmet>
      
      <section className="py-12 bg-[#F5F5F0]">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl text-center mb-12">Contact</h1>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            <div>
              <h2 className="font-serif text-2xl text-primary mb-6">Informații de contact</h2>
              
              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <MapPin className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Adresă</h3>
                    <p className="text-gray-600">Str. Florilor nr. 123, Sector 1<br />București, România</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Telefon</h3>
                    <p className="text-gray-600">+40 123 456 789</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Mail className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Email</h3>
                    <p className="text-gray-600">contact@atelierulcuflori.ro</p>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="h-5 w-5 text-primary mr-3 mt-1" />
                  <div>
                    <h3 className="font-medium mb-1">Program</h3>
                    <p className="text-gray-600">
                      Luni - Vineri: 09:00 - 18:00<br />
                      Sâmbătă: 10:00 - 16:00<br />
                      Duminică: Închis
                    </p>
                  </div>
                </div>
              </div>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="font-serif text-xl text-primary mb-4">Programare consultație</h3>
                <p className="text-gray-600 mb-4">
                  Pentru evenimente și proiecte personalizate, te invităm la o consultație în atelierul nostru. Contactează-ne pentru a programa o întâlnire.
                </p>
                <Button className="bg-primary hover:bg-opacity-90 text-white w-full">
                  PROGRAMEAZĂ O CONSULTAȚIE
                </Button>
              </div>
            </div>
            
            <div>
              <h2 className="font-serif text-2xl text-primary mb-6">Trimite-ne un mesaj</h2>
              
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Nume</FormLabel>
                          <FormControl>
                            <Input placeholder="Numele tău" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="Email-ul tău" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={form.control}
                        name="phone"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Telefon</FormLabel>
                            <FormControl>
                              <Input placeholder="Numărul tău de telefon" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subiect</FormLabel>
                          <FormControl>
                            <Input placeholder="Subiectul mesajului" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Mesaj</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Scrie-ne mesajul tău..." 
                              className="min-h-32" 
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <Button type="submit" className="bg-accent hover:bg-opacity-90 text-white w-full">
                      TRIMITE MESAJ
                    </Button>
                  </form>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
