import MainCategories from "@/components/home/MainCategories";
import ServiceHighlights from "@/components/home/ServiceHighlights";
import DeliveryStory from "@/components/home/DeliveryStory";
import PopularCategories from "@/components/home/PopularCategories";
import SubscriptionSection from "@/components/home/SubscriptionSection";
import TestimonialsPreview from "@/components/home/TestimonialsPreview";
import { Helmet } from "react-helmet";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Atelierul cu flori - Florărie și Decoruri pentru Evenimente</title>
        <meta name="description" content="Atelierul cu flori - Atelier floral specializat în aranjamente florale deosebite, buchete personalizate, design pentru nunți și alte evenimente speciale." />
      </Helmet>
      
      <MainCategories />
      <ServiceHighlights />
      <DeliveryStory />
      <PopularCategories />
      <SubscriptionSection />
      <TestimonialsPreview />
    </>
  );
}
