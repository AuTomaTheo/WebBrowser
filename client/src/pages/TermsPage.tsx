import { Helmet } from "react-helmet";

export default function TermsPage() {
  return (
    <>
      <Helmet>
        <title>Termeni și Condiții - Atelierul cu flori</title>
        <meta name="description" content="Termenii și condițiile de utilizare pentru serviciile Atelierul cu flori." />
      </Helmet>
      
      <div className="py-16 bg-white min-h-[70vh]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl text-primary mb-6">TERMENI ȘI CONDIȚII</h1>
            <div className="w-20 h-1 bg-secondary mx-auto"></div>
          </div>
          
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-center italic mb-8">
              Această pagină va fi actualizată în curând cu termenii și condițiile complete.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">1. Informații generale</h2>
            <p>
              Conținutul termenilor și condițiilor va fi adăugat aici.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">2. Utilizarea serviciilor</h2>
            <p>
              Detalii despre utilizarea serviciilor noastre vor fi adăugate aici.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">3. Comenzi și plăți</h2>
            <p>
              Informații despre comenzi și modalități de plată vor fi adăugate aici.
            </p>
            
            <h2 className="font-playfair text-xl text-primary mt-8 mb-4">4. Contact</h2>
            <p>
              Pentru întrebări legate de termenii și condițiile noastre, vă rugăm să ne contactați.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
