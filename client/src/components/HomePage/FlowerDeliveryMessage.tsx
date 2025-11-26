import oanaPhoto from '@assets/Poza pagina home site_1764199931139.jpg';

export default function FlowerDeliveryMessage() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-5xl mx-auto">
          {/* Photo */}
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative">
              <img 
                src={oanaPhoto} 
                alt="Oana de la Atelierul cu Flori"
                className="w-80 h-96 object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
          
          {/* Text */}
          <div className="w-full md:w-1/2 text-center md:text-left">
            <p className="text-textMedium text-lg leading-relaxed mb-6">
              De mai bine de 4 ani de zile mi-am transformat visul în realitate. Am iubit din totdeauna florile însă în ultimii ani am învățat să le prețuiesc, îngrijesc și ofer sub o altă formă.
            </p>
            
            <p className="text-primary font-medium text-lg italic">
              Bună, sunt Oana de la Atelierul cu Flori și încerc să livrez mai mult decât un serviciu!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
