import { Route, Switch } from "wouter";
import HomePage from "./pages/HomePage";
import TestimonialsPage from "./pages/TestimonialsPage";
import AboutPage from "./pages/AboutPage";
import ShopPage from "./pages/ShopPage";
import EventPlanningPage from "./pages/EventPlanningPage";
import RentalsPage from "./pages/RentalsPage";
import WorkshopsPage from "./pages/WorkshopsPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/not-found";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import CookieConsent from "./components/ui/cookie-consent";
import BackToTop from "./components/ui/back-to-top";

function App() {
  return (
    <div className="min-h-screen flex flex-col bg-[#FFFDF5]">
      <Header />
      <main className="flex-grow">
        <Switch>
          <Route path="/" component={HomePage} />
          <Route path="/despre-noi" component={AboutPage} />
          <Route path="/shop" component={ShopPage} />
          <Route path="/event-planning" component={EventPlanningPage} />
          <Route path="/rentals" component={RentalsPage} />
          <Route path="/workshops" component={WorkshopsPage} />
          <Route path="/testimoniale" component={TestimonialsPage} />
          <Route path="/contact" component={ContactPage} />
          <Route component={NotFound} />
        </Switch>
      </main>
      <Footer />
      <CookieConsent />
      <BackToTop />
    </div>
  );
}

export default App;
