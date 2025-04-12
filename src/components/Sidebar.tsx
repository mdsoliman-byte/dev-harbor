
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
    <span className="text-sm font-medium">{label}</span>
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
    { to: '/about', icon: User, label: 'About' },
    { to: '/projects', icon: Briefcase, label: 'Projects' },
    { to: '/skills', icon: Code, label: 'Skills' },
    { to: '/shop', icon: ShoppingBag, label: 'Shop' },
    { to: '/blog', icon: FileText, label: 'Blog' },
    { to: '/contact', icon: Mail, label: 'Contact' },
  ];

  return (
    <>
      {/* Sidebar overlay - show on all devices when sidebar is open */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40"
          onClick={closeSidebar}
        />
      )}
      
      {/* Sidebar - same component for all devices */}
      <aside className={cn(
        "fixed inset-y-0 left-0 z-50 w-64 bg-background border-r border-border transform transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
      )}>
        <div className="flex flex-col h-full">
          {/* Close button for mobile - only visible on mobile */}
          

          <div className="p-6">
            <h1 className="text-xl font-semibold">MD SOLIMAN</h1>
            <p className="text-sm text-muted-foreground mt-1">Data Scientist</p>
          </div>
          
          <nav className="px-3 flex-1 space-y-1 overflow-y-auto">
            {navItems.map(item => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
                onClick={isMobile ? closeSidebar : undefined}
              />
            ))}
          </nav>
          
          <div className="p-6 border-t border-border">
            <p className="text-xs text-muted-foreground">© 2025 SOLIMAN</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
