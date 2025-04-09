import { Link } from 'wouter';
import { popularCategories } from '@/lib/data';

export default function PopularCategories() {
  return (
    <section className="py-16 bg-cream">
      <div className="container mx-auto px-4">
        <h2 className="font-dancing text-3xl text-center text-primary mb-10">Cele mai populare categorii</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCategories.map((category) => (
            <div key={category.id} className="bg-white rounded-lg overflow-hidden shadow-md group">
              <Link href={category.link} className="block">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-playfair text-primary uppercase text-sm tracking-wider">{category.title}</h3>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
