
import { PropsWithChildren, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import { ThemeToggle } from './ThemeProvider';

const Layout = ({ children }: PropsWithChildren) => {
  const location = useLocation();
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return (
    <div className="min-h-screen relative flex flex-col md:flex-row">
      {/* Background image with overlay */}
      <div className="fixed inset-0 z-[-1]">
        <img 
          src="/lovable-uploads/dbb9c6f1-19d1-4aee-affb-58277850d8f7.png" 
          alt="Background" 
          className="w-full h-full object-cover opacity-30 dark:opacity-20"
        />
        <div className="absolute inset-0 bg-background/60 dark:bg-background/80 backdrop-blur-sm"></div>
      </div>
      
      <Sidebar />
      <main className="flex-1 md:ml-64 min-h-screen">
        <div className="animate-fade-in">
          {/* Theme toggle positioned in the top-right corner */}
          <div className="fixed top-4 right-4 z-50">
            <ThemeToggle />
          </div>
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;
