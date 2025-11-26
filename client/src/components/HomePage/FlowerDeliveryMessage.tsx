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
        
        <h2 className="font-dancing text-3xl text-primary mb-4">Povești cu livrare la domiciliu</h2>
        
        <p className="text-textMedium max-w-2xl mx-auto mb-6">
          Ziua mamei, aniversarea celei mai bune prietene sau celebrarea legământului vostru, toate aceste momente merită să fie 
          sărbătorite cu emoții și flori parfumate. Suntem aici pentru a-ți acorda o mână de ajutor!
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
