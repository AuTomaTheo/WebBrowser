import { Helmet } from "react-helmet";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { X, Loader2 } from "lucide-react";
import type { GalleryImage } from "@shared/schema";

type GalleryCategory = "Nunți" | "Botezuri" | "Workshops" | "Tematice";

interface LocalGalleryImage {
  src: string;
  alt: string;
  category: GalleryCategory;
}

const sampleImages: LocalGalleryImage[] = [
  {
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Decor floral nuntă elegantă",
    category: "Nunți"
  },
  {
    src: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Aranjament floral pentru nuntă",
    category: "Nunți"
  },
  {
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Decor masă nuntă",
    category: "Nunți"
  },
  {
    src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Buchet mireasă",
    category: "Nunți"
  },
  {
    src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Aranjament botez roz",
    category: "Botezuri"
  },
  {
    src: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Decor botez elegant",
    category: "Botezuri"
  },
  {
    src: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Flori delicate botez",
    category: "Botezuri"
  },
  {
    src: "https://images.unsplash.com/photo-1464699908537-0954e50791ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Workshop aranjamente florale",
    category: "Workshops"
  },
  {
    src: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Atelier floral",
    category: "Workshops"
  },
  {
    src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Workshop buchete",
    category: "Workshops"
  },
  {
    src: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Aranjament Halloween",
    category: "Tematice"
  },
  {
    src: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Decorațiuni Paște",
    category: "Tematice"
  },
  {
    src: "https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Aranjament Crăciun",
    category: "Tematice"
  },
  {
    src: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    alt: "Aranjament corporate tematic",
    category: "Tematice"
  }
];

const categories = [
  { id: "toate", label: "Toate" },
  { id: "nunti", label: "Nunți" },
  { id: "botezuri", label: "Botezuri" },
  { id: "workshops", label: "Workshops" },
  { id: "tematice", label: "Tematice" }
];

const categoryMap: Record<string, GalleryCategory> = {
  "nunti": "Nunți",
  "botezuri": "Botezuri",
  "workshops": "Workshops",
  "tematice": "Tematice"
};

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("toate");

  const { data: dbImages, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery']
  });

  const hasDbImages = dbImages && dbImages.length > 0;

  const filteredImages = activeCategory === "toate"
    ? hasDbImages 
      ? dbImages.map(img => ({ src: img.url, alt: img.alt || img.filename, category: img.category as GalleryCategory }))
      : sampleImages
    : hasDbImages
      ? dbImages
          .filter(img => img.category === categoryMap[activeCategory])
          .map(img => ({ src: img.url, alt: img.alt || img.filename, category: img.category as GalleryCategory }))
      : sampleImages.filter(img => img.category === categoryMap[activeCategory]);

  return (
    <>
      <Helmet>
        <title>Galerie - Atelierul cu flori</title>
        <meta name="description" content="Explorează galeria noastră cu cele mai frumoase aranjamente florale pentru nunți, botezuri, workshops și aranjamente tematice." />
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
          
          <Tabs value={activeCategory} onValueChange={setActiveCategory} className="w-full mb-10">
            <TabsList className="w-full max-w-2xl mx-auto flex justify-center bg-gray-100/50 p-1 rounded-lg">
              {categories.map((cat) => (
                <TabsTrigger 
                  key={cat.id} 
                  value={cat.id}
                  className="flex-1 px-4 py-2 text-sm font-medium data-[state=active]:bg-white data-[state=active]:text-primary data-[state=active]:shadow-sm rounded-md transition-all"
                  data-testid={`gallery-tab-${cat.id}`}
                >
                  {cat.label}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
          
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-6xl mx-auto">
              {filteredImages.map((image, index) => (
                <div 
                  key={`${activeCategory}-${index}`}
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
          )}
          
          {filteredImages.length === 0 && !isLoading && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">
                Nu există imagini în această categorie momentan.
              </p>
            </div>
          )}
          
          {!hasDbImages && (
            <div className="text-center mt-12">
              <p className="text-muted-foreground italic">
                Această galerie va fi actualizată cu mai multe imagini în curând.
              </p>
            </div>
          )}
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
