import { Button } from '@/components/ui/button';
import { Link } from 'wouter';

export default function EventPlanning() {
  return (
    <div className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="font-playfair text-3xl text-primary mb-6">EVENT PLANNING</h1>
          <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Transformăm evenimentele importante din viața ta în povești de neuitat, cu designul floral potrivit și atenție la fiecare detaliu.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-center">
          <div>
            <img 
              src="https://images.unsplash.com/photo-1519741347686-c1e0aadf4611?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Event Planning" 
              className="rounded-lg shadow-md"
            />
          </div>
          <div>
            <h2 className="font-dancing text-2xl text-primary mb-4">Servicii complete pentru evenimente</h2>
            <p className="text-muted-foreground mb-4">
              Oferim servicii complete de design și organizare pentru nunți, botezuri, aniversări și evenimente corporate.
            </p>
            <ul className="list-disc list-inside text-muted-foreground mb-6 space-y-2">
              <li>Consultanță și conceptualizare eveniment</li>
              <li>Design floral personalizat</li>
              <li>Aranjamente pentru ceremonie și recepție</li>
              <li>Decorațiuni și accesorii</li>
              <li>Coordonare în ziua evenimentului</li>
            </ul>
            <Link href="/contact">
              <Button className="bg-primary text-white">Solicită o ofertă</Button>
            </Link>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-cream p-8 rounded-lg text-center">
            <h3 className="font-playfair text-lg text-primary mb-4">Nunți</h3>
            <p className="text-muted-foreground mb-4">
              Transformăm nunta ta într-o poveste de dragoste vizuală, cu aranjamente ce reflectă personalitatea și stilul vostru.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Nuntă" 
              className="rounded-lg mt-4"
            />
          </div>
          <div className="bg-cream p-8 rounded-lg text-center">
            <h3 className="font-playfair text-lg text-primary mb-4">Botezuri</h3>
            <p className="text-muted-foreground mb-4">
              Creăm momente magice pentru cei mici, cu decoruri delicate și aranjamente florale pentru o zi specială.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Botez" 
              className="rounded-lg mt-4"
            />
          </div>
          <div className="bg-cream p-8 rounded-lg text-center">
            <h3 className="font-playfair text-lg text-primary mb-4">Evenimente Corporate</h3>
            <p className="text-muted-foreground mb-4">
              Aducem eleganță și profesionalism în evenimentele corporate, cu aranjamente adaptate identității companiei.
            </p>
            <img 
              src="https://images.unsplash.com/photo-1556125574-d7f27ec36a06?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80" 
              alt="Corporate" 
              className="rounded-lg mt-4"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
