import { Helmet } from "react-helmet";

export default function EventPlanningPage() {
  return (
    <>
      <Helmet>
        <title>Event Planning - Milk & Honey</title>
        <meta name="description" content="Servicii complete de design floral și decoruri pentru nunți, aniversări, petreceri corporate și alte evenimente speciale." />
      </Helmet>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl text-center mb-8">Event Planning</h1>
          
          <div className="mb-12">
            <div className="relative h-96 rounded-lg overflow-hidden mb-8">
              <img 
                src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
                alt="Event Planning" 
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <h2 className="text-white font-serif text-4xl">Transformăm viziunea ta în realitate</h2>
              </div>
            </div>
            
            <p className="text-gray-700 mb-6 text-center max-w-4xl mx-auto">
              La Milk & Honey, ne dedicăm transformării viziunii tale în realitate. Cu atenție la detalii și o abordare personalizată, echipa noastră va crea o experiență memorabilă pentru tine și invitații tăi.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto mb-12">
            <div>
              <h2 className="font-serif text-2xl text-primary mb-4">Servicii pentru nunți</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Consultanță și design floral personalizat</li>
                <li>Buchete de mireasă și nuntași</li>
                <li>Aranjamente pentru ceremonii</li>
                <li>Decoruri pentru mese și spații de recepție</li>
                <li>Arcuri florale și instalații speciale</li>
              </ul>
              <img 
                src="https://images.unsplash.com/photo-1546032996-6dfacbacbf3f?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Wedding Flowers" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
            
            <div>
              <h2 className="font-serif text-2xl text-primary mb-4">Evenimente corporate</h2>
              <ul className="list-disc pl-6 text-gray-700 space-y-2 mb-4">
                <li>Aranjamente pentru conferințe și gale</li>
                <li>Decoruri tematice pentru lansări de produse</li>
                <li>Amenajări florale pentru birouri și recepții</li>
                <li>Cadouri corporate personalizate</li>
                <li>Instalații florale spectaculoase</li>
              </ul>
              <img 
                src="https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80" 
                alt="Corporate Events" 
                className="w-full h-64 object-cover rounded-lg"
              />
            </div>
          </div>
          
          <div className="text-center mb-12">
            <h2 className="font-serif text-2xl text-primary mb-6">Procesul nostru</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-xl font-semibold mb-4">1</div>
                <h3 className="font-serif text-lg mb-2">Consultare</h3>
                <p className="text-sm text-gray-600">Discutăm despre viziunea ta și stabilim detaliile evenimentului.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-xl font-semibold mb-4">2</div>
                <h3 className="font-serif text-lg mb-2">Design</h3>
                <p className="text-sm text-gray-600">Creăm conceptul și elaborăm propunerea personalizată.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-xl font-semibold mb-4">3</div>
                <h3 className="font-serif text-lg mb-2">Pregătire</h3>
                <p className="text-sm text-gray-600">Selectăm și pregătim florile și elementele decorative.</p>
              </div>
              
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full bg-accent text-white flex items-center justify-center text-xl font-semibold mb-4">4</div>
                <h3 className="font-serif text-lg mb-2">Implementare</h3>
                <p className="text-sm text-gray-600">Montăm și aranjăm decorurile în ziua evenimentului.</p>
              </div>
            </div>
          </div>
          
          <div className="text-center">
            <h2 className="font-serif text-2xl text-primary mb-6">Hai să discutăm despre evenimentul tău</h2>
            <a href="/contact" className="inline-block bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition">
              SOLICITĂ O OFERTĂ
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
