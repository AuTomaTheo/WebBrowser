import { useEffect } from 'react';
import { useQueryClient } from '@tanstack/react-query';

export function useGalleryPrefetch() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const prefetchGalleryData = () => {
      queryClient.prefetchQuery({
        queryKey: ['/api/gallery/events'],
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
      });

      queryClient.prefetchQuery({
        queryKey: ['/api/gallery'],
        staleTime: 5 * 60 * 1000,
        gcTime: 30 * 60 * 1000,
      });
    };

    if ('requestIdleCallback' in window) {
      const id = (window as Window).requestIdleCallback(() => prefetchGalleryData(), { timeout: 5000 });
      return () => (window as Window).cancelIdleCallback(id);
    } else {
      const timer = setTimeout(prefetchGalleryData, 2000);
      return () => clearTimeout(timer);
    }
  }, [queryClient]);
}
