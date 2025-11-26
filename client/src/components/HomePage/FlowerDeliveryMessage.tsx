import { Link } from 'wouter';
import { Button } from '@/components/ui/button';
import { ServiceIcon } from '../icons/CustomIcons';

export default function FlowerDeliveryMessage() {
  return (
    <section className="py-16 text-center bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-center mb-4">
          <div className="text-secondary text-4xl">
            <ServiceIcon name="leaf" className="h-10 w-10" />
          </div>
        </div>
        
        <p className="text-textMedium max-w-2xl mx-auto mb-4 leading-relaxed">
          De mai bine de 4 ani de zile mi-am transformat visul în realitate. Am iubit din totdeauna florile însă în ultimii ani am învățat să le prețuiesc, îngrijesc și ofer sub o altă formă.
        </p>
        
        <p className="text-primary font-medium max-w-2xl mx-auto mb-6">
          Bună, sunt Oana de la Atelierul cu Flori și încerc să livrez mai mult decât un serviciu!
        </p>
        
        {/* Button commented out per user request
        <Link href="/shop">
          <Button className="bg-primary text-white px-6 py-3 font-medium rounded hover:bg-opacity-90 transition">
            FLORĂRIE ONLINE
          </Button>
        </Link>
        */}
      </div>
    </section>
  );
}
