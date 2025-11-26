import { Link } from "wouter";
import { Category } from "@/lib/types";

const categories: Category[] = [
  {
    id: 1,
    title: "Nunți și Botezuri",
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=800&q=80",
    link: "/servicii",
  },
  {
    id: 2,
    title: "Aranjamente Florale",
    image: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=800&q=80",
    link: "/servicii",
  },
  {
    id: 3,
    title: "Workshops",
    image: "https://images.unsplash.com/photo-1556035511-3168381ea4d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&h=800&q=80",
    link: "/workshops",
  },
];

export default function MainCategories() {
  return (
    <section className="py-12 bg-[#F5F5F0]">
      <div className="container mx-auto px-4">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl">
            {categories.map((category) => (
              <Link key={category.id} href={category.link}>
                <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition duration-300 cursor-pointer">
                  <div className="overflow-hidden">
                    <img 
                      src={category.image} 
                      alt={category.title} 
                      className="w-full h-80 object-cover transition duration-500 hover:scale-105"
                    />
                  </div>
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <h3 className="text-white text-2xl font-serif font-semibold text-center px-4">{category.title}</h3>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
