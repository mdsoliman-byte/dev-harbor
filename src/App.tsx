
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import HomePage from "./pages/HomePage";
import ProjectsPage from "./pages/ProjectsPage";
import ProjectDetailPage from "./pages/ProjectDetailPage";
import SkillsPage from "./pages/SkillsPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import ShopPage from "./pages/ShopPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import NotFound from "./pages/NotFound";
import { AnimatePresence } from "framer-motion";
import { ThemeProvider } from "./components/ThemeProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider defaultTheme="system">
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AnimatePresence mode="wait">
            <Routes>
              <Route path="/" element={<Layout><HomePage /></Layout>} />
              <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
              <Route path="/projects/:slug" element={<Layout><ProjectDetailPage /></Layout>} />
              <Route path="/skills" element={<Layout><SkillsPage /></Layout>} />
              <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
              <Route path="/blog/:id" element={<Layout><BlogDetailPage /></Layout>} />
              <Route path="/shop" element={<Layout><ShopPage /></Layout>} />
              <Route path="/about" element={<Layout><AboutPage /></Layout>} />
              <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
