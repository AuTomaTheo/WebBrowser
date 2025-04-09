import { useState, useEffect } from 'react';
import { Link, useLocation } from 'wouter';
import { navLinks } from '@/lib/data';
import { Search, ShoppingBag, Heart, User, LogOut } from 'lucide-react';
import { LeafIcon } from './icons/CustomIcons';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [location] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const { user, logoutMutation } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    // Initial check
    handleScroll();
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = () => {
    logoutMutation.mutate();
  };

  return (
    <header className={`sticky top-0 z-50 bg-white border-b border-gray-100 transition-all duration-300 ${
      scrolled ? 'py-1.5' : 'py-2.5'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Search */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full border border-gray-200 hover:bg-gray-50">
              <Search className="h-3.5 w-3.5 text-gray-500" />
            </Button>
          </div>

          {/* Logo */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <LeafIcon className="h-7 w-auto text-secondary" />
              <span className="text-primary font-playfair text-xl ml-1.5">
                Milk <span className="text-secondary">&</span> Honey
              </span>
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-3">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 px-2 text-xs font-medium rounded-md border border-gray-200 hover:bg-gray-50">
                    <User className="h-3.5 w-3.5 mr-1.5" />
                    {user.username}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full flex items-center text-sm">
                      <User className="h-3.5 w-3.5 mr-2" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders" className="w-full flex items-center text-sm">
                      <ShoppingBag className="h-3.5 w-3.5 mr-2" />
                      Comenzile mele
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
                    <LogOut className="h-3.5 w-3.5 mr-2" />
                    <span className="text-sm">Deconectare</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" size="sm" className="h-8 px-3 text-xs font-medium rounded-md border border-gray-200 hover:bg-gray-50">
                  <User className="h-3.5 w-3.5 mr-1.5" />
                  Cont
                </Button>
              </Link>
            )}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="h-8 px-3 text-xs font-medium rounded-md border border-gray-200 hover:bg-gray-50 flex items-center">
                <span>0.00 lei</span>
                <ShoppingBag className="ml-1.5 h-3.5 w-3.5" />
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full bg-red-50 hover:bg-red-100 border border-red-200">
                <Heart className="h-3.5 w-3.5 text-red-500" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="flex justify-center mt-3 border-b border-gray-100 pb-1">
          <ul className="flex space-x-8 text-xs tracking-wide uppercase font-medium overflow-x-auto">
            {navLinks.map((link) => (
              <li key={link.id}>
                <Link 
                  href={link.path} 
                  className={cn(
                    "relative px-1 py-2 inline-block transition-colors duration-200",
                    location === link.path 
                      ? "text-primary after:absolute after:bottom-[-2px] after:left-0 after:w-full after:h-[2px] after:bg-secondary" 
                      : "text-gray-600 hover:text-primary hover:after:absolute hover:after:bottom-[-2px] hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-secondary hover:after:transition-all hover:after:duration-300"
                  )}
                >
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  );
}
