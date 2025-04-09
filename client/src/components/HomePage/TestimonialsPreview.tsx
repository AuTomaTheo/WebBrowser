import { Link } from 'wouter';
import { Button } from '@/components/ui/button';

export default function TestimonialsPreview() {
  return (
    <section className="py-16 bg-cream relative">
      <div className="container mx-auto px-4">
        <div className="bg-white rounded-lg overflow-hidden relative">
          <div 
            className="absolute inset-0 bg-opacity-20" 
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1554631221-f9603e6808be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2000&q=80')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: 0.15
            }}
          ></div>
          
          <div className="relative p-10 text-center">
            <h2 className="font-dancing text-3xl text-primary mb-4">Ce spun oamenii...</h2>
            <p className="text-textMedium max-w-2xl mx-auto mb-8">
              Părerea clienților noștri ne motivează să aducem bucurie cu fiecare moment unic organizat în cele mai mici detalii.
            </p>
            <Link href="/testimoniale">
              <Button className="bg-secondary text-primary px-6 py-2 font-medium rounded hover:bg-opacity-90 transition">
                RECENZII
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
