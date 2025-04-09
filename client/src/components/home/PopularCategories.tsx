import { Link } from "wouter";
import { PopularCategory } from "@/lib/types";

const popularCategories: PopularCategory[] = [
  {
    id: 1,
    title: "CORONIȚE HANDMADE DE CRĂCIUN",
    image: "https://images.unsplash.com/photo-1512201078372-9c6b2a0d528a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    link: "/shop/coronite",
  },
  {
    id: 2,
    title: "BRAZI CU DESIGN PERSONALIZAT",
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    link: "/shop/brazi",
  },
  {
    id: 3,
    title: "DECORAȚIUNI DE CRĂCIUN",
    image: "https://images.unsplash.com/photo-1606654810102-9ed643d0dcbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    link: "/shop/decoratiuni",
  },
  {
    id: 4,
    title: "WORKSHOPS",
    image: "https://images.unsplash.com/photo-1607955868971-8bda058a1c6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    link: "/workshops",
  },
];

export default function PopularCategories() {
  return (
    <section className="py-12 bg-[#F5F5F0]">
      <div className="container mx-auto px-4">
        <h2 className="font-script text-3xl text-primary text-center mb-10">Cele mai populare categorii</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {popularCategories.map((category) => (
            <Link key={category.id} href={category.link}>
              <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition cursor-pointer">
                <div className="relative">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-60 object-cover transition duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4 text-center">
                  <h3 className="font-serif text-lg uppercase tracking-wide">{category.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
