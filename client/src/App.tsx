import { Switch, Route } from "wouter";
import { lazy, Suspense } from "react";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Home2 from "@/pages/Home2";
import Testimonials from "@/pages/Testimonials";
import About from "@/pages/About";
import EventPlanning from "@/pages/EventPlanning";
import Rentals from "@/pages/Rentals";
import Workshops from "@/pages/Workshops";
import Contact from "@/pages/Contact";
import SearchResultsPage from "@/pages/SearchResultsPage";
import AuthPage from "@/pages/auth-page";
import ProfilePage from "@/pages/ProfilePage";
import WishlistPage from "@/pages/WishlistPage";
import TermsPage from "@/pages/TermsPage";
import PrivacyPage from "@/pages/PrivacyPage";
import DeliveryPage from "@/pages/DeliveryPage";
import FAQPage from "@/pages/FAQPage";
import ServiciiPage from "@/pages/ServiciiPage";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import ScrollToTop from "@/components/ScrollToTop";

const LazyGaleriePage = lazy(() => import("@/pages/GaleriePage"));
const LazyAdminGalleryUpload = lazy(() => import("@/pages/AdminGalleryUpload"));
const LazyAdminReviews = lazy(() => import("@/pages/AdminReviews"));

function PageLoader() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <div className="animate-pulse flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-primary/20" />
        <div className="h-2 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}

function GaleriePage() {
  return (
    <Suspense fallback={<PageLoader />}>
      <LazyGaleriePage />
    </Suspense>
  );
}

function AdminGalleryUpload() {
  return (
    <Suspense fallback={<PageLoader />}>
      <LazyAdminGalleryUpload />
    </Suspense>
  );
}

function AdminReviews() {
  return (
    <Suspense fallback={<PageLoader />}>
      <LazyAdminReviews />
    </Suspense>
  );
}

const PAGES_WITHOUT_LAYOUT = ["/auth", "/admin"];

function Router() {
  return (
    <Switch>
      <Route path="/auth" component={AuthPage} />
      
      <Route path="/admin/gallery" component={AdminGalleryUpload} />
      <Route path="/admin/reviews" component={AdminReviews} />
      
      <Route path="*">
        {(params) => {
          const currentPath = params["*"];
          
          if (PAGES_WITHOUT_LAYOUT.some(path => currentPath.startsWith(path.substring(1)))) {
            return <NotFound />;
          }
          
          return (
            <Layout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/home2" component={Home2} />
                <Route path="/despre-noi" component={About} />
                <Route path="/servicii" component={ServiciiPage} />
                <Route path="/galerie" component={GaleriePage} />
                <Route path="/event-planning" component={EventPlanning} />
                <Route path="/rentals" component={Rentals} />
                <Route path="/workshops" component={Workshops} />
                <Route path="/testimoniale" component={Testimonials} />
                <Route path="/contact" component={Contact} />
                <Route path="/search" component={SearchResultsPage} />
                <Route path="/termeni-conditii" component={TermsPage} />
                <Route path="/politica-confidentialitate" component={PrivacyPage} />
                <Route path="/politica-livrare" component={DeliveryPage} />
                <Route path="/intrebari-frecvente" component={FAQPage} />
                <ProtectedRoute path="/profile" component={ProfilePage} />
                <ProtectedRoute path="/wishlist" component={WishlistPage} />
                <Route component={NotFound} />
              </Switch>
            </Layout>
          );
        }}
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <ScrollToTop />
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
