
import React from "react"; // Add explicit React import
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

// Admin imports
import PrivateRoute from "./utils/PrivateRoute";
import AdminLoginPage from "./pages/admin/AdminLoginPage";
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboardPage from "./pages/admin/AdminDashboardPage";
import AdminBlogPage from "./pages/admin/AdminBlogPage";
import AdminProjectsPage from "./pages/admin/AdminProjectsPage";
import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminAboutPage from "./pages/admin/AdminAboutPage";
import AdminSkillsPage from "./pages/admin/AdminSkillsPage";
import AdminContactPage from "./pages/admin/AdminContactPage";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

const App = () => (
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system">
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AnimatePresence mode="wait">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Layout><HomePage /></Layout>} />
                <Route path="/projects" element={<Layout><ProjectsPage /></Layout>} />
                <Route path="/projects/:slug" element={<Layout><ProjectDetailPage /></Layout>} />
                <Route path="/skills" element={<Layout><SkillsPage /></Layout>} />
                <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
                <Route path="/blog/:id" element={<Layout><BlogDetailPage /></Layout>} />
                <Route path="/shop" element={<Layout><ShopPage /></Layout>} />
                <Route path="/about" element={<Layout><AboutPage /></Layout>} />
                <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
                
                {/* Admin Routes */}
                <Route path="/auth/login" element={<AdminLoginPage />} />
                <Route element={<PrivateRoute />}>
                  <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboardPage /></AdminLayout>} />
                  <Route path="/admin/blog" element={<AdminLayout><AdminBlogPage /></AdminLayout>} />
                  <Route path="/admin/projects" element={<AdminLayout><AdminProjectsPage /></AdminLayout>} />
                  <Route path="/admin/home" element={<AdminLayout><AdminHomePage /></AdminLayout>} />
                  <Route path="/admin/about" element={<AdminLayout><AdminAboutPage /></AdminLayout>} />
                  <Route path="/admin/skills" element={<AdminLayout><AdminSkillsPage /></AdminLayout>} />
                  <Route path="/admin/contact" element={<AdminLayout><AdminContactPage /></AdminLayout>} />
                  {/* Add more admin routes as needed */}
                </Route>
                
                <Route path="*" element={<NotFound />} />
              </Routes>
            </AnimatePresence>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
);

export default App;
