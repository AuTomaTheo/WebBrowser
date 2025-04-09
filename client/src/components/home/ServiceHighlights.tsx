import { ServiceHighlight } from "@/lib/types";
import { Gift, Scissors, Truck, Glasses } from "lucide-react";

const serviceHighlights: ServiceHighlight[] = [
  {
    id: 1,
    icon: "gift",
    title: "Design Unic",
    description: "Personalizăm povestea fiecărui eveniment important din viața ta.",
  },
  {
    id: 2,
    icon: "scissors",
    title: "Atelier Propriu",
    description: "Realizăm și punem la dispoziția ta elemente de recuzită unice.",
  },
  {
    id: 3,
    icon: "truck",
    title: "Livrăm la ușa ta",
    description: "În București și Ilfov, în condiții de maximă siguranță.",
  },
  {
    id: 4,
    icon: "glasses",
    title: "Atenție la detalii",
    description: "Împachetăm produsele cu multă grijă, atenție la detalii.",
  },
];

export default function ServiceHighlights() {
  const getIcon = (icon: string) => {
    switch (icon) {
      case "gift":
        return <Gift className="h-8 w-8 text-primary" />;
      case "scissors":
        return <Scissors className="h-8 w-8 text-primary" />;
      case "truck":
        return <Truck className="h-8 w-8 text-primary" />;
      case "glasses":
        return <Glasses className="h-8 w-8 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <section className="py-12 bg-[#FFFDF5]">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          {serviceHighlights.map((service) => (
            <div key={service.id} className="flex flex-col items-center">
              {getIcon(service.icon)}
              <h4 className="font-serif text-xl mb-2 mt-4">{service.title}</h4>
              <p className="text-gray-600 text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
