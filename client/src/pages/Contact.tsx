import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl text-primary mb-6">CONTACT</h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Contactează-ne pentru orice întrebare sau pentru a programa o consultație personalizată.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="font-dancing text-2xl text-primary mb-6">Scrie-ne un mesaj</h2>
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nume
                  </label>
                  <Input 
                    id="name" 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    placeholder="Numele tău"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input 
                    id="email" 
                    type="email" 
                    className="w-full p-2 border border-gray-300 rounded" 
                    placeholder="Adresa ta de email"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                  Subiect
                </label>
                <Input 
                  id="subject" 
                  type="text" 
                  className="w-full p-2 border border-gray-300 rounded" 
                  placeholder="Subiectul mesajului"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mesaj
                </label>
                <Textarea 
                  id="message" 
                  className="w-full p-2 border border-gray-300 rounded" 
                  rows={6} 
                  placeholder="Mesajul tău"
                />
              </div>
              <Button type="submit" className="bg-primary text-white px-6 py-3">
                Trimite mesajul
              </Button>
            </form>
          </div>
          <div>
            <h2 className="font-dancing text-2xl text-primary mb-6">Informații de contact</h2>
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <MapPin className="h-6 w-6 text-secondary flex-shrink-0" />
                  <div>
                    <h3 className="font-playfair text-primary mb-1">Adresă</h3>
                    <p className="text-muted-foreground">Strada Florilor nr. 123, Sector 1, București</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Phone className="h-6 w-6 text-secondary flex-shrink-0" />
                  <div>
                    <h3 className="font-playfair text-primary mb-1">Telefon</h3>
                    <p className="text-muted-foreground">+40 712 345 678</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Mail className="h-6 w-6 text-secondary flex-shrink-0" />
                  <div>
                    <h3 className="font-playfair text-primary mb-1">Email</h3>
                    <p className="text-muted-foreground">contact@atelierulcuflori.ro</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="p-6 flex items-start space-x-4">
                  <Clock className="h-6 w-6 text-secondary flex-shrink-0" />
                  <div>
                    <h3 className="font-playfair text-primary mb-1">Program</h3>
                    <p className="text-muted-foreground">Luni - Vineri: 09:00 - 18:00</p>
                    <p className="text-muted-foreground">Sâmbătă: 10:00 - 16:00</p>
                    <p className="text-muted-foreground">Duminică: Închis</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
