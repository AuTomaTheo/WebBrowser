import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Search, ShoppingBag, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaYoutube } from "react-icons/fa";
import { AtelierulCuFloriLogo } from "@/assets/logo";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
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
                      <Link
                        key={item.path}
                        href={item.path}
                        className={`text-base ${
                          location === item.path
                            ? "font-medium text-primary"
                            : "text-gray-600 hover:text-primary"
                        } transition-colors`}
                      >
                        {item.name}
                      </Link>
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
            <Link href="/">
              <AtelierulCuFloriLogo className="h-14" />
            </Link>
          </div>

          <div className="flex items-center">
            <Link href="/autentificare" className="mr-4 text-sm font-medium hover:text-secondary transition">
              Autentificare
            </Link>
            <Link href="/cos" className="mr-4 relative">
              <ShoppingBag className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 bg-accent text-white text-xs h-5 w-5 flex items-center justify-center p-0">
                0
              </Badge>
            </Link>
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hidden md:block">
              <FaYoutube className="h-5 w-5 text-red-600" />
            </a>
          </div>
        </div>
      </div>

      <nav className="bg-white border-t border-gray-100">
        <div className="container mx-auto px-4">
          <ul className="hidden md:flex overflow-x-auto space-x-8 py-3 text-sm md:text-base justify-center">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  href={item.path}
                  className={`${
                    location === item.path
                      ? "font-medium border-b-2 border-primary"
                      : "text-gray-600 hover:text-primary"
                  } transition pb-1 block whitespace-nowrap`}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </header>
  );
}
