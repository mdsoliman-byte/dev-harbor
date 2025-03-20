
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { X, Home, Briefcase, Code, FileText, User, Mail, ShoppingBag } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface NavItemProps {
  to: string;
  icon: React.ElementType;
  label: string;
  isActive: boolean;
  onClick?: () => void;
}

const NavItem = ({ to, icon: Icon, label, isActive, onClick }: NavItemProps) => (
  <Link
    to={to}
    className={cn(
      "flex items-center gap-3 px-3 py-3 rounded-md transition-all duration-300 group",
      isActive 
        ? "bg-primary/10 text-primary font-medium" 
        : "text-muted-foreground hover:bg-secondary hover:text-foreground"
    )}
    onClick={onClick}
  >
    <div className="flex items-center justify-center w-8 h-8">
      <Icon className={cn(
        "h-[18px] w-[18px] transition-transform duration-300",
        isActive ? "text-primary" : "text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground"
      )} />
    </div>
    <span className="text-sm font-medium transition-transform duration-300 group-hover:translate-x-0.5">{label}</span>
  </Link>
);

interface SidebarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const closeSidebar = () => {
    setIsOpen(false);
  };
  
  const navItems = [
    { to: '/', icon: Home, label: 'Home' },
    { to: '/projects', icon: Briefcase, label: 'Projects' },
    { to: '/skills', icon: Code, label: 'Skills' },
    { to: '/blog', icon: FileText, label: 'Blog' },
    { to: '/shop', icon: ShoppingBag, label: 'Shop' },
    { to: '/about', icon: User, label: 'About' },
    { to: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <>
      {/* Sidebar overlay - show on all devices when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 transition-opacity duration-300 animate-fade-in"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar - same component for all devices */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border shadow-lg transform transition-transform duration-500 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}>
        <div className="flex flex-col h-full">
          {/* Close button for mobile - only visible on mobile */}
          <button 
            onClick={closeSidebar}
            className="absolute top-4 right-4 p-2 rounded-full bg-secondary md:hidden transition-transform hover:rotate-90 duration-300 hover:bg-secondary/80"
          >
            <X className="h-4 w-4" />
          </button>

          <div className="p-6 border-b border-border">
            <h1 className="text-xl font-semibold transition-all duration-300 hover:text-primary">John Doe</h1>
            <p className="text-sm text-muted-foreground mt-1 transition-all duration-300">Frontend Developer</p>
          </div>
          
          <nav className="px-3 flex-1 space-y-1 overflow-y-auto py-4">
            {navItems.map((item, index) => (
              <div key={item.to} className="animate-fade-delayed" style={{ animationDelay: `${index * 50}ms` }}>
                <NavItem
                  to={item.to}
                  icon={item.icon}
                  label={item.label}
                  isActive={location.pathname === item.to}
                  onClick={isMobile ? closeSidebar : undefined}
                />
              </div>
            ))}
          </nav>
          
          <div className="p-6 border-t border-border transition-all duration-300">
            <p className="text-xs text-muted-foreground hover:text-foreground transition-colors duration-300">© 2023 John Doe</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
