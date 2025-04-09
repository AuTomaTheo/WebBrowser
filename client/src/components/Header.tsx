import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { navLinks } from '@/lib/data';
import { Search, ShoppingBag, Heart } from 'lucide-react';
import { LeafIcon } from './icons/CustomIcons';

export default function Header() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`sticky top-0 z-50 bg-white shadow-sm transition-all duration-300 ${
      scrolled ? 'py-1' : 'py-2'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Search */}
          <div className="flex items-center">
            <button className="text-gray-500 focus:outline-none">
              <Search className="h-5 w-5" />
            </button>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <LeafIcon className="h-8 w-auto text-secondary" />
              <span className="text-primary font-playfair text-2xl ml-2">
                Milk <span className="text-secondary">&</span> Honey
              </span>
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center">
            <Link href="/auth" className="text-gray-500 mx-2">
              <span>Autentificare</span>
            </Link>
            <Link href="/cart" className="text-gray-500 mx-2 flex items-center">
              <span>0.00 lei</span>
              <ShoppingBag className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/wishlist" className="text-gray-500 mx-2 bg-red-600 rounded-full p-1 text-white">
              <Heart className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex justify-center mt-4 border-b border-gray-200 pb-2">
          <ul className="flex space-x-6 text-sm font-medium overflow-x-auto">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link href={link.path}>
                  <a className={`relative px-1 py-2 inline-block ${
                    location === link.path ? 'after:absolute after:bottom-[-4px] after:left-0 after:w-full after:h-0.5 after:bg-secondary' : 'hover:after:absolute hover:after:bottom-[-4px] hover:after:left-0 hover:after:w-full hover:after:h-0.5 hover:after:bg-secondary hover:after:transition-all hover:after:duration-300'
                  }`}>
                    {link.title}
                  </a>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
