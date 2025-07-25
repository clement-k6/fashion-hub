import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { LandlordLayout } from "./components/LandlordLayout";
import Dashboard from "./pages/landlord/Dashboard";
import Properties from "./pages/landlord/Properties";
import AddProperty from "./pages/landlord/AddProperty";
import Verification from "./pages/landlord/Verification";
import Settings from "./pages/landlord/Settings";
import Inbox from "./pages/landlord/Inbox";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          
          {/* Landlord Dashboard Routes */}
          <Route path="/landlord/dashboard" element={
            <LandlordLayout>
              <Dashboard />
            </LandlordLayout>
          } />
          <Route path="/landlord/properties" element={
            <LandlordLayout>
              <Properties />
            </LandlordLayout>
          } />
          <Route path="/landlord/properties/new" element={
            <LandlordLayout>
              <AddProperty />
            </LandlordLayout>
          } />
          <Route path="/landlord/verification" element={
            <LandlordLayout>
              <Verification />
            </LandlordLayout>
          } />
          <Route path="/landlord/settings" element={
            <LandlordLayout>
              <Settings />
            </LandlordLayout>
          } />
          <Route path="/landlord/inbox" element={
            <LandlordLayout>
              <Inbox />
            </LandlordLayout>
          } />
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
