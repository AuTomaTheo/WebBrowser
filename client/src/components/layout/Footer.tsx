import { Link } from "wouter";
import { FaFacebookF, FaInstagram, FaYoutube, FaPinterest } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="bg-primary text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h4 className="font-serif text-xl mb-4">Despre Milk & Honey</h4>
            <p className="text-gray-300 mb-4">
              Milk & Honey este un atelier floral specializat în aranjamente deosebite, decoruri de eveniment și experiențe unice pentru clienții noștri.
            </p>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <FaFacebookF className="h-5 w-5" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <FaInstagram className="h-5 w-5" />
              </a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <FaYoutube className="h-5 w-5" />
              </a>
              <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-white transition">
                <FaPinterest className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-4">Informații Utile</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/termeni-conditii" className="text-gray-300 hover:text-white transition">
                  Termeni și Condiții
                </Link>
              </li>
              <li>
                <Link href="/politica-confidentialitate" className="text-gray-300 hover:text-white transition">
                  Politica de Confidențialitate
                </Link>
              </li>
              <li>
                <Link href="/politica-livrare" className="text-gray-300 hover:text-white transition">
                  Politica de Livrare
                </Link>
              </li>
              <li>
                <Link href="/intrebari-frecvente" className="text-gray-300 hover:text-white transition">
                  Întrebări Frecvente
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-4">Categorii</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop/buchete" className="text-gray-300 hover:text-white transition">
                  Buchete de Flori
                </Link>
              </li>
              <li>
                <Link href="/shop/aranjamente" className="text-gray-300 hover:text-white transition">
                  Aranjamente Florale
                </Link>
              </li>
              <li>
                <Link href="/event-planning" className="text-gray-300 hover:text-white transition">
                  Decoruri de Eveniment
                </Link>
              </li>
              <li>
                <Link href="/workshops" className="text-gray-300 hover:text-white transition">
                  Workshops
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-serif text-xl mb-4">Contul Meu</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/autentificare" className="text-gray-300 hover:text-white transition">
                  Autentificare
                </Link>
              </li>
              <li>
                <Link href="/inregistrare" className="text-gray-300 hover:text-white transition">
                  Înregistrare
                </Link>
              </li>
              <li>
                <Link href="/istoric-comenzi" className="text-gray-300 hover:text-white transition">
                  Istoric Comenzi
                </Link>
              </li>
              <li>
                <Link href="/favorite" className="text-gray-300 hover:text-white transition">
                  Favorite
                </Link>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Milk & Honey. Toate drepturile rezervate.</p>
        </div>
      </div>
    </footer>
  );
}
