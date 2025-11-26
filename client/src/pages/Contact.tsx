import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

export default function Contact() {
  return (
    <div className="py-16 bg-white min-h-[70vh]">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl text-primary mb-6">CONTACT</h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Suntem aici pentru tine. Alege modalitatea preferată de a ne contacta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <a 
            href="tel:+40712345678"
            className="group"
            data-testid="link-phone"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Phone className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-playfair text-lg text-primary mb-2">Telefon</h3>
                <p className="text-muted-foreground group-hover:text-primary transition-colors">+40 712 345 678</p>
              </CardContent>
            </Card>
          </a>
          
          <a 
            href="mailto:contact@atelierulcuflori.ro"
            className="group"
            data-testid="link-email"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Mail className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-playfair text-lg text-primary mb-2">Email</h3>
                <p className="text-muted-foreground group-hover:text-primary transition-colors">contact@atelierulcuflori.ro</p>
              </CardContent>
            </Card>
          </a>
          
          <a 
            href="https://instagram.com/atelierulcuflori"
            target="_blank"
            rel="noopener noreferrer"
            className="group"
            data-testid="link-instagram"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <SiInstagram className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-playfair text-lg text-primary mb-2">Instagram</h3>
                <p className="text-muted-foreground group-hover:text-primary transition-colors">@atelierulcuflori</p>
              </CardContent>
            </Card>
          </a>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Card className="border-0 shadow-sm">
            <CardContent className="p-8 md:p-10">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <MapPin className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-playfair text-primary mb-1">Locație</h3>
                      <p className="text-muted-foreground">
                        Strada Florilor nr. 123<br />
                        Sector 1, București
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4">
                    <Clock className="h-5 w-5 text-secondary flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-playfair text-primary mb-1">Program</h3>
                      <p className="text-muted-foreground">
                        Luni - Vineri: 09:00 - 18:00<br />
                        Sâmbătă: 10:00 - 16:00<br />
                        Duminică: Închis
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-end">
                  <div className="text-center md:text-right">
                    <p className="text-muted-foreground text-sm mb-2">Te așteptăm cu drag</p>
                    <p className="font-playfair text-2xl text-primary">Atelierul cu flori</p>
                    <div className="mt-4 flex justify-center md:justify-end gap-4">
                      <a 
                        href="https://instagram.com/atelierulcuflori"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-primary transition-colors"
                        aria-label="Instagram"
                        data-testid="link-instagram-footer"
                      >
                        <SiInstagram className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
