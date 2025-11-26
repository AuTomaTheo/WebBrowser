import { Helmet } from "react-helmet";

export default function DeliveryPage() {
  return (
    <>
      <Helmet>
        <title>Politica de Livrare - Atelierul cu flori</title>
        <meta name="description" content="Informații despre livrarea produselor și serviciilor Atelierul cu flori." />
      </Helmet>
      
      <div className="py-16 bg-white min-h-[70vh]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl text-primary mb-6">POLITICA DE LIVRARE</h1>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-center italic mb-8">
              Această pagină va fi actualizată în curând cu informații complete despre livrare.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">1. Zone de livrare</h2>
            <p>
              Informații despre zonele în care livrăm vor fi adăugate aici.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">2. Termene de livrare</h2>
            <p>
              Detalii despre termenele de livrare vor fi adăugate aici.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">3. Costuri de livrare</h2>
            <p>
              Informații despre costurile de livrare vor fi adăugate aici.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">4. Contact</h2>
            <p>
              Pentru întrebări legate de livrare, vă rugăm să ne contactați.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
