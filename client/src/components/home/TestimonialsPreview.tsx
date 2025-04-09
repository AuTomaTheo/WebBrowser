import { Link } from "wouter";
import { Button } from "@/components/ui/button";

export default function TestimonialsPreview() {
  return (
    <section className="py-12 bg-[#F5F5F0]">
      <div className="container mx-auto px-4">
        <div className="relative rounded-lg overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
            alt="Flowers background" 
            className="w-full h-64 object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-30 flex flex-col items-center justify-center text-center p-6">
            <h2 className="font-script text-3xl text-white mb-4">Ce spun oamenii...</h2>
            <p className="text-white mb-6 max-w-2xl">
              Părerea clienților noștri ne motivează să aducem bucurie cu fiecare moment unic organizat în cele mai mici detalii.
            </p>
            <Button asChild className="bg-yellow-400 hover:bg-yellow-500 text-primary font-medium">
              <Link href="/testimoniale">RECENZII</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
