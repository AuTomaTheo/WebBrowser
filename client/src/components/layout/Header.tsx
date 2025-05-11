import { useState, useEffect, useRef } from "react";
import { useLocation } from "wouter";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaYoutube } from "react-icons/fa";
import { AtelierulCuFloriLogo } from "@/assets/logo";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ScrollToTopLink } from "@/components/ScrollToTopLink";

const navItems = [
  { name: "HOME", path: "/" },
  { name: "DESPRE NOI", path: "/despre-noi" },
  { name: "SHOP", path: "/shop" },
  { name: "EVENT PLANNING", path: "/event-planning" },
  { name: "RENTALS", path: "/rentals" },
  { name: "WORKSHOPS", path: "/workshops" },
  { name: "TESTIMONIALE", path: "/testimoniale" },
  { name: "CONTACT", path: "/contact" },
];

export default function Header() {
  const [location] = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [scrollProgress, setScrollProgress] = useState(0);
  const prevScrollY = useRef(0);
  const ticking = useRef(false);
  
  // Use scroll progress (0 to 1) instead of boolean state for smoother transitions
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Calculate scroll progress (0 when at top, 1 when at/beyond threshold)
      // Using a threshold of 80px for the transition
      const threshold = 80;
      const newProgress = Math.min(1, Math.max(0, currentScrollY / threshold));
      
      if (newProgress !== scrollProgress) {
        setScrollProgress(newProgress);
      }
      
      prevScrollY.current = currentScrollY;
      ticking.current = false;
    };
    
    const onScroll = () => {
      if (!ticking.current) {
        window.requestAnimationFrame(handleScroll);
        ticking.current = true;
      }
    };
    
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [scrollProgress]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header 
      className="sticky top-0 left-0 right-0 z-50 bg-white shadow-sm"
      style={{ 
        // Dynamically adjust shadow based on scroll progress
        boxShadow: scrollProgress > 0 ? `0 ${Math.min(4, scrollProgress * 8)}px ${Math.min(8, scrollProgress * 16)}px rgba(0,0,0,${0.05 + scrollProgress * 0.05})` : 'none' 
      }}
    >
      {/* Top section with dynamic transform and opacity based on scroll progress */}
      <div 
        className="bg-white overflow-hidden transition-transform duration-300 ease-out"
        style={{ 
          // Transform properties provide smoother animation than height/max-height
          transform: `translateY(${-100 * scrollProgress}%)`,
          maxHeight: `${80 - (scrollProgress * 80)}px`,
          opacity: 1 - scrollProgress,
          // This ensures the container stays in the document flow while animating
          visibility: scrollProgress >= 0.99 ? 'hidden' : 'visible'
        }}
      >
        <div className="container mx-auto px-4 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center">
              <div className="md:hidden">
                <Sheet>
                  <SheetTrigger asChild>
                    <Button variant="ghost" size="icon" className="mr-2">
                      <Menu className="h-5 w-5" />
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left">
                    <div className="flex flex-col space-y-4 mt-8">
                      {navItems.map((item) => (
                        <ScrollToTopLink
                          key={item.path}
                          href={item.path}
                          className={`text-base ${
                            location === item.path
                              ? "font-medium text-primary"
                              : "text-gray-600 hover:text-primary"
                          } transition-colors`}
                        >
                          {item.name}
                        </ScrollToTopLink>
                      ))}
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
              <div className="relative hidden md:block">
                <form onSubmit={handleSearch} className="flex items-center">
                  <Input
                    type="text"
                    placeholder="Search..."
                    className="pl-10 pr-4 py-2 rounded-full border border-gray-300 w-44"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                </form>
              </div>
            </div>

            <div className="flex items-center">
              <ScrollToTopLink href="/">
                <AtelierulCuFloriLogo className="h-14 transition-all duration-300" />
              </ScrollToTopLink>
            </div>

            <div className="flex items-center">
              <ScrollToTopLink href="/autentificare" className="mr-4 text-sm font-medium hover:text-secondary transition">
                Autentificare
              </ScrollToTopLink>
              <ScrollToTopLink href="/cos" className="mr-4 relative">
                <ShoppingBag className="h-5 w-5" />
                <Badge className="absolute -top-2 -right-2 bg-accent text-white text-xs h-5 w-5 flex items-center justify-center p-0">
                  0
                </Badge>
              </ScrollToTopLink>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hidden md:block">
                <FaYoutube className="h-5 w-5 text-red-600" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation section - always visible */}
      <div className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 flex justify-between items-center">
          {/* Small logo that fades in based on scroll progress */}
          <div 
            className="flex-shrink-0 mr-4 transition-opacity duration-300 ease-in-out"
            style={{ 
              opacity: scrollProgress,
              // Only take up space when starting to be visible
              width: scrollProgress > 0.1 ? 'auto' : '0px',
              overflow: 'hidden'
            }}
          >
            <ScrollToTopLink href="/">
              <AtelierulCuFloriLogo className="h-8" />
            </ScrollToTopLink>
          </div>
          
          {/* Navigation menu always visible */}
          <ul className="hidden md:flex overflow-x-auto space-x-8 py-3 text-sm md:text-base justify-center flex-grow">
            {navItems.map((item) => (
              <li key={item.path}>
                <ScrollToTopLink
                  href={item.path}
                  className={`${
                    location === item.path
                      ? "font-medium border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                  } transition pb-1 block whitespace-nowrap`}
                >
                  {item.name}
                </ScrollToTopLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </header>
  );
}
