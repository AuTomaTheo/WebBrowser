import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

export default function CookieConsent() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Check if user has already accepted cookies
    const cookieConsent = localStorage.getItem("cookieConsent");
    if (!cookieConsent) {
      setIsVisible(true);
    }
  }, []);

  const acceptCookies = () => {
    localStorage.setItem("cookieConsent", "accepted");
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-800 text-white p-4 flex flex-col md:flex-row items-center justify-between z-50">
      <p className="text-sm mb-4 md:mb-0 md:mr-4">
        Acest website folosește cookies pentru a-ți putea asigura cea mai bună experiență de navigare. Continuarea navigării pe site-ul nostru reprezintă acceptul dumneavoastră.
      </p>
      <Button 
        onClick={acceptCookies} 
        className="bg-teal-500 hover:bg-teal-600 text-white px-4 py-2 whitespace-nowrap"
      >
        Accept
      </Button>
    </div>
  );
}
