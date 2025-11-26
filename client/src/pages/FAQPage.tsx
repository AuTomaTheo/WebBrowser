import { Helmet } from "react-helmet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQPage() {
  const faqs = [
    {
      question: "Cum pot plasa o comandă?",
      answer: "Răspunsul va fi adăugat aici."
    },
    {
      question: "Care sunt modalitățile de plată acceptate?",
      answer: "Răspunsul va fi adăugat aici."
    },
    {
      question: "Cât durează livrarea?",
      answer: "Răspunsul va fi adăugat aici."
    },
    {
      question: "Pot returna un produs?",
      answer: "Răspunsul va fi adăugat aici."
    },
    {
      question: "Cum pot contacta echipa de suport?",
      answer: "Răspunsul va fi adăugat aici."
    }
  ];

  return (
    <>
      <Helmet>
        <title>Întrebări Frecvente - Atelierul cu flori</title>
        <meta name="description" content="Răspunsuri la cele mai frecvente întrebări despre serviciile Atelierul cu flori." />
      </Helmet>
      
      <div className="py-16 bg-white min-h-[70vh]">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl text-primary mb-6">ÎNTREBĂRI FRECVENTE</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Găsește răspunsuri la cele mai frecvente întrebări despre serviciile noastre.
            </p>
          </div>
          
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border-b border-gray-200">
                <AccordionTrigger className="text-left font-playfair text-primary hover:text-secondary py-4">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          
          <div className="mt-12 text-center">
            <p className="text-muted-foreground">
              Nu ai găsit răspunsul căutat? <a href="/contact" className="text-primary hover:text-secondary underline">Contactează-ne</a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
