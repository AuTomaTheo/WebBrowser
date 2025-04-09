import { Helmet } from "react-helmet";
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const categories = [
  { id: "all", name: "Toate Produsele" },
  { id: "bouquets", name: "Buchete de Flori" },
  { id: "arrangements", name: "Aranjamente Florale" },
  { id: "christmas", name: "Decorațiuni de Crăciun" },
  { id: "special", name: "Ocazii Speciale" },
];

const products = [
  {
    id: 1,
    name: "Buchet Romantic",
    price: 180,
    image: "https://images.unsplash.com/photo-1562690868-60bbe7293e94?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "bouquets",
  },
  {
    id: 2,
    name: "Aranjament Elegant",
    price: 250,
    image: "https://images.unsplash.com/photo-1484900893291-c5f9f0e68db1?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "arrangements",
  },
  {
    id: 3,
    name: "Coronița de Crăciun",
    price: 170,
    image: "https://images.unsplash.com/photo-1606654810102-9ed643d0dcbb?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "christmas",
  },
  {
    id: 4,
    name: "Buchet Aniversar",
    price: 200,
    image: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "special",
  },
  {
    id: 5,
    name: "Aranjament de Masă",
    price: 220,
    image: "https://images.unsplash.com/photo-1516476892398-bdcab4c8dab8?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "arrangements",
  },
  {
    id: 6,
    name: "Buchet Trandafiri",
    price: 190,
    image: "https://images.unsplash.com/photo-1519378058457-4c29a0a2efac?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "bouquets",
  },
  {
    id: 7,
    name: "Brad Decorat",
    price: 350,
    image: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "christmas",
  },
  {
    id: 8,
    name: "Buchet Mireasă",
    price: 280,
    image: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=600&q=80",
    category: "special",
  },
];

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredProducts = activeCategory === "all" 
    ? products 
    : products.filter(product => product.category === activeCategory);

  return (
    <>
      <Helmet>
        <title>Shop - Milk & Honey</title>
        <meta name="description" content="Descoperă selecția noastră de buchete de flori, aranjamente florale și decorațiuni pentru orice ocazie." />
      </Helmet>
      
      <section className="py-12 bg-[#F5F5F0]">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl text-center mb-8">Shop</h1>
          
          <Tabs defaultValue="all" className="w-full mb-8">
            <TabsList className="w-full flex overflow-x-auto p-1 bg-white rounded-lg">
              {categories.map(category => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className="flex-1 whitespace-nowrap px-4"
                >
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => (
              <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <img 
                  src={product.image} 
                  alt={product.name} 
                  className="w-full h-64 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-serif text-lg mb-2">{product.name}</h3>
                  <p className="text-accent font-medium mb-3">{product.price} lei</p>
                  <button className="w-full bg-primary hover:bg-opacity-90 text-white py-2 rounded-md transition">
                    Adaugă în coș
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
