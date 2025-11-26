import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
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
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import ScrollToTop from "@/components/ScrollToTop";

// These pages will have their own layouts
const PAGES_WITHOUT_LAYOUT = ["/auth"];

function Router() {
  return (
    <Switch>
      {/* Auth page without Layout */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Routes with Layout */}
      <Route path="*">
        {(params) => {
          const currentPath = params["*"];
          
          // Don't wrap pages that have their own layout
          if (PAGES_WITHOUT_LAYOUT.some(path => currentPath.startsWith(path.substring(1)))) {
            return <NotFound />;
          }
          
          return (
            <Layout>
              <Switch>
                <Route path="/" component={Home} />
                <Route path="/despre-noi" component={About} />
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
