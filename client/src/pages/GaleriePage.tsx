import { Helmet } from "react-helmet";
import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X, Loader2, ChevronRight, ChevronDown, Folder } from "lucide-react";
import type { GalleryImage, GalleryEvent } from "@shared/schema";

type GalleryCategory = "Nunți" | "Botezuri" | "Workshops" | "Tematice";

interface DisplayImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}

const sampleImages: DisplayImage[] = [
  { id: "s1", src: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Decor floral nuntă elegantă", category: "Nunți" },
  { id: "s2", src: "https://images.unsplash.com/photo-1487530811176-3780de880c2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Aranjament floral pentru nuntă", category: "Nunți" },
  { id: "s3", src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Decor masă nuntă", category: "Nunți" },
  { id: "s4", src: "https://images.unsplash.com/photo-1478146896981-b80fe463b330?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Buchet mireasă", category: "Nunți" },
  { id: "s5", src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Aranjament botez roz", category: "Botezuri" },
  { id: "s6", src: "https://images.unsplash.com/photo-1522748906645-95d8adfd52c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Decor botez elegant", category: "Botezuri" },
  { id: "s7", src: "https://images.unsplash.com/photo-1563241527-3004b7be0ffd?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Flori delicate botez", category: "Botezuri" },
  { id: "s8", src: "https://images.unsplash.com/photo-1464699908537-0954e50791ee?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Workshop aranjamente florale", category: "Workshops" },
  { id: "s9", src: "https://images.unsplash.com/photo-1508610048659-a06b669e3321?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Atelier floral", category: "Workshops" },
  { id: "s10", src: "https://images.unsplash.com/photo-1490750967868-88aa4486c946?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Workshop buchete", category: "Workshops" },
  { id: "s11", src: "https://images.unsplash.com/photo-1509557965875-b88c97052f0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Aranjament Halloween", category: "Tematice" },
  { id: "s12", src: "https://images.unsplash.com/photo-1457089328109-e5d9bd499191?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Decorațiuni Paște", category: "Tematice" },
  { id: "s13", src: "https://images.unsplash.com/photo-1512909006721-3d6018887383?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Aranjament Crăciun", category: "Tematice" },
  { id: "s14", src: "https://images.unsplash.com/photo-1561181286-d3fee7d55364?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=70", alt: "Aranjament corporate tematic", category: "Tematice" }
];

const categories = [
  { id: "toate", label: "Toate", dbId: null },
  { id: "nunti", label: "Nunți", dbId: "Nunți" },
  { id: "botezuri", label: "Botezuri", dbId: "Botezuri" },
  { id: "workshops", label: "Workshops", dbId: "Workshops" },
  { id: "tematice", label: "Tematice", dbId: "Tematice" }
];

const IMAGES_PER_PAGE = 12;

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [activeCategory, setActiveCategory] = useState("toate");
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);

  const { data: events } = useQuery<GalleryEvent[]>({
    queryKey: ['/api/gallery/events'],
    staleTime: 5 * 60 * 1000
  });

  const { data: dbImages, isLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
    staleTime: 5 * 60 * 1000
  });

  const { data: eventImages } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery/events', selectedEvent?.id, 'images'],
    queryFn: async () => {
      if (!selectedEvent) return [];
      const res = await fetch(`/api/gallery/events/${selectedEvent.id}/images`);
      return res.json();
    },
    enabled: !!selectedEvent,
    staleTime: 5 * 60 * 1000
  });

  const hasDbImages = dbImages && dbImages.length > 0;
  const hasEvents = events && events.length > 0;

  const getEventsForCategory = useCallback((categoryDbId: string) => {
    return events?.filter(e => e.category === categoryDbId) || [];
  }, [events]);

  const toggleCategory = useCallback((categoryId: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [categoryId]: !prev[categoryId]
    }));
  }, []);

  const handleCategoryClick = useCallback((category: typeof categories[0]) => {
    setActiveCategory(category.id);
    setSelectedEvent(null);
    setVisibleCount(IMAGES_PER_PAGE);
  }, []);

  const handleEventClick = useCallback((event: GalleryEvent, categoryId: string) => {
    setSelectedEvent(event);
    setActiveCategory(categoryId);
    setVisibleCount(IMAGES_PER_PAGE);
  }, []);

  const displayImages = useMemo((): DisplayImage[] => {
    if (selectedEvent && eventImages) {
      return eventImages.map(img => ({ 
        id: `db-${img.id}`,
        src: img.url, 
        alt: img.alt || img.filename, 
        category: img.category as GalleryCategory 
      }));
    }

    if (activeCategory === "toate") {
      if (hasDbImages) {
        return dbImages.map(img => ({ 
          id: `db-${img.id}`,
          src: img.url, 
          alt: img.alt || img.filename, 
          category: img.category as GalleryCategory 
        }));
      }
      return sampleImages;
    }

    const categoryDbId = categories.find(c => c.id === activeCategory)?.dbId;
    if (hasDbImages && categoryDbId) {
      return dbImages
        .filter(img => img.category === categoryDbId)
        .map(img => ({ 
          id: `db-${img.id}`,
          src: img.url, 
          alt: img.alt || img.filename, 
          category: img.category as GalleryCategory 
        }));
    }

    return sampleImages.filter(img => {
      const cat = categories.find(c => c.id === activeCategory);
      return cat?.dbId === img.category;
    });
  }, [activeCategory, selectedEvent, dbImages, eventImages, hasDbImages]);

  const visibleImages = useMemo(() => {
    return displayImages.slice(0, visibleCount);
  }, [displayImages, visibleCount]);

  const hasMore = visibleCount < displayImages.length;

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + IMAGES_PER_PAGE);
  }, []);

  return (
    <>
      <Helmet>
        <title>Galerie - Atelierul cu flori</title>
        <meta name="description" content="Explorează galeria noastră cu cele mai frumoase aranjamente florale pentru nunți, botezuri, workshops și aranjamente tematice." />
      </Helmet>
      
      <div className="py-12 bg-white min-h-[70vh]">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="font-playfair text-3xl text-primary mb-4">GALERIE</h1>
            <div className="w-20 h-1 bg-secondary mx-auto mb-6"></div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Descoperă creațiile noastre florale și lasă-te inspirat pentru evenimentul tău special.
            </p>
          </div>
          
          <div className="flex gap-6">
            <aside className="w-40 flex-shrink-0">
              <nav className="sticky top-24 space-y-0.5">
                {categories.map((cat) => {
                  const categoryEvents = cat.dbId ? getEventsForCategory(cat.dbId) : [];
                  const hasSubfolders = hasEvents && categoryEvents.length > 0;
                  const isExpanded = expandedCategories[cat.id];
                  const isActive = activeCategory === cat.id && !selectedEvent;
                  
                  return (
                    <div key={cat.id}>
                      <button
                        onClick={() => {
                          if (hasSubfolders) {
                            toggleCategory(cat.id);
                          }
                          handleCategoryClick(cat);
                        }}
                        className={`w-full flex items-center gap-1.5 px-3 py-2 rounded text-sm text-left transition-colors ${
                          isActive
                            ? 'bg-primary/10 text-primary font-medium'
                            : 'hover:bg-gray-100 text-gray-700'
                        }`}
                        data-testid={`gallery-nav-${cat.id}`}
                      >
                        {hasSubfolders && (
                          isExpanded ? (
                            <ChevronDown className="h-3.5 w-3.5 flex-shrink-0" />
                          ) : (
                            <ChevronRight className="h-3.5 w-3.5 flex-shrink-0" />
                          )
                        )}
                        <span className={hasSubfolders ? '' : 'ml-5'}>{cat.label}</span>
                      </button>
                      
                      {hasSubfolders && isExpanded && (
                        <div className="ml-4 mt-0.5 space-y-0.5">
                          {categoryEvents.map((event) => (
                            <button
                              key={event.id}
                              onClick={() => handleEventClick(event, cat.id)}
                              className={`w-full flex items-center gap-1.5 px-3 py-1.5 rounded text-left text-xs transition-colors ${
                                selectedEvent?.id === event.id
                                  ? 'bg-primary/10 text-primary font-medium'
                                  : 'hover:bg-gray-100 text-gray-600'
                              }`}
                              data-testid={`gallery-event-${event.id}`}
                            >
                              <Folder className="h-3 w-3 flex-shrink-0" />
                              <span className="truncate">{event.name}</span>
                            </button>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </nav>
            </aside>

            <main className="flex-1">
              {selectedEvent && (
                <div className="mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">{selectedEvent.name}</h2>
                  <p className="text-sm text-muted-foreground">{selectedEvent.category}</p>
                </div>
              )}
              
              {isLoading ? (
                <div className="flex justify-center py-12">
                  <Loader2 className="h-8 w-8 animate-spin text-primary" />
                </div>
              ) : visibleImages.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {visibleImages.map((image, index) => (
                      <div 
                        key={image.id}
                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group bg-gray-100"
                        onClick={() => setSelectedImage(image.src.replace('w=400', 'w=1200').replace('q=70', 'q=85'))}
                        data-testid={`gallery-image-${index}`}
                      >
                        <img 
                          src={image.src} 
                          alt={image.alt}
                          loading="lazy"
                          decoding="async"
                          width={400}
                          height={400}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
                      </div>
                    ))}
                  </div>
                  
                  {hasMore && (
                    <div className="text-center mt-8">
                      <Button 
                        variant="outline" 
                        onClick={loadMore}
                        data-testid="button-load-more"
                      >
                        Încarcă mai multe
                      </Button>
                    </div>
                  )}
                </>
              ) : (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nu există imagini în această categorie momentan.
                  </p>
                </div>
              )}
              
              {!hasDbImages && !selectedEvent && (
                <div className="text-center mt-12">
                  <p className="text-muted-foreground italic">
                    Această galerie va fi actualizată cu mai multe imagini în curând.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={() => setSelectedImage(null)}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          <VisuallyHidden>
            <DialogTitle>Imagine galerie</DialogTitle>
          </VisuallyHidden>
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
