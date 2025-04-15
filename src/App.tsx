import React from "react"; 
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
import { ShopProvider } from "./contexts/ShopContext";
import { TranslationProvider } from "./components/header/LanguageTranslator";
import { setConfig } from './firebase';
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCk2LhDHBEl2TK2Xru54II_RTE8TSoMz0M",
  authDomain: "portfolio-15aa6.firebaseapp.com",
  projectId: "portfolio-15aa6",
  storageBucket: "portfolio-15aa6.firebasestorage.app",
  messagingSenderId: "173560042696",
  appId: "1:173560042696:web:59523f57fb56d06e2801fd",
  measurementId: "G-PPGN5G6WSQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

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
import AdminShopPage from "./pages/admin/AdminShopPage";

// Create a new QueryClient instance
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

import { useEffect } from 'react';

const App = () => {
  useEffect(() => {
    const storeAdminCredentials = async () => {
      try {
        await setConfig({
          email: 'admin@example.com',
          password: 'password',
        });
        console.log('Admin credentials stored in Firebase');
      } catch (error) {
        console.error('Error storing admin credentials in Firebase:', error);
      }
    };

    storeAdminCredentials();
  }, []);

  return (
    <React.StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider defaultTheme="system">
          <TooltipProvider>
            <TranslationProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <AnimatePresence mode="wait">
                  <ShopProvider>
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
                      
                      <Route path="/auth/login" element={<AdminLoginPage />} />
                      <Route element={<PrivateRoute />}>
                        <Route path="/admin/dashboard" element={<AdminLayout><AdminDashboardPage /></AdminLayout>} />
                        <Route path="/admin/blog" element={<AdminLayout><AdminBlogPage /></AdminLayout>} />
                        <Route path="/admin/projects" element={<AdminLayout><AdminProjectsPage /></AdminLayout>} />
                        <Route path="/admin/home" element={<AdminLayout><AdminHomePage /></AdminLayout>} />
                        <Route path="/admin/about" element={<AdminLayout><AdminAboutPage /></AdminLayout>} />
                        <Route path="/admin/skills" element={<AdminLayout><AdminSkillsPage /></AdminLayout>} />
                        <Route path="/admin/contact" element={<AdminLayout><AdminContactPage /></AdminLayout>} />
                        <Route path="/admin/shop" element={<AdminLayout><AdminShopPage /></AdminLayout>} />
                        <Route path="/admin/settings" element={<AdminLayout></AdminLayout>} />
                    </Route>
                    
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </ShopProvider>
              </AnimatePresence>
            </BrowserRouter>
          </TranslationProvider>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  </React.StrictMode>
  );
}

export default App;
