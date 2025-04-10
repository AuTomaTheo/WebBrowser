import { Helmet } from "react-helmet";

const rentalItems = [
  {
    id: 1,
    name: "Vaze și recipiente decorative",
    image: "https://images.unsplash.com/photo-1563902704781-8b02c829626a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    description: "O colecție variată de vaze din sticlă, ceramică și metal, în diferite forme și dimensiuni, perfecte pentru aranjamente florale.",
  },
  {
    id: 2,
    name: "Suporturi pentru lumânări",
    image: "https://images.unsplash.com/photo-1517594632980-e4649d463d00?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Sfeșnice elegante și felinare pentru a crea o atmosferă caldă și primitoare la evenimentul tău.",
  },
  {
    id: 3,
    name: "Elemente de recuzită",
    image: "https://images.unsplash.com/photo-1513559382836-d2ff61c68b25?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Piese decorative unice, create în atelierul nostru, care pot adăuga personalitate și stil evenimentului tău.",
  },
  {
    id: 4,
    name: "Mobilier decorativ",
    image: "https://images.unsplash.com/photo-1504229926045-3d2b1cc5272a?ixlib=rb-1.2.1&auto=format&fit=crop&w=600&h=400&q=80",
    description: "Piese de mobilier special, mese și scaune elegante, care pot completa perfect decorul evenimentului tău.",
  },
];

export default function RentalsPage() {
  return (
    <>
      <Helmet>
        <title>Rentals - Atelierul cu flori</title>
        <meta name="description" content="Închiriază vaze, sfeșnice, mobilier și elemente decorative pentru evenimentul tău. Opțiuni elegante și unice pentru a completa decorul floral." />
      </Helmet>
      
      <section className="py-12 bg-[#F5F5F0]">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-3xl text-center mb-8">Rentals</h1>
          
          <div className="max-w-4xl mx-auto mb-12 text-center">
            <p className="text-gray-700 mb-6">
              Pentru a completa perfect decorurile florale și a crea o atmosferă armonioasă, oferim spre închiriere o gamă variată de vaze, sfeșnice, și elemente decorative unice, multe dintre ele realizate în atelierul nostru.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            {rentalItems.map(item => (
              <div key={item.id} className="bg-white rounded-lg overflow-hidden shadow-md">
                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className="h-full">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-6 flex flex-col justify-center">
                    <h3 className="font-serif text-xl text-primary mb-3">{item.name}</h3>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg p-8 max-w-4xl mx-auto">
            <h2 className="font-serif text-2xl text-primary text-center mb-6">Cum funcționează?</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-semibold mx-auto mb-4">1</div>
                <h3 className="font-serif text-lg mb-2">Selecție</h3>
                <p className="text-sm text-gray-600">Alegi elementele care se potrivesc cu viziunea ta pentru eveniment.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-semibold mx-auto mb-4">2</div>
                <h3 className="font-serif text-lg mb-2">Rezervare</h3>
                <p className="text-sm text-gray-600">Stabilim disponibilitatea și perioada de închiriere.</p>
              </div>
              
              <div className="text-center">
                <div className="w-12 h-12 rounded-full bg-accent text-white flex items-center justify-center text-xl font-semibold mx-auto mb-4">3</div>
                <h3 className="font-serif text-lg mb-2">Livrare</h3>
                <p className="text-sm text-gray-600">Ne ocupăm de livrare, montare și preluare după eveniment.</p>
              </div>
            </div>
            
            <div className="text-center">
              <p className="text-gray-700 mb-6">
                Prețurile variază în funcție de tipul și numărul elementelor închiriate, precum și de perioada de închiriere. Contactează-ne pentru o ofertă personalizată!
              </p>
              <a href="/contact" className="inline-block bg-primary hover:bg-opacity-90 text-white font-medium py-3 px-8 rounded-md transition">
                SOLICITĂ O OFERTĂ
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
