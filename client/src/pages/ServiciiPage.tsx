import { Helmet } from "react-helmet";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollToTopLink } from "@/components/ScrollToTopLink";
import { Flower2, PartyPopper, GraduationCap, Calendar } from "lucide-react";

const services = [
  {
    icon: PartyPopper,
    title: "Decoruri de Eveniment",
    description: "Transformăm visele tale în realitate cu decoruri florale unice pentru nunți, botezuri și evenimente speciale.",
    link: "/contact"
  },
  {
    icon: Flower2,
    title: "Aranjamente Florale",
    description: "Buchete și aranjamente personalizate pentru orice ocazie, create cu flori proaspete și multă creativitate.",
    link: "/contact"
  },
  {
    icon: Calendar,
    title: "Închirieri",
    description: "Închiriem elemente de decor și recuzită pentru evenimente - arcade florale, vaze, suporturi și multe altele.",
    link: "/contact"
  },
  {
    icon: GraduationCap,
    title: "Workshops",
    description: "Învață arta aranjamentelor florale alături de noi. Organizăm ateliere pentru toate nivelurile de experiență.",
    link: "/contact"
  }
];

export default function ServiciiPage() {
  return (
    <>
      <Helmet>
        <title>Servicii - Atelierul cu flori</title>
        <meta name="description" content="Descoperă serviciile noastre: decoruri de eveniment, aranjamente florale, închirieri și workshops. Creăm povești florale pentru momente speciale." />
      </Helmet>
      
      <div className="py-16 bg-white min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl text-primary mb-6">SERVICII</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Oferim o gamă completă de servicii florale pentru a transforma fiecare moment în amintiri de neuitat.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {services.map((service, index) => (
              <ScrollToTopLink key={index} href={service.link} className="group">
                <Card className="h-full hover:shadow-lg transition-all duration-300 border-0 shadow-sm">
                  <CardContent className="p-8">
                    <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mb-6 group-hover:bg-secondary/20 transition-colors">
                      <service.icon className="h-8 w-8 text-secondary" />
                    </div>
                    <h3 className="font-playfair text-xl text-primary mb-3">{service.title}</h3>
                    <p className="text-muted-foreground">{service.description}</p>
                    <p className="text-secondary mt-4 text-sm font-medium group-hover:underline">
                      Află mai multe →
                    </p>
                  </CardContent>
                </Card>
              </ScrollToTopLink>
            ))}
          </div>
          
          <div className="text-center mt-16">
            <p className="text-muted-foreground mb-4">Ai întrebări despre serviciile noastre?</p>
            <ScrollToTopLink 
              href="/contact" 
              className="inline-block bg-primary text-white px-8 py-3 rounded hover:bg-primary/90 transition-colors"
            >
              Contactează-ne
            </ScrollToTopLink>
          </div>
        </div>
      </div>
    </>
  );
}
