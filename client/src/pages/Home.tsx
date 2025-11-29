import HeroCategories from '@/components/HomePage/HeroCategories';
import ServiceHighlights from '@/components/HomePage/ServiceHighlights';
import FlowerDeliveryMessage from '@/components/HomePage/FlowerDeliveryMessage';
import TestimonialsPreview from '@/components/HomePage/TestimonialsPreview';
import { useGalleryPrefetch } from '@/hooks/useGalleryPrefetch';

export default function Home() {
  useGalleryPrefetch();
  
  return (
    <>
      <FlowerDeliveryMessage />
      <HeroCategories />
      <ServiceHighlights />
      <TestimonialsPreview />
    </>
  );
}
