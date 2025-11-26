import { Helmet } from "react-helmet";
import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { X } from "lucide-react";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Aranjament floral pentru nuntă",
    category: "Nunți"
  },
  {
    src: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Buchet de flori",
    category: "Buchete"
  },
  {
    src: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Aranjament floral elegant",
    category: "Aranjamente"
  },
  {
    src: "https://images.unsplash.com/photo-1464699908537-0954e50791ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Workshop floral",
    category: "Workshops"
  },
  {
    src: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Decor eveniment",
    category: "Evenimente"
  },
  {
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Flori colorate",
    category: "Buchete"
  },
  {
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Decor nuntă",
    category: "Nunți"
  },
  {
    src: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Aranjament floral special",
    category: "Aranjamente"
  }
];

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  return (
    <>
      <Helmet>
        <title>Galerie - Atelierul cu flori</title>
        <meta name="description" content="Explorează galeria noastră cu cele mai frumoase aranjamente florale, decoruri de evenimente și creații unice de la Atelierul cu flori." />
      </Helmet>
      
      <div className="py-16 bg-white min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="font-playfair text-3xl text-primary mb-6">GALERIE</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-8"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descoperă creațiile noastre florale și lasă-te inspirat pentru evenimentul tău special.
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
            {galleryImages.map((image, index) => (
              <div 
                key={index}
                className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group"
                onClick={() => setSelectedImage(image.src)}
                data-testid={`gallery-image-${index}`}
              >
                <img 
                  src={image.src} 
                  alt={image.alt}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-end">
                  <div className="p-4 w-full translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <span className="text-white text-sm font-medium bg-primary/80 px-3 py-1 rounded">
                      {image.category}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-muted-foreground italic">
              Această galerie va fi actualizată cu mai multe imagini în curând.
            </p>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          <button 
            onClick={() => setSelectedImage(null)}
            className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            data-testid="close-gallery-modal"
          >
            <X className="h-6 w-6" />
          </button>
          {selectedImage && (
            <img 
              src={selectedImage} 
              alt="Imagine mărită"
              className="w-full h-auto rounded-lg"
            />
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
