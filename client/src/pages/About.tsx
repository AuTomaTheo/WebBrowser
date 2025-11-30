import { Button } from '@/components/ui/button';
import { Link } from 'wouter';
import oanaPhoto from '@assets/Poza pagina home site_1764525583926.jpg';

export default function About() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl text-primary mb-6">DESPRE NOI</h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-muted-foreground mb-4">
            Atelierul cu flori este un atelier de design floral și decorațiuni pentru evenimente speciale.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <img 
              src={oanaPhoto} 
              alt="Oana de la Atelierul cu flori" 
              className="rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="font-dancing text-2xl text-primary mb-4">Povestea noastră</h2>
            <p className="text-muted-foreground mb-4">
              Totul a început din pasiunea pentru flori și dorința de a crea aranjamente unice, care să surprindă și să emoționeze. Atelierul cu flori s-a născut din visul de a transforma orice eveniment într-o experiență autentică și memorabilă.
            </p>
            <p className="text-muted-foreground mb-4">
              Lucrăm cu dedicare pentru a crea povești florale personalizate, adaptate personalității și dorinței fiecărui client.
            </p>
            <Link href="/contact">
              <Button className="bg-primary text-white mt-4">Contactează-ne</Button>
            </Link>
          </div>
        </div>
        
        <div className="mb-16">
          <h2 className="font-dancing text-2xl text-primary text-center mb-8">Valorile noastre</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-cream rounded-lg">
              <h3 className="font-playfair text-lg text-primary mb-3">Autenticitate</h3>
              <p className="text-sm text-muted-foreground">
                Fiecare aranjament este gândit și creat unic, reflectând personalitatea clientului și caracterul evenimentului.
              </p>
            </div>
            <div className="text-center p-6 bg-cream rounded-lg">
              <h3 className="font-playfair text-lg text-primary mb-3">Calitate</h3>
              <p className="text-sm text-muted-foreground">
                Alegem cu grijă cele mai proaspete flori și materiale de calitate pentru creațiile noastre.
              </p>
            </div>
            <div className="text-center p-6 bg-cream rounded-lg">
              <h3 className="font-playfair text-lg text-primary mb-3">Dedicare</h3>
              <p className="text-sm text-muted-foreground">
                Ne implicăm cu pasiune în fiecare proiect, acordând atenție fiecărui detaliu.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
