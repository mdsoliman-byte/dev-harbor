
import { PropsWithChildren, useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ThemeToggle } from './ThemeProvider';
import { Menu } from 'lucide-react';
import { Button } from './ui/button';

const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  // Close sidebar on mobile when route changes
  useEffect(() => {
    setSidebarOpen(false);
  }, [location.pathname]);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen relative flex flex-col">
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-[-1] transition-opacity duration-500">
        <img 
          src="/lovable-uploads/dbb9c6f1-19d1-4aee-affb-58277850d8f7.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30 dark:opacity-20 transition-opacity duration-500"
        />
        <div className="absolute inset-0 bg-background/60 dark:bg-background/80 backdrop-blur-sm transition-colors duration-500"></div>
      </div>
      
      {/* Main content */}
      <div className="flex flex-1 min-h-screen">
        {/* Sidebar component */}
        <Sidebar isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        
        <main className={`flex-1 transition-all duration-500 ease-in-out min-h-screen ${sidebarOpen ? 'md:ml-64' : ''}`}>
          <div className="animate-fade-in">
            {/* Theme toggle and sidebar toggle positioned in the top-right corner */}
            <div className="fixed top-4 right-4 z-50 flex items-center gap-2">
              <Button 
                variant="outline" 
                size="icon" 
                onClick={toggleSidebar}
                className="rounded-full glass-morphism relative overflow-hidden transition-transform hover:scale-105 active:scale-95 hover:shadow-md"
                aria-label="Toggle sidebar"
              >
                <Menu className="h-5 w-5 transition-transform duration-300 ease-in-out" />
                <span className="sr-only">Toggle sidebar</span>
              </Button>
              <ThemeToggle />
            </div>
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
