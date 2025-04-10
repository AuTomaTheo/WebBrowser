import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { testPath, proseccoPath, } from "../assets/images";

const rentals = [
  {
    id: 1,
    title: "Suporturi pentru aranjamente",
    description:
      "Suporturi elegante pentru aranjamente florale, disponibile în diverse înălțimi și stiluri.",
    image:
      testPath,
  },
  {
    id: 2,
    title: "Vaze decorative",
    description:
      "O colecție diversă de vaze decorative pentru orice tip de aranjament floral.",
    image:
      "https://images.unsplash.com/photo-1562045561-11ef62d8b055?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 3,
    title: "Felinare și lumânări",
    description:
      "Felinare decorative și suporturi pentru lumânări pentru o atmosferă caldă și primitoare.",
    image:
      "https://images.unsplash.com/photo-1575053803512-0b5a8e6bf7a2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80",
  },
  {
    id: 4,
    title: "Prosecco Van",
    description:
      "Elemente decorative pentru mese, inclusiv fețe de masă, șervețele și accesorii.",
    image:
      proseccoPath,
  },
];

export default function Rentals() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl text-primary mb-6">RENTALS</h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferim spre închiriere o gamă variată de decorațiuni și accesorii
            pentru evenimente, perfect pentru a completa designul floral.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {rentals.map((item) => (
            <Card key={item.id} className="overflow-hidden">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="h-full">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-6 flex flex-col justify-between">
                  <div>
                    <h3 className="font-playfair text-lg text-primary mb-3">
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground text-sm mb-4">
                      {item.description}
                    </p>
                  </div>
                  <Button className="bg-secondary text-primary w-full mt-4">
                    Solicită detalii
                  </Button>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        <div className="bg-cream p-8 rounded-lg text-center mb-16">
          <h2 className="font-dancing text-2xl text-primary mb-4">
            Cum funcționează?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
            <div>
              <div className="w-16 h-16 rounded-full bg-secondary text-primary text-2xl flex items-center justify-center mx-auto mb-4">
                1
              </div>
              <h3 className="font-playfair text-primary mb-2">Consultare</h3>
              <p className="text-sm text-muted-foreground">
                Discutăm despre evenimentul tău și nevoile specifice.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-secondary text-primary text-2xl flex items-center justify-center mx-auto mb-4">
                2
              </div>
              <h3 className="font-playfair text-primary mb-2">Selecție</h3>
              <p className="text-sm text-muted-foreground">
                Alegem împreună decorațiunile și accesoriile potrivite.
              </p>
            </div>
            <div>
              <div className="w-16 h-16 rounded-full bg-secondary text-primary text-2xl flex items-center justify-center mx-auto mb-4">
                3
              </div>
              <h3 className="font-playfair text-primary mb-2">Livrare</h3>
              <p className="text-sm text-muted-foreground">
                Ne ocupăm de livrarea, instalarea și preluarea decorațiunilor.
              </p>
            </div>
          </div>
          <Link href="/contact">
            <Button className="bg-primary text-white mt-8">
              Contactează-ne pentru o ofertă
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
