import { Button } from "@/components/ui/button";
import { Link } from "wouter";

export default function DeliveryStory() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <div className="mb-4">
          <svg className="h-12 mx-auto" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M25 0C11.2 0 0 11.2 0 25s11.2 25 25 25 25-11.2 25-25S38.8 0 25 0zm0 45c-11 0-20-9-20-20S14 5 25 5s20 9 20 20-9 20-20 20z" fill="#D4AF37"/>
            <path d="M35 20c0 5.5-4.5 10-10 10s-10-4.5-10-10c0-5.5 4.5-10 10-10s10 4.5 10 10z" fill="#D4AF37" fillOpacity=".3"/>
            <path d="M40 12c0 2.8-2.2 5-5 5s-5-2.2-5-5 2.2-5 5-5 5 2.2 5 5z" fill="#D4AF37"/>
          </svg>
        </div>
        <h2 className="font-script text-3xl md:text-4xl text-primary mb-4">Povești cu livrare la domiciliu</h2>
        <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
          Ziua mamei, aniversarea celei mai bune prietene sau celebrarea legământului vostru, toate aceste momente merită să fie sărbătorite cu emoții și flori parfumate. Suntem aici pentru a-ți acorda o mână de ajutor!
        </p>
        {/* Button commented out per user request
        <Button asChild className="bg-accent hover:bg-opacity-90 text-white font-medium py-3 px-8">
          <Link href="/shop">FLORĂRIE ONLINE</Link>
        </Button>
        */}
      </div>
    </section>
  );
}
