import { Link } from 'wouter';
import { categories } from '@/lib/data';

export default function HeroCategories() {
  return (
    <section className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {categories.map((category) => (
          <div key={category.id} className="relative overflow-hidden rounded-lg shadow-md h-64 group">
            <img 
              src={category.image}
              alt={category.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent flex items-center justify-center">
              <Link href={category.link} className="text-white text-2xl font-playfair tracking-wide">
                {category.title}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
