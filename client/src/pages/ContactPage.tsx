import { Helmet } from "react-helmet";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { SiInstagram } from "react-icons/si";

export default function ContactPage() {
  return (
    <>
      <Helmet>
        <title>Contact - Atelierul cu flori</title>
        <meta name="description" content="Contactează echipa Atelierul cu flori pentru orice întrebări despre serviciile noastre, pentru a programa o consultație sau pentru a solicita o ofertă personalizată." />
      </Helmet>
      
      <section className="py-16 bg-[#F5F5F0] min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-serif text-4xl text-primary mb-4">Contactează-ne</h1>
            <p className="text-gray-600 max-w-xl mx-auto">
              Suntem aici pentru tine. Alege modalitatea preferată de a ne contacta și vom răspunde cât mai curând posibil.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-16">
            <a 
              href="tel:+40123456789" 
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              data-testid="link-phone"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Phone className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-primary mb-2">Telefon</h3>
              <p className="text-gray-600 group-hover:text-primary transition-colors">+40 123 456 789</p>
            </a>
            
            <a 
              href="mailto:contact@atelierulcuflori.ro" 
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              data-testid="link-email"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <Mail className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-primary mb-2">Email</h3>
              <p className="text-gray-600 group-hover:text-primary transition-colors">contact@atelierulcuflori.ro</p>
            </a>
            
            <a 
              href="https://instagram.com/atelierulcuflori" 
              target="_blank" 
              rel="noopener noreferrer"
              className="group bg-white rounded-xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 text-center"
              data-testid="link-instagram"
            >
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-colors">
                <SiInstagram className="h-7 w-7 text-primary" />
              </div>
              <h3 className="font-serif text-xl text-primary mb-2">Instagram</h3>
              <p className="text-gray-600 group-hover:text-primary transition-colors">@atelierulcuflori</p>
            </a>
          </div>
          
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl p-8 md:p-10 shadow-sm">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <div className="flex items-start mb-6">
                    <MapPin className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-serif text-lg text-primary mb-1">Locație</h3>
                      <p className="text-gray-600">
                        Str. Florilor nr. 123, Sector 1<br />
                        București, România
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-start">
                    <Clock className="h-5 w-5 text-primary mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-serif text-lg text-primary mb-1">Program</h3>
                      <p className="text-gray-600">
                        Luni - Vineri: 09:00 - 18:00<br />
                        Sâmbătă: 10:00 - 16:00<br />
                        Duminică: Închis
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center justify-center md:justify-end">
                  <div className="text-center md:text-right">
                    <p className="text-gray-500 text-sm mb-2">Te așteptăm cu drag</p>
                    <p className="font-serif text-2xl text-primary">Atelierul cu flori</p>
                    <div className="mt-4 flex justify-center md:justify-end gap-4">
                      <a 
                        href="https://instagram.com/atelierulcuflori" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary transition-colors"
                        aria-label="Instagram"
                        data-testid="link-instagram-footer"
                      >
                        <SiInstagram className="h-5 w-5" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
