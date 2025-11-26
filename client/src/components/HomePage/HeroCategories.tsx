import { Link } from 'wouter';
import { categories } from '@/lib/data';

export default function HeroCategories() {
  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-center">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl w-full">
          {categories.map((category) => (
            <Link key={category.id} href={category.link}>
              <div className="relative overflow-hidden rounded-lg shadow-md h-80 group cursor-pointer">
                <img 
                  src={category.image}
                  alt={category.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
                  <span className="text-white text-2xl font-playfair tracking-wide text-center px-4">
                    {category.title}
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
