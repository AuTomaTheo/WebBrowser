import { Helmet } from "react-helmet";
import { useState, useMemo, useCallback, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import { X, ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import type { GalleryImage, GalleryEvent } from "@shared/schema";

type GalleryCategory = "Nunți" | "Botezuri" | "Workshops" | "Tematice";

interface DisplayImage {
  id: string;
  src: string;
  alt: string;
  category: GalleryCategory;
}

const categories = [
  { id: "nunti", label: "Nunți", dbId: "Nunți" },
  { id: "botezuri", label: "Botezuri", dbId: "Botezuri" },
  { id: "workshops", label: "Workshops", dbId: "Workshops" },
  { id: "tematice", label: "Tematice", dbId: "Tematice" }
];

const IMAGES_PER_PAGE = 12;

export default function GaleriePage() {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>("nunti");
  const [selectedEvent, setSelectedEvent] = useState<GalleryEvent | null>(null);
  const [visibleCount, setVisibleCount] = useState(IMAGES_PER_PAGE);

  const { data: events, isLoading: eventsLoading } = useQuery<GalleryEvent[]>({
    queryKey: ['/api/gallery/events'],
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const { data: dbImages, isLoading: imagesLoading } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery'],
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const { data: eventImages } = useQuery<GalleryImage[]>({
    queryKey: ['/api/gallery/events', selectedEvent?.id, 'images'],
    queryFn: async () => {
      if (!selectedEvent) return [];
      const res = await fetch(`/api/gallery/events/${selectedEvent.id}/images`);
      return res.json();
    },
    enabled: !!selectedEvent,
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  const isLoading = eventsLoading || imagesLoading;

  const hasDbImages = dbImages && dbImages.length > 0;

  const getEventsForCategory = useCallback((categoryDbId: string) => {
    return events?.filter(e => e.category === categoryDbId) || [];
  }, [events]);

  const getFirstImageForEvent = useCallback((eventId: number) => {
    if (hasDbImages) {
      const img = dbImages.find(img => img.eventId === eventId);
      if (img) return img.url;
    }
    return null;
  }, [dbImages, hasDbImages]);

  const handleCategoryClick = useCallback((categoryId: string) => {
    setActiveCategory(categoryId);
    setSelectedEvent(null);
    setVisibleCount(IMAGES_PER_PAGE);
  }, []);

  const handleEventClick = useCallback((event: GalleryEvent) => {
    setSelectedEvent(event);
    setVisibleCount(IMAGES_PER_PAGE);
  }, []);

  const handleBackToFolders = useCallback(() => {
    setSelectedEvent(null);
    setVisibleCount(IMAGES_PER_PAGE);
  }, []);

  const currentCategory = categories.find(c => c.id === activeCategory);
  const categoryEvents = currentCategory ? getEventsForCategory(currentCategory.dbId) : [];
  const hasFolders = categoryEvents.length > 0;

  const displayImages = useMemo((): DisplayImage[] => {
    if (selectedEvent && eventImages) {
      return eventImages.map(img => ({ 
        id: `db-${img.id}`,
        src: img.url, 
        alt: img.alt || img.filename, 
        category: img.category as GalleryCategory 
      }));
    }

    if (!hasFolders && currentCategory) {
      if (hasDbImages) {
        return dbImages
          .filter(img => img.category === currentCategory.dbId)
          .map(img => ({ 
            id: `db-${img.id}`,
            src: img.url, 
            alt: img.alt || img.filename, 
            category: img.category as GalleryCategory 
          }));
      }
      return [];
    }

    return [];
  }, [selectedEvent, eventImages, hasFolders, currentCategory, dbImages, hasDbImages]);

  const visibleImages = useMemo(() => {
    return displayImages.slice(0, visibleCount);
  }, [displayImages, visibleCount]);

  const hasMore = visibleCount < displayImages.length;

  const loadMore = useCallback(() => {
    setVisibleCount(prev => prev + IMAGES_PER_PAGE);
  }, []);

  const openImage = useCallback((index: number) => {
    setSelectedImageIndex(index);
  }, []);

  const closeImage = useCallback(() => {
    setSelectedImageIndex(null);
  }, []);

  const goToPrevious = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex > 0) {
      setSelectedImageIndex(selectedImageIndex - 1);
    }
  }, [selectedImageIndex]);

  const goToNext = useCallback(() => {
    if (selectedImageIndex !== null && selectedImageIndex < visibleImages.length - 1) {
      setSelectedImageIndex(selectedImageIndex + 1);
    }
  }, [selectedImageIndex, visibleImages.length]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedImageIndex === null) return;
      if (e.key === 'ArrowLeft') goToPrevious();
      if (e.key === 'ArrowRight') goToNext();
      if (e.key === 'Escape') closeImage();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedImageIndex, goToPrevious, goToNext, closeImage]);

  const selectedImage = selectedImageIndex !== null ? visibleImages[selectedImageIndex] : null;
  const canGoPrevious = selectedImageIndex !== null && selectedImageIndex > 0;
  const canGoNext = selectedImageIndex !== null && selectedImageIndex < visibleImages.length - 1;

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
            <aside className="w-36 flex-shrink-0">
              <nav className="sticky top-24 space-y-0.5">
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.id && !selectedEvent;
                  
                  return (
                    <button
                      key={cat.id}
                      onClick={() => handleCategoryClick(cat.id)}
                      className={`w-full px-3 py-2 rounded text-sm text-left transition-colors ${
                        isActive
                          ? 'bg-primary/10 text-primary font-medium'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                      data-testid={`gallery-nav-${cat.id}`}
                    >
                      {cat.label}
                    </button>
                  );
                })}
              </nav>
            </aside>

            <main className="flex-1">
              {isLoading && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="aspect-square rounded-lg bg-gray-200 animate-pulse" />
                  ))}
                </div>
              )}

              {!isLoading && selectedEvent && (
                <div className="flex items-center gap-3 mb-6">
                  <button
                    onClick={handleBackToFolders}
                    className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    data-testid="button-back"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Înapoi
                  </button>
                  <span className="text-sm text-muted-foreground">/</span>
                  <span className="text-sm font-medium">{selectedEvent.name}</span>
                </div>
              )}

              {!isLoading && !selectedEvent && hasFolders && (
                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                  {categoryEvents.map((event) => {
                    const previewImage = getFirstImageForEvent(event.id);
                    
                    return (
                      <button
                        key={event.id}
                        onClick={() => handleEventClick(event)}
                        className="group relative aspect-square overflow-hidden rounded-lg bg-gray-100 text-left"
                        data-testid={`folder-${event.id}`}
                      >
                        {previewImage ? (
                          <img 
                            src={previewImage} 
                            alt={event.name}
                            loading="lazy"
                            decoding="async"
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-200">
                            <span className="text-gray-400 text-sm">Fără imagine</span>
                          </div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-white font-medium text-sm">{event.name}</h3>
                        </div>
                      </button>
                    );
                  })}
                </div>
              )}

              {!isLoading && (selectedEvent || !hasFolders) && visibleImages.length > 0 && (
                <>
                  <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                    {visibleImages.map((image, index) => (
                      <div 
                        key={image.id}
                        className="relative aspect-square overflow-hidden rounded-lg cursor-pointer group bg-gray-100"
                        onClick={() => openImage(index)}
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
              )}

              {!isLoading && (selectedEvent || !hasFolders) && visibleImages.length === 0 && (
                <div className="text-center py-12">
                  <p className="text-muted-foreground">
                    Nu există imagini momentan.
                  </p>
                </div>
              )}
            </main>
          </div>
        </div>
      </div>

      <Dialog open={!!selectedImage} onOpenChange={closeImage}>
        <DialogContent className="max-w-4xl p-0 bg-transparent border-0">
          <VisuallyHidden>
            <DialogTitle>Imagine galerie</DialogTitle>
          </VisuallyHidden>
          
          <button 
            onClick={closeImage}
            className="absolute top-4 right-4 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
            data-testid="close-gallery-modal"
          >
            <X className="h-6 w-6" />
          </button>
          
          {canGoPrevious && (
            <button 
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              data-testid="gallery-prev"
            >
              <ChevronLeft className="h-6 w-6" />
            </button>
          )}
          
          {canGoNext && (
            <button 
              onClick={goToNext}
              className="absolute right-16 top-1/2 -translate-y-1/2 z-10 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              data-testid="gallery-next"
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          )}
          
          {selectedImage && (
            <img 
              src={selectedImage.src.replace('w=400', 'w=1200').replace('q=70', 'q=85')} 
              alt={selectedImage.alt}
              className="max-w-full max-h-[85vh] w-auto h-auto mx-auto rounded-lg object-contain"
            />
          )}
          
          {selectedImageIndex !== null && visibleImages.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
              {selectedImageIndex + 1} / {visibleImages.length}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
