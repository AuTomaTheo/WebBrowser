import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { navLinks } from '@/lib/data';
import { Search, ShoppingBag, Heart, User, LogOut, X } from 'lucide-react';
import { LeafIcon } from './icons/CustomIcons';
import { useAuth } from '@/hooks/use-auth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
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
            scrolled ? "max-h-0 opacity-0 py-0" : "max-h-20 opacity-100 py-2.5"
          )}
        >
          {/* Search */}
          <div className="flex items-center">
            <form onSubmit={handleSearch} className="relative flex items-center">
              <div className={cn(
                "flex items-center transition-all duration-300 overflow-hidden",
                isSearchExpanded ? "w-48 opacity-100" : "w-0 opacity-0"
              )}>
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Caută..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-6 text-xs pr-6 rounded-full"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 h-5 w-5 rounded-full"
                  onClick={toggleSearch}
                >
                  <X className="h-2.5 w-2.5 text-gray-500" />
                </Button>
              </div>
              
              {!isSearchExpanded && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 rounded-full border border-gray-200 hover:bg-gray-50"
                  onClick={toggleSearch}
                >
                  <Search className="h-3 w-3 text-gray-500" />
                </Button>
              )}
            </form>
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
          
          {/* Search button when scrolled */}
          <div className={cn(
            "flex-shrink-0 transition-all duration-300 flex items-center justify-end",
            scrolled ? "w-[50px] opacity-100" : "w-0 opacity-0"
          )}>
            <form onSubmit={handleSearch} className="relative flex items-center">
              <div className={cn(
                "flex items-center transition-all duration-300 overflow-hidden",
                isSearchExpanded ? "w-40 opacity-100" : "w-0 opacity-0"
              )}>
                <Input
                  type="text"
                  placeholder="Caută..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-6 text-xs pr-6 rounded-full"
                />
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="absolute right-0 h-5 w-5 rounded-full"
                  onClick={toggleSearch}
                >
                  <X className="h-2.5 w-2.5 text-gray-500" />
                </Button>
              </div>
              
              {!isSearchExpanded && (
                <Button 
                  type="button" 
                  variant="ghost" 
                  size="icon" 
                  className="h-6 w-6 rounded-full"
                  onClick={toggleSearch}
                >
                  <Search className="h-3 w-3 text-gray-500" />
                </Button>
              )}
            </form>
          </div>
        </div>
      </div>
    </header>
  );
}