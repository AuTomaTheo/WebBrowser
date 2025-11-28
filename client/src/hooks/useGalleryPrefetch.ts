import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import type { GalleryImage, GalleryEvent } from '@shared/schema';

const MAX_IMAGES_TO_PREFETCH = 20;

export function useGalleryPrefetch() {
  const queryClient = useQueryClient();

  useEffect(() => {
    let aborted = false;

    const prefetchGalleryData = async () => {
      try {
        await queryClient.prefetchQuery({
          queryKey: ['/api/gallery/events'],
          staleTime: 5 * 60 * 1000,
          gcTime: 30 * 60 * 1000,
        });

        await queryClient.prefetchQuery({
          queryKey: ['/api/gallery'],
          staleTime: 5 * 60 * 1000,
          gcTime: 30 * 60 * 1000,
        });

        if (aborted) return;

        const images = queryClient.getQueryData<GalleryImage[]>(['/api/gallery']);
        
        if (images && images.length > 0) {
          const imagesToPrefetch = images.slice(0, MAX_IMAGES_TO_PREFETCH);
          
          const prefetchImages = () => {
            if (aborted) return;
            
            imagesToPrefetch.forEach((img, index) => {
              if (aborted) return;
              
              setTimeout(() => {
                if (aborted) return;
                const image = new Image();
                image.src = img.url;
              }, index * 100);
            });
          };

          if ('requestIdleCallback' in window) {
            (window as Window).requestIdleCallback(() => prefetchImages(), { timeout: 3000 });
          } else {
            setTimeout(prefetchImages, 1000);
          }
        }

        const events = queryClient.getQueryData<GalleryEvent[]>(['/api/gallery/events']);
        if (events && events.length > 0 && images) {
          events.slice(0, 8).forEach(event => {
            const eventImage = images.find(img => img.eventId === event.id);
            if (eventImage) {
              const link = document.createElement('link');
              link.rel = 'prefetch';
              link.as = 'image';
              link.href = eventImage.url;
              document.head.appendChild(link);
            }
          });
        }

      } catch (error) {
        console.log('Gallery prefetch skipped');
      }
    };

    const timer = setTimeout(prefetchGalleryData, 500);

    return () => {
      aborted = true;
      clearTimeout(timer);
    };
  }, [queryClient]);
}
