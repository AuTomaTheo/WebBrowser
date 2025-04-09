import { serviceHighlights } from '@/lib/data';
import { ServiceIcon } from '../icons/CustomIcons';

export default function ServiceHighlights() {
  return (
    <section className="bg-cream py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {serviceHighlights.map((service) => (
            <div key={service.id} className="flex flex-col items-center text-center group">
              <div className="text-secondary text-4xl mb-4 transition-transform duration-300 group-hover:translate-y-[-5px]">
                <ServiceIcon name={service.icon} className="h-10 w-10" />
              </div>
              <h3 className="font-playfair text-lg text-primary mb-2">{service.title}</h3>
              <p className="text-textMedium text-sm">{service.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
