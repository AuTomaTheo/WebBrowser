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

function Router() {
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
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router />
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
