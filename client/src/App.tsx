import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Layout from "@/components/Layout";
import Home from "@/pages/Home";
import Testimonials from "@/pages/Testimonials";
import About from "@/pages/About";
import Shop from "@/pages/Shop";
import EventPlanning from "@/pages/EventPlanning";
import Rentals from "@/pages/Rentals";
import Workshops from "@/pages/Workshops";
import Contact from "@/pages/Contact";
import SearchResultsPage from "@/pages/SearchResultsPage";
import AuthPage from "@/pages/auth-page";
import Checkout from "@/pages/checkout";
import Cart from "@/pages/cart";
import ProfilePage from "@/pages/ProfilePage";
import OrdersPage from "@/pages/OrdersPage";
import WishlistPage from "@/pages/WishlistPage";
import { AuthProvider } from "./hooks/use-auth";
import { ProtectedRoute } from "./lib/protected-route";
import ScrollToTop from "@/components/ScrollToTop";
import Snow from "@/components/Snow";

// These pages will have their own layouts
const PAGES_WITHOUT_LAYOUT = ["/auth", "/checkout"];

function Router() {
  return (
    <Switch>
      {/* Auth page without Layout */}
      <Route path="/auth" component={AuthPage} />
      
      {/* Checkout page - protected and without main layout */}
      <ProtectedRoute path="/checkout" component={Checkout} />
      
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
                <Route path="/shop" component={Shop} />
                <Route path="/event-planning" component={EventPlanning} />
                <Route path="/rentals" component={Rentals} />
                <Route path="/workshops" component={Workshops} />
                <Route path="/testimoniale" component={Testimonials} />
                <Route path="/contact" component={Contact} />
                <Route path="/cart" component={Cart} />
                <Route path="/search" component={SearchResultsPage} />
                <ProtectedRoute path="/profile" component={ProfilePage} />
                <ProtectedRoute path="/orders" component={OrdersPage} />
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
        <Snow />
        <ScrollToTop />
        <Router />
        <Toaster />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;
