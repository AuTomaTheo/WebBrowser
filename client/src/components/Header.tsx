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
    <header className={cn(
      "sticky top-0 z-50 bg-white border-b transition-all duration-300", 
      scrolled ? "border-transparent shadow-sm" : "border-gray-100"
    )}>
      <div className="container mx-auto px-4">
        {/* Top part that disappears on scroll */}
        <div 
          className={cn(
            "flex justify-between items-center overflow-hidden transition-all duration-300",
            scrolled ? "max-h-0 opacity-0 py-0" : "max-h-20 opacity-100 py-2.5"
          )}
        >
          {/* Search */}
          <div className="flex items-center">
            <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full border border-gray-200 hover:bg-gray-50">
              <Search className="h-3 w-3 text-gray-500" />
            </Button>
          </div>

          {/* Logo (enlarged when at top) */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <LeafIcon className="h-10 w-auto text-secondary transition-all duration-300" />
              <span className="text-primary font-playfair text-2xl font-semibold ml-2 transition-all duration-300">
                Atelierul cu flori
              </span>
            </Link>
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-2">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-6 px-1.5 text-xs font-medium rounded-md border border-gray-200 hover:bg-gray-50">
                    <User className="h-3 w-3 mr-1" />
                    <span className="text-[10px]">{user.username}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40">
                  <DropdownMenuItem>
                    <Link href="/profile" className="w-full flex items-center text-xs">
                      <User className="h-3 w-3 mr-1.5" />
                      Profil
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Link href="/orders" className="w-full flex items-center text-xs">
                      <ShoppingBag className="h-3 w-3 mr-1.5" />
                      Comenzile mele
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer text-red-500" onClick={handleLogout}>
                    <LogOut className="h-3 w-3 mr-1.5" />
                    <span className="text-xs">Deconectare</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Link href="/auth">
                <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] font-medium rounded-md border border-gray-200 hover:bg-gray-50">
                  <User className="h-3 w-3 mr-1" />
                  Cont
                </Button>
              </Link>
            )}
            <Link href="/cart">
              <Button variant="ghost" size="sm" className="h-6 px-2 text-[10px] font-medium rounded-md border border-gray-200 hover:bg-gray-50 flex items-center">
                <span>0.00 lei</span>
                <ShoppingBag className="ml-1 h-3 w-3" />
              </Button>
            </Link>
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-red-50 hover:bg-red-100 border border-red-200">
                <Heart className="h-3 w-3 text-red-500" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Navigation Menu with compact logo when scrolled */}
        <div className="flex items-center justify-between py-1">
          {/* Compact logo that appears only when scrolled */}
          <div 
            className={cn(
              "transition-all duration-300 flex-shrink-0",
              scrolled ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
            )}
          >
            <Link href="/" className="flex items-center">
              <LeafIcon className="h-6 w-auto text-secondary" />
              <span className="text-primary font-playfair text-sm font-medium ml-1">
                ACF
              </span>
            </Link>
          </div>
          
          {/* Navigation links */}
          <nav className="flex justify-center flex-grow">
            <ul className="flex space-x-4 text-[10px] tracking-wide uppercase font-medium overflow-x-auto no-scrollbar">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={link.path} 
                    className={cn(
                      "relative px-0.5 py-1.5 inline-block transition-colors duration-200",
                      location === link.path 
                        ? "text-primary after:absolute after:bottom-[-1px] after:left-0 after:w-full after:h-[1px] after:bg-secondary" 
                        : "text-gray-600 hover:text-primary hover:after:absolute hover:after:bottom-[-1px] hover:after:left-0 hover:after:w-full hover:after:h-[1px] hover:after:bg-secondary hover:after:transition-all hover:after:duration-300"
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Empty div for flex alignment */}
          <div className={cn(
            "flex-shrink-0 transition-all duration-300",
            scrolled ? "w-[50px]" : "w-0"
          )}></div>
        </div>
      </div>
    </header>
  );
}
