
import { PropsWithChildren, useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { LogOut, Menu, X } from 'lucide-react';
import { adminLogout, isAdminAuthenticated } from '@/services/api';
import { Button } from '@/components/ui/button';
import { ThemeToggle } from '@/components/ThemeProvider';

const AdminLayout = ({ children }: PropsWithChildren) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const navigate = useNavigate();

  // Redirect if not authenticated
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  const handleLogout = () => {
    adminLogout();
    navigate('/admin/login');
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside 
        className={`fixed inset-y-0 left-0 z-50 w-64 bg-background/90 backdrop-blur-md border-r border-border transform transition-transform duration-300 ease-in-out md:relative ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:w-20'
        }`}
      >
        {/* Sidebar Header */}
        <div className="flex items-center justify-between h-16 px-4 border-b border-border">
          <h1 className={`font-bold ${sidebarOpen ? 'text-lg' : 'hidden md:block text-center w-full'}`}>
            {sidebarOpen ? 'Admin Panel' : 'AP'}
          </h1>
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
        <div className="p-4">
          <nav className="space-y-2">
            <Button 
              variant="ghost" 
              className="w-full justify-start"
              onClick={() => navigate('/admin/dashboard')}
            >
              <span>Dashboard</span>
            </Button>
            
            {/* Add more navigation items here */}
          </nav>
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
        <main className="p-4 md:p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
