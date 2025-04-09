import HeroCategories from '@/components/HomePage/HeroCategories';
import ServiceHighlights from '@/components/HomePage/ServiceHighlights';
import FlowerDeliveryMessage from '@/components/HomePage/FlowerDeliveryMessage';
import PopularCategories from '@/components/HomePage/PopularCategories';
import SubscriptionForm from '@/components/HomePage/SubscriptionForm';
import TestimonialsPreview from '@/components/HomePage/TestimonialsPreview';

export default function Home() {
  return (
    <>
      <HeroCategories />
      <ServiceHighlights />
      <FlowerDeliveryMessage />
      <PopularCategories />
      <SubscriptionForm />
      <TestimonialsPreview />
    </>
  );
}
