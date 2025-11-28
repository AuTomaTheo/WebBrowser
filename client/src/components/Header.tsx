import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { navLinks } from '@/lib/data';
import { Search, Heart, User, LogOut, X, Instagram } from 'lucide-react';
import { FaFacebookF } from 'react-icons/fa';
import { LeafIcon } from './icons/CustomIcons';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { useQuery } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Header() {
  const [location, setLocation] = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
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

  useEffect(() => {
    // Focus search input when expanded
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleLogout = () => {
    logoutMutation.mutate();
  };
  
  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      // Search with the search query, navigate to search results page
      // The actual search logic is handled in SearchResultsPage.tsx
      setIsSearchExpanded(false);
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    setSearchQuery("");
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
            scrolled ? "max-h-0 opacity-0 py-0" : "max-h-24 opacity-100 py-4"
          )}
        >
          {/* Search */}
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <div className={cn(
                "flex items-center transition-all duration-300 overflow-hidden",
                isSearchExpanded ? "w-56 opacity-100" : "w-0 opacity-0"
              )}>
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Caută..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-9 text-sm pr-8 rounded-full"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 h-7 w-7 rounded-full"
                  onClick={toggleSearch}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
              
              {!isSearchExpanded && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 rounded-full border border-gray-200 hover:bg-gray-50"
                  onClick={toggleSearch}
                >
                  <Search className="h-5 w-5 text-gray-500" />
                </Button>
              )}
            </form>
          </div>

          {/* Logo (enlarged when at top) */}
          <div className="flex justify-center">
            <Link href="/" className="flex items-center">
              <LeafIcon className="h-12 w-auto text-secondary transition-all duration-300" />
              <span className="text-primary font-playfair text-3xl font-semibold ml-3 transition-all duration-300">
                Atelierul cu flori
              </span>
            </Link>
          </div>

          {/* Social Media Links */}
          <div className="flex items-center space-x-3" style={{ minWidth: '120px' }}>
            <a 
              href="https://www.instagram.com/atelierulcuflori_events?igsh=cjRiMTYzYnR3eGVs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-pink-50 hover:border-pink-300 transition-colors"
              data-testid="link-instagram"
            >
              <Instagram className="h-5 w-5 text-pink-600" />
            </a>
            <a 
              href="https://www.facebook.com/share/1Bs9atf4y9/?mibextid=wwXIfr" 
              target="_blank" 
              rel="noopener noreferrer"
              className="h-9 w-9 rounded-full border border-gray-200 flex items-center justify-center hover:bg-blue-50 hover:border-blue-300 transition-colors"
              data-testid="link-facebook"
            >
              <FaFacebookF className="h-4 w-4 text-blue-600" />
            </a>
          </div>
          {/* User Actions - commented out per user request
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
                    <Link href="/wishlist" className="w-full flex items-center text-xs">
                      <Heart className="h-3 w-3 mr-1.5" />
                      Favorite
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
            <Link href="/wishlist">
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-full bg-red-50 hover:bg-red-100 border border-red-200">
                <Heart className="h-3 w-3 text-red-500" />
              </Button>
            </Link>
          </div>
          */}
        </div>

        {/* Navigation Menu with compact logo when scrolled */}
        <div className="flex items-center justify-between py-2">
          {/* Compact logo that appears only when scrolled */}
          <div 
            className={cn(
              "transition-all duration-300 flex-shrink-0",
              scrolled ? "opacity-100 w-auto" : "opacity-0 w-0 overflow-hidden"
            )}
          >
            <Link href="/" className="flex items-center">
              <LeafIcon className="h-8 w-auto text-secondary" />
              <span className="text-primary font-playfair text-base font-medium ml-1.5">
                ACF
              </span>
            </Link>
          </div>
          
          {/* Navigation links */}
          <nav className="flex justify-center flex-grow">
            <ul className="flex space-x-6 text-xs tracking-wide uppercase font-medium overflow-x-auto no-scrollbar">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <Link 
                    href={link.path} 
                    className={cn(
                      "relative px-1 py-2 inline-block transition-colors duration-200",
                      location === link.path 
                        ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-secondary" 
                        : "text-gray-600 hover:text-primary hover:after:absolute hover:after:bottom-0 hover:after:left-0 hover:after:w-full hover:after:h-[2px] hover:after:bg-secondary hover:after:transition-all hover:after:duration-300"
                    )}
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* Search button when scrolled */}
          <div className={cn(
            "flex-shrink-0 transition-all duration-300 flex items-center justify-end",
            scrolled ? "w-[60px] opacity-100" : "w-0 opacity-0"
          )}>
            <form onSubmit={handleSearch} className="relative flex items-center">
              <div className={cn(
                "flex items-center transition-all duration-300 overflow-hidden",
                isSearchExpanded ? "w-48 opacity-100" : "w-0 opacity-0"
              )}>
                <Input
                  type="text"
                  placeholder="Caută..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-8 text-sm pr-8 rounded-full"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 h-6 w-6 rounded-full"
                  onClick={toggleSearch}
                >
                  <X className="h-4 w-4 text-gray-500" />
                </Button>
              </div>
              
              {!isSearchExpanded && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 rounded-full"
                  onClick={toggleSearch}
                >
                  <Search className="h-4 w-4 text-gray-500" />
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}