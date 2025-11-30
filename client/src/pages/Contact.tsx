import { Card, CardContent } from '@/components/ui/card';
import { Phone, Mail } from 'lucide-react';
import { SiInstagram } from 'react-icons/si';

export default function Contact() {
  return (
    <div className="py-16 bg-white min-h-[70vh] flex items-center">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl text-primary mb-6">CONTACT</h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Suntem aici pentru tine. Alege modalitatea preferată de a ne contacta.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          <a 
            href="tel:+40748307290"
            className="group"
            data-testid="link-phone"
          >
            <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-secondary/20 transition-colors">
                  <Phone className="h-7 w-7 text-secondary" />
                </div>
                <h3 className="font-playfair text-lg text-primary mb-2">Telefon</h3>
                <p className="text-muted-foreground group-hover:text-primary transition-colors">+40 748 307 290</p>
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
            href="https://www.instagram.com/atelierulcuflori_events?igsh=cjRiMTYzYnR3eGVs"
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
                <p className="text-muted-foreground group-hover:text-primary transition-colors">@atelierulcuflori_events</p>
              </CardContent>
            </Card>
          </a>
        </div>
      </div>
    </div>
  );
}
