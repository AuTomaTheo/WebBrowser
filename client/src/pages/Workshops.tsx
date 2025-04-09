import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'wouter';

const workshops = [
  {
    id: 1,
    title: "Arta Buquetului",
    description: "Învață cum să creezi buchete elegante pentru diverse ocazii.",
    duration: "3 ore",
    price: "350 lei",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 2,
    title: "Aranjamente festive",
    description: "Descoperă secretele aranjamentelor festive pentru sărbători.",
    duration: "4 ore",
    price: "400 lei",
    image: "https://images.unsplash.com/photo-1534705867302-2a41a429eda5?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 3,
    title: "Coronițe naturale",
    description: "Învață să creezi coronițe decorative din materiale naturale.",
    duration: "3 ore",
    price: "320 lei",
    image: "https://images.unsplash.com/photo-1544146128-6d0bedad3611?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  },
  {
    id: 4,
    title: "Workshop Corporate",
    description: "Ateliere personalizate pentru echipe și evenimente de team building.",
    duration: "Personalizat",
    price: "La cerere",
    image: "https://images.unsplash.com/photo-1556125574-d7f27ec36a06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
  }
];

export default function Workshops() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl text-primary mb-6">WORKSHOPS</h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Descoperă arta aranjamentelor florale în cadrul atelierelor noastre creative, pentru începători și pasionați.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {workshops.map(workshop => (
            <Card key={workshop.id} className="overflow-hidden">
              <div className="h-64">
                <img 
                  src={workshop.image} 
                  alt={workshop.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <CardContent className="p-6">
                <h3 className="font-playfair text-lg text-primary mb-2">{workshop.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">{workshop.description}</p>
                <div className="flex justify-between items-center mb-4">
                  <span className="text-sm text-muted-foreground">Durată: {workshop.duration}</span>
                  <span className="text-secondary font-semibold">{workshop.price}</span>
                </div>
                <Button className="bg-primary text-white w-full">
                  Înscrie-te
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="bg-cream rounded-lg p-8 mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="font-dancing text-2xl text-primary mb-4">Workshopuri pentru companii</h2>
              <p className="text-muted-foreground mb-4">
                Oferim experiențe creative și relaxante pentru echipe, perfecte pentru team building și evenimente corporate.
              </p>
              <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
                <li>Activități creative care încurajează colaborarea</li>
                <li>Experiențe memorabile pentru echipa ta</li>
                <li>Ateliere personalizate pentru grupuri de diverse dimensiuni</li>
                <li>Materiale și unelte profesionale incluse</li>
              </ul>
              <Link href="/contact">
                <Button className="bg-primary text-white">
                  Solicită o ofertă
                </Button>
              </Link>
            </div>
            <div>
              <img 
                src="https://images.unsplash.com/photo-1562621542-a4c9222a6b02?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
                alt="Workshop Corporate" 
                className="rounded-lg shadow-md"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
