import { Link } from "wouter";
import { Category } from "@/lib/types";

const categories: Category[] = [
  {
    id: 1,
    title: "Event Planning",
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    link: "/event-planning",
  },
  {
    id: 2,
    title: "Rentals",
    image: "https://images.unsplash.com/photo-1563902704781-8b02c829626a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    link: "/rentals",
  },
  {
    id: 3,
    title: "Shop",
    image: "https://images.unsplash.com/photo-1545173620-37c77c5e6c10?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    link: "/shop",
  },
  {
    id: 4,
    title: "Workshops",
    image: "https://images.unsplash.com/photo-1556035511-3168381ea4d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    link: "/workshops",
  },
];

export default function MainCategories() {
  return (
    <section className="py-8 bg-[#F5F5F0]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link key={category.id} href={category.link}>
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 cursor-pointer">
                <div className="overflow-hidden">
                  <img 
                    src={category.image} 
                    alt={category.title} 
                    className="w-full h-64 object-cover transition duration-500 hover:scale-105"
                  />
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                  <h3 className="text-white text-2xl font-serif font-semibold">{category.title}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
