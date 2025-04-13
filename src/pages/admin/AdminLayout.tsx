import { PropsWithChildren, useEffect, useState } from 'react';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, FileText, User, Settings, ContactRound, Store, LogOut, Menu, X, Info, FolderKanban, BicepsFlexed } from 'lucide-react';
import { logout, isAdminAuthenticated } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeProvider';
import { motion } from 'framer-motion';
import { NavigationMenu, NavigationMenuList, NavigationMenuItem, NavigationMenuLink, navigationMenuTriggerStyle } from '@/components/ui/navigation-menu';
import WeatherWidget from '@/components/header/WeatherWidget';
import LanguageTranslator, { useTranslation } from '@/components/header/LanguageTranslator';

const AdminLayout = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const { translate } = useTranslation();

  // Redirect if not authenticated
  if (!isAdminAuthenticated()) {
    return <Navigate to="/auth/login" replace />;
  }

  const navItems = [
    {
      path: '/admin/dashboard',
      label: translate('nav.dashboard'),
      icon: LayoutDashboard
    },
    {
      path: '/admin/home',
      label: translate('nav.home'),
      icon: User
    },
    {
      path: '/admin/about',
      label: translate('nav.about'),
      icon: Info
    },
    {
      path: '/admin/projects',
      label: translate('nav.projects'),
      icon: FolderKanban
    },
    {
      path: '/admin/skills',
      label: translate('nav.skills'),
      icon: BicepsFlexed
    },
    {
      path: '/admin/Shop',
      label: translate('nav.shop'),
      icon: Store
    },
    {
      path: '/admin/blog',
      label: translate('nav.blog'),
      icon: FileText
    },
    {
      path: '/admin/Contact',
      label: translate('nav.contact'),
      icon: ContactRound
    },
    {
      path: '/admin/settings',
      label: translate('settings'),
      icon: Settings
    },
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex  md:flex-row ">
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background/90 backdrop-blur-md border-r border-border transform transition-transform duration-300 ease-in-out md:relative ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-10'
          }`}
      >
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
                  className={`w-full justify-start transition-all duration-200 ${!sidebarOpen ? 'justify-center px-2' : ''
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

      <div className={`flex-1 transition-all duration-300 ${sidebarOpen ? 'md:ml-2' : 'md:ml-0'}`}>
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
            <LanguageTranslator />
            <WeatherWidget />
            <ThemeToggle />
          </div>
        </header>

        <main className="p-4 md:p-6 overflow-auto max-h-[calc(100vh-4rem)]">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
