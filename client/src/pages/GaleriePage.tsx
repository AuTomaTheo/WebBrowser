import { Helmet } from "react-helmet";
import { useState, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X, Folder, ArrowLeft } from "lucide-react";
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
  { id: "nunti", label: "Nunți", dbId: "Nunți" },
  { id: "botezuri", label: "Botezuri", dbId: "Botezuri" },
  { id: "workshops", label: "Workshops", dbId: "Workshops" },
  { id: "tematice", label: "Tematice", dbId: "Tematice" }
];

const IMAGES_PER_PAGE = 12;

type ViewState = 
  | { level: 'categories' }
  | { level: 'folders'; category: typeof categories[0] }
  | { level: 'images'; category: typeof categories[0]; event: GalleryEvent };

export default function GaleriePage() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewState, setViewState] = useState<ViewState>({ level: 'categories' });
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);

  const { data: events } = useQuery<GalleryEvent[]>({
    queryKey: ['/api/gallery/events'],
    staleTime: 5 * 60 * 1000
  });

  const { data: dbImages } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
    staleTime: 5 * 60 * 1000
  });

  const selectedEventId = viewState.level === 'images' ? viewState.event.id : null;

  const { data: eventImages } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery/events', selectedEventId, 'images'],
    queryFn: async () => {
      if (!selectedEventId) return [];
      const res = await fetch(`/api/gallery/events/${selectedEventId}/images`);
      return res.json();
    },
    enabled: !!selectedEventId,
    staleTime: 5 * 60 * 1000
  });

  const hasDbImages = dbImages && dbImages.length > 0;

  const getEventsForCategory = useCallback((categoryDbId: string) => {
    return events?.filter(e => e.category === categoryDbId) || [];
  }, [events]);

  const goToCategory = useCallback((category: typeof categories[0]) => {
    setViewState({ level: 'folders', category });
    setVisibleCount(IMAGES_PER_PAGE);
  }, []);

  const goToEvent = useCallback((event: GalleryEvent, category: typeof categories[0]) => {
    setViewState({ level: 'images', category, event });
    setVisibleCount(IMAGES_PER_PAGE);
  }, []);

  const goBack = useCallback(() => {
    if (viewState.level === 'images') {
      setViewState({ level: 'folders', category: viewState.category });
    } else if (viewState.level === 'folders') {
      setViewState({ level: 'categories' });
    }
    setVisibleCount(IMAGES_PER_PAGE);
  }, [viewState]);

  const displayImages = useMemo((): DisplayImage[] => {
    if (viewState.level === 'images' && eventImages) {
      return eventImages.map(img => ({ 
        id: `db-${img.id}`,
        src: img.url, 
        alt: img.alt || img.filename, 
        category: img.category as GalleryCategory 
      }));
    }
    return [];
  }, [viewState, eventImages]);

  const visibleImages = useMemo(() => {
    return displayImages.slice(0, visibleCount);
  }, [displayImages, visibleCount]);

  const hasMore = visibleCount < displayImages.length;

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + IMAGES_PER_PAGE);
  }, []);

  const getBreadcrumb = () => {
    if (viewState.level === 'categories') return null;
    if (viewState.level === 'folders') return viewState.category.label;
    if (viewState.level === 'images') return `${viewState.category.label} / ${viewState.event.name}`;
    return null;
  };

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

          {viewState.level !== 'categories' && (
            <div className="flex items-center gap-3 mb-6">
              <button
                onClick={goBack}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                data-testid="button-back"
              >
                <ArrowLeft className="h-4 w-4" />
                Înapoi
              </button>
              <span className="text-sm text-muted-foreground">/</span>
              <span className="text-sm font-medium">{getBreadcrumb()}</span>
            </div>
          )}
          
          {viewState.level === 'categories' && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {categories.map((cat) => {
                const categoryEvents = getEventsForCategory(cat.dbId);
                const eventCount = categoryEvents.length;
                
                return (
                  <button
                    key={cat.id}
                    onClick={() => goToCategory(cat)}
                    className="group p-8 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all text-center"
                    data-testid={`category-${cat.id}`}
                  >
                    <Folder className="h-12 w-12 mx-auto mb-4 text-primary/60 group-hover:text-primary transition-colors" />
                    <h3 className="font-medium text-gray-800 group-hover:text-primary transition-colors">{cat.label}</h3>
                    {eventCount > 0 && (
                      <p className="text-xs text-muted-foreground mt-1">{eventCount} {eventCount === 1 ? 'folder' : 'foldere'}</p>
                    )}
                  </button>
                );
              })}
            </div>
          )}

          {viewState.level === 'folders' && (
            <>
              {(() => {
                const categoryEvents = getEventsForCategory(viewState.category.dbId);
                
                if (categoryEvents.length === 0) {
                  const categorySampleImages = sampleImages.filter(img => img.category === viewState.category.dbId);
                  const categoryDbImages = hasDbImages 
                    ? dbImages.filter(img => img.category === viewState.category.dbId).map(img => ({
                        id: `db-${img.id}`,
                        src: img.url,
                        alt: img.alt || img.filename,
                        category: img.category as GalleryCategory
                      }))
                    : [];
                  
                  const imagesToShow = categoryDbImages.length > 0 ? categoryDbImages : categorySampleImages;
                  
                  return (
                    <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                      {imagesToShow.slice(0, visibleCount).map((image, index) => (
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
                  );
                }
                
                return (
                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {categoryEvents.map((event) => (
                      <button
                        key={event.id}
                        onClick={() => goToEvent(event, viewState.category)}
                        className="group p-6 rounded-xl border border-gray-200 hover:border-primary/30 hover:bg-primary/5 transition-all text-center"
                        data-testid={`folder-${event.id}`}
                      >
                        <Folder className="h-10 w-10 mx-auto mb-3 text-primary/60 group-hover:text-primary transition-colors" />
                        <h3 className="font-medium text-sm text-gray-800 group-hover:text-primary transition-colors truncate">{event.name}</h3>
                      </button>
                    ))}
                  </div>
                );
              })()}
            </>
          )}

          {viewState.level === 'images' && (
            <>
              {visibleImages.length > 0 ? (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
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
                    Nu există imagini în acest folder momentan.
                  </p>
                </div>
              )}
            </>
          )}
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
