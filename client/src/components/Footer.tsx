import { Link } from 'wouter';
import { Facebook, Instagram } from 'lucide-react';
import { quickLinks, serviceLinks } from '@/lib/data';
// import { accountLinks } from '@/lib/data'; // Commented out per user request

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="font-playfair text-xl mb-4">Atelierul cu flori</h3>
            <p className="text-gray-300 mb-4">
              Creăm povești florale pentru momente speciale. Fiecare aranjament este realizat cu pasiune și atenție la detalii.
            </p>
            <div className="flex space-x-4">
              <a 
                href="https://www.facebook.com/share/1Bs9atf4y9/?mibextid=wwXIfr" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-blue-400 transition-colors"
                data-testid="footer-link-facebook"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a 
                href="https://www.instagram.com/atelierulcuflori_events?igsh=cjRiMTYzYnR3eGVs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-gray-300 hover:text-pink-400 transition-colors"
                data-testid="footer-link-instagram"
              >
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="font-playfair text-xl mb-4">Link-uri rapide</h3>
            <ul className="space-y-2">
              {quickLinks.map(link => (
                <li key={link.id}>
                  <Link href={link.path} className="text-gray-300 hover:text-secondary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 className="font-playfair text-xl mb-4">Servicii</h3>
            <ul className="space-y-2">
              {serviceLinks.map(link => (
                <li key={link.id}>
                  <Link href={link.path} className="text-gray-300 hover:text-secondary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          {/* My Account - commented out per user request
          <div>
            <h3 className="font-playfair text-xl mb-4">Contul meu</h3>
            <ul className="space-y-2">
              {accountLinks.map(link => (
                <li key={link.id}>
                  <Link href={link.path} className="text-gray-300 hover:text-secondary transition-colors">
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          */}
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Atelierul cu flori. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
