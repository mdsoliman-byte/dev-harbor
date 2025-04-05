
import { PropsWithChildren, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, User, Settings, ShoppingBag, LogOut, Menu, X } from 'lucide-react';
import { logout, isAdminAuthenticated } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';

const AdminLayout = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!isAdminAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  const navItems = [
    { 
      path: '/admin/dashboard', 
      label: 'Dashboard', 
      icon: LayoutDashboard 
    },
    { 
      path: '/admin/blog', 
      label: 'Blog Posts', 
      icon: FileText 
    },
    { 
      path: '/admin/projects', 
      label: 'Projects', 
      icon: ShoppingBag 
    },
    { 
      path: '/admin/profile', 
      label: 'Profile', 
      icon: User 
    },
    { 
      path: '/admin/settings', 
      label: 'Settings', 
      icon: Settings 
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex  md:flex-row ">
      {/* Admin Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background/90 backdrop-blur-md border-r border-border transform transition-transform duration-300 ease-in-out md:relative ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-20'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <motion.h1 
            className={`font-bold ${sidebarOpen ? 'text-lg' : 'hidden md:block text-center w-full'}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {sidebarOpen ? 'Admin Panel' : 'AP'}
          </motion.h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            <X className="h-5 w-5" />
          </Button>
        </div>
        
        {/* Sidebar Content */}
        <div className="p-4 overflow-y-auto h-[calc(100vh-8rem)]">
          <nav className="space-y-2">
            {navItems.map((item) => (
              <motion.div 
                key={item.path}
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="mb-1"
              >
                <Button 
                  variant={location.pathname === item.path ? "default" : "ghost"}
                  className={`w-full justify-start transition-all duration-200 ${
                    !sidebarOpen ? 'justify-center px-2' : ''
                  }`}
                  onClick={() => navigate(item.path)}
                >
                  <item.icon className={`h-5 w-5 ${!sidebarOpen ? 'mr-0' : 'mr-2'}`} />
                  {sidebarOpen && <span>{item.label}</span>}
                </Button>
              </motion.div>
            ))}
          </nav>
        </div>
        
        {/* Portfolio Navigation */}
        <div className="p-4 border-t border-border">
          <div className={`text-sm font-medium mb-2 text-muted-foreground ${!sidebarOpen ? 'text-center' : ''}`}>
            {sidebarOpen ? 'Portfolio Navigation' : 'Nav'}
          </div>
          <NavigationMenu className={`max-w-full ${!sidebarOpen ? 'justify-center' : ''}`}>
            <NavigationMenuList className="flex flex-col space-y-1 space-x-0 w-full">
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle() + " w-full flex justify-start text-sm"} 
                  href="/"
                >
                  {sidebarOpen ? 'Home' : 'H'}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle() + " w-full flex justify-start text-sm"} 
                  href="/blog"
                >
                  {sidebarOpen ? 'Blog' : 'B'}
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink 
                  className={navigationMenuTriggerStyle() + " w-full flex justify-start text-sm"} 
                  href="/projects"
                >
                  {sidebarOpen ? 'Projects' : 'P'}
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        
        {/* Sidebar Footer */}
        <div className="absolute bottom-0 w-full p-4 border-t border-border">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" />
            <span className={sidebarOpen ? 'block' : 'hidden md:hidden'}>Logout</span>
          </Button>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}`}>
        {/* Header */}
        <header className="h-16 bg-background/80 backdrop-blur-md border-b border-border flex items-center justify-between px-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden md:flex"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden"
          >
            <Menu className="h-5 w-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <ThemeToggle />
          </div>
        </header>
        
        {/* Content */}
        <main className="p-4 md:p-6 overflow-auto max-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
