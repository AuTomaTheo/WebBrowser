import { Helmet } from "react-helmet";
import { Calendar } from "@/components/ui/calendar";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const workshops = [
  {
    id: 1,
    title: "Introducere în arta florală",
    image: "https://images.unsplash.com/photo-1556035511-3168381ea4d4?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Un workshop dedicat începătorilor care doresc să învețe principiile de bază ale aranjamentelor florale.",
    duration: "3 ore",
    price: 250,
    dates: ["2023-12-10", "2023-12-17"],
  },
  {
    id: 2,
    title: "Buchete de mireasă",
    image: "https://images.unsplash.com/photo-1560071344-e279ba4b1c7c?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Învață să creezi buchete elegante pentru cele mai speciale momente din viață.",
    duration: "4 ore",
    price: 350,
    dates: ["2023-12-09", "2023-12-16"],
  },
  {
    id: 3,
    title: "Decorațiuni de Crăciun",
    image: "https://images.unsplash.com/photo-1607955868971-8bda058a1c6b?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Creează-ți propriile decorațiuni de sărbători din materiale naturale și flori uscate.",
    duration: "3 ore",
    price: 280,
    dates: ["2023-12-03", "2023-12-10"],
  },
  {
    id: 4,
    title: "Aranjamente pentru evenimente corporate",
    image: "https://images.unsplash.com/photo-1550637139-2e0b808469df?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Workshop special pentru profesioniști, concentrat pe crearea aranjamentelor impresionante pentru mediul de afaceri.",
    duration: "5 ore",
    price: 400,
    dates: ["2023-12-14", "2023-12-21"],
  },
];

export default function WorkshopsPage() {
  const [selectedDates, setSelectedDates] = useState<Date | undefined>(undefined);

  return (
    <>
      <Helmet>
        <title>Workshops - Atelierul cu flori</title>
        <meta name="description" content="Descoperă atelierele noastre de design floral. Învață cum să creezi buchete și aranjamente florale sub îndrumarea experților noștri." />
      </Helmet>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl text-center mb-8">Workshops</h1>
          
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <p className="text-gray-700 mb-6">
              Te invităm să descoperi lumea fascinantă a designului floral alături de noi. Workshop-urile noastre sunt ocazia perfectă de a învăța tehnici noi, de a explora creativitatea și de a petrece timp de calitate într-o atmosferă primitoare.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {workshops.map(workshop => (
              <div key={workshop.id} className="bg-[#F5F5F0] rounded-lg overflow-hidden shadow-md hover:shadow-lg transition">
                <div className="relative">
                  <img 
                    src={workshop.image} 
                    alt={workshop.title} 
                    className="w-full h-64 object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-primary mb-2">{workshop.title}</h3>
                  <p className="text-gray-600 text-sm mb-4">{workshop.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-gray-700"><strong>Durată:</strong> {workshop.duration}</span>
                    <span className="text-accent font-medium">{workshop.price} lei</span>
                  </div>
                  <button className="w-full bg-primary hover:bg-opacity-90 text-white py-2 rounded-md transition">
                    Înscrie-te
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-[#F5F5F0] rounded-lg p-8 max-w-5xl mx-auto">
            <h2 className="font-serif text-2xl text-primary text-center mb-6">Calendar Workshop-uri</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <Calendar
                  mode="single"
                  selected={selectedDates}
                  onSelect={setSelectedDates}
                  className="rounded-md border"
                />
              </div>
              
              <div className="flex flex-col justify-center">
                <h3 className="font-serif text-xl text-primary mb-4">Rezervă-ți locul</h3>
                <p className="text-gray-700 mb-6">
                  Toate materialele necesare sunt incluse în prețul workshop-ului. La final, vei pleca acasă cu propria creație și cu cunoștințe noi despre arta florală.
                </p>
                <p className="text-gray-700 mb-6">
                  Locurile sunt limitate la maximum 8 participanți pentru fiecare workshop, pentru a asigura o experiență personalizată.
                </p>
                <Button className="bg-accent hover:bg-opacity-90 text-white font-medium w-full md:w-auto">
                  VEZI DISPONIBILITATEA
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
