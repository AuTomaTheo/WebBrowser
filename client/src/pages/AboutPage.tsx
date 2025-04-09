import { Helmet } from "react-helmet";

export default function AboutPage() {
  return (
    <>
      <Helmet>
        <title>Despre Noi - Atelierul cu flori</title>
        <meta name="description" content="Atelierul cu flori este un atelier floral specializat în aranjamente deosebite, decoruri de eveniment și experiențe unice pentru clienții noștri." />
      </Helmet>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl text-center mb-8">Despre Noi</h1>
          
          <div className="mb-10">
            <img 
              src="https://images.unsplash.com/photo-1558182145-028ccdf48a8e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1200&q=80" 
              alt="Atelierul cu flori" 
              className="w-full h-80 object-cover rounded-lg mb-8"
            />
            
            <h2 className="font-serif text-2xl text-primary mb-4">Povestea Noastră</h2>
            <p className="text-gray-700 mb-4">
              Atelierul cu flori este un atelier floral specializat în aranjamente deosebite, decoruri de eveniment și experiențe unice pentru clienții noștri. Am pornit la drum din pasiune pentru frumos și dorința de a aduce un strop de magie în momentele importante din viața dumneavoastră.
            </p>
            <p className="text-gray-700 mb-4">
              Cu o experiență de peste 7 ani în industria florală, echipa noastră se dedică fiecărui proiect cu atenție la cele mai mici detalii, oferind servicii personalizate care transformă viziunile în realitate.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="font-serif text-2xl text-primary mb-4">Misiunea Noastră</h2>
            <p className="text-gray-700 mb-4">
              Ne propunem să creăm povești vizuale memorabile prin intermediul florilor și să oferim clienților noștri experiențe care depășesc așteptările. Credem în puterea florilor de a transmite emoții și de a transforma orice spațiu sau eveniment.
            </p>
          </div>

          <div className="mb-10">
            <h2 className="font-serif text-2xl text-primary mb-4">Echipa Noastră</h2>
            <p className="text-gray-700 mb-4">
              În spatele fiecărui aranjament floral sau decor de eveniment se află o echipă pasionată și dedicată, formată din floriști cu experiență și designeri creativi, care lucrează împreună pentru a da viață celor mai frumoase viziuni.
            </p>
          </div>
          
          <div>
            <h2 className="font-serif text-2xl text-primary mb-4">Serviciile Noastre</h2>
            <ul className="list-disc pl-6 text-gray-700 space-y-2">
              <li>Design floral pentru nunți și evenimente</li>
              <li>Buchete personalizate pentru orice ocazie</li>
              <li>Aranjamente florale corporate</li>
              <li>Decoruri tematice pentru evenimente speciale</li>
              <li>Workshop-uri și cursuri de design floral</li>
              <li>Consultanță în alegerea florilor și a decorurilor</li>
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
