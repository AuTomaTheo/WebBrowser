import { Helmet } from "react-helmet";
import { Testimonial } from "@/lib/types";
import { Star } from "lucide-react";

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "Julia Roman",
    content: [
      "Andreea mi-a transformat visul in realitate implicandu-se in povestea mea fara ezitari, desi paseam impreuna intr-un necunoscut.",
      "Datorita ei am reusit sa dau viata unui concept cu totul nou in Romania si in lumea culturala.",
      "Cu sprijinul neconditionat al Andreei am reusit editiile de-a randul sa oferim publicului o experienta inedita, intr-un decor floral adecvat.",
      "Ii sunt recunoscatoare Andreei pentru sprijinul, implicarea si daruirea pe care ni le ofera cu ocazia fiecarui proiect, ce devin unice datorita ei."
    ],
    rating: 5
  },
  {
    id: 2,
    name: "Daniela Bratu",
    content: [
      "Apreciez deschiderea cu care Andreea lucreaza - de fiecare data cand ne-am intalnit sau am discutat, a fost foarte atenta la detalii, foarte implicata si m-a impresionat capacitatea creativa."
    ],
    rating: 5
  },
  {
    id: 3,
    name: "Monica Dumitrescu",
    content: [
      "Am colaborat cu Milk & Honey pentru nunta mea și totul a fost perfect. Andreea a înțeles exact ceea ce ne doream și a creat un decor floral minunat, care a transformat locația complet. Recomand cu încredere!"
    ],
    rating: 5
  },
  {
    id: 4,
    name: "Elena Popescu",
    content: [
      "Am comandat un buchet de flori pentru mama mea și a fost chiar mai frumos decât în poze. Prospețimea florilor și aranjamentul au fost impecabile. Cu siguranță voi mai comanda și în viitor."
    ],
    rating: 5
  }
];

export default function TestimonialsPage() {
  return (
    <>
      <Helmet>
        <title>Testimoniale - Milk & Honey</title>
        <meta name="description" content="Descoperă experiențele clienților noștri cu serviciile Milk & Honey. Recenzii și mărturii despre aranjamentele florale și organizarea de evenimente." />
      </Helmet>
      
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 max-w-4xl">
          <h1 className="font-serif text-3xl text-center mb-12">Testimoniale</h1>
          
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="mb-12 pb-12 border-b border-gray-200 last:border-b-0">
              <div className="flex text-yellow-400 mb-2">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star key={i} className="fill-current h-5 w-5" />
                ))}
              </div>
              <h3 className="font-script text-2xl text-primary mb-4">{testimonial.name}</h3>
              {testimonial.content.map((paragraph, index) => (
                <p key={index} className="text-gray-700 mb-4 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>
    </>
  );
}
