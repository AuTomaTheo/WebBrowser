import HeroCategories from '@/components/HomePage/HeroCategories';
import ServiceHighlights from '@/components/HomePage/ServiceHighlights';
import FlowerDeliveryMessage from '@/components/HomePage/FlowerDeliveryMessage';
import SubscriptionForm from '@/components/HomePage/SubscriptionForm';
import TestimonialsPreview from '@/components/HomePage/TestimonialsPreview';

export default function Home2() {
  return (
    <>
      <HeroCategories />
      <ServiceHighlights />
      <FlowerDeliveryMessage />
      <SubscriptionForm />
      <TestimonialsPreview />
    </>
  );
}
