import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'wouter';
import { navLinks } from '@/lib/data';
import { Search, X, Instagram } from 'lucide-react';
import { FaFacebookF } from 'react-icons/fa';
import { LeafIcon } from './icons/CustomIcons';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

export default function Header() {
  const [location, setLocation] = useLocation();
  const [isCompact, setIsCompact] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsCompact(!entry.isIntersecting);
      },
      { threshold: 0, rootMargin: '-1px 0px 0px 0px' }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isSearchExpanded && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchExpanded]);

  const handleSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (searchQuery.trim()) {
      setIsSearchExpanded(false);
      setLocation(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };
  
  const toggleSearch = () => {
    setIsSearchExpanded(!isSearchExpanded);
    setSearchQuery("");
  };

  return (
    <>
      {/* Sentinel element - triggers compact mode when scrolled past */}
      <div ref={sentinelRef} className="absolute top-0 left-0 w-full h-[1px]" aria-hidden="true" />
      
      <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
        <div className="container mx-auto px-4">
          {/* Full header - visible at top */}
          {!isCompact && (
            <div className="grid grid-cols-3 items-center py-4">
              {/* Search */}
              <div className="flex items-center">
                <form onSubmit={handleSearch} className="relative flex items-center">
                  {isSearchExpanded ? (
                    <div className="flex items-center w-56">
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
                  ) : (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-9 w-9 rounded-full border border-gray-200 hover:bg-gray-50"
                      onClick={toggleSearch}
                      data-testid="button-search"
                    >
                      <Search className="h-5 w-5 text-gray-500" />
                    </Button>
                  )}
                </form>
              </div>

              {/* Logo */}
              <div className="flex justify-center">
                <Link href="/" className="flex items-center">
                  <LeafIcon className="h-12 w-auto text-secondary" />
                  <span className="text-primary font-playfair text-3xl font-semibold ml-3">
                    Atelierul cu flori
                  </span>
                </Link>
              </div>

              {/* Social Media Links */}
              <div className="flex items-center justify-end space-x-3">
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
            </div>
          )}

          {/* Navigation bar */}
          <div className={cn(
            "flex items-center",
            isCompact ? "py-3 justify-between" : "py-2 justify-center"
          )}>
            {/* Compact logo - only when scrolled */}
            {isCompact && (
              <Link href="/" className="flex items-center flex-shrink-0">
                <LeafIcon className="h-8 w-auto text-secondary" />
                <span className="text-primary font-playfair text-base font-medium ml-1.5">
                  ACF
                </span>
              </Link>
            )}
            
            {/* Navigation links */}
            <nav>
              <ul className="flex space-x-6 text-xs tracking-wide uppercase font-medium">
                {navLinks.map((link) => (
                  <li key={link.id}>
                    <Link 
                      href={link.path} 
                      className={cn(
                        "relative px-1 py-2 inline-block transition-colors duration-150",
                        location === link.path 
                          ? "text-primary after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-secondary" 
                          : "text-gray-600 hover:text-primary"
                      )}
                    >
                      {link.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
            
            {/* Compact controls - only when scrolled */}
            {isCompact && (
              <div className="flex items-center gap-2 flex-shrink-0">
                <a 
                  href="https://www.instagram.com/atelierulcuflori_events?igsh=cjRiMTYzYnR3eGVs" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-pink-50 transition-colors"
                  data-testid="link-instagram-compact"
                >
                  <Instagram className="h-4 w-4 text-pink-600" />
                </a>
                <a 
                  href="https://www.facebook.com/share/1Bs9atf4y9/?mibextid=wwXIfr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-blue-50 transition-colors"
                  data-testid="link-facebook-compact"
                >
                  <FaFacebookF className="h-3.5 w-3.5 text-blue-600" />
                </a>
                <form onSubmit={handleSearch} className="relative flex items-center">
                  {isSearchExpanded ? (
                    <div className="flex items-center w-40">
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
                  ) : (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="h-8 w-8 rounded-full hover:bg-gray-100"
                      onClick={toggleSearch}
                      data-testid="button-search-compact"
                    >
                      <Search className="h-4 w-4 text-gray-500" />
                    </Button>
                  )}
                </form>
              </div>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
