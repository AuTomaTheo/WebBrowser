import { Helmet } from "react-helmet";

export default function PrivacyPage() {
  return (
    <>
      <Helmet>
        <title>Politica de Confidențialitate - Atelierul cu flori</title>
        <meta name="description" content="Politica de confidențialitate și protecția datelor personale pentru Atelierul cu flori." />
      </Helmet>
      
      <div className="py-16 bg-white min-h-[70vh]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl text-primary mb-6">POLITICA DE CONFIDENȚIALITATE</h1>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-center italic mb-8">
              Această pagină va fi actualizată în curând cu politica de confidențialitate completă.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">1. Colectarea datelor</h2>
            <p>
              Informații despre ce date colectăm vor fi adăugate aici.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">2. Utilizarea datelor</h2>
            <p>
              Detalii despre cum utilizăm datele dvs. vor fi adăugate aici.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">3. Protecția datelor</h2>
            <p>
              Informații despre măsurile de securitate vor fi adăugate aici.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">4. Drepturile dvs.</h2>
            <p>
              Detalii despre drepturile dvs. în legătură cu datele personale vor fi adăugate aici.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">5. Contact</h2>
            <p>
              Pentru întrebări legate de confidențialitate, vă rugăm să ne contactați.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
