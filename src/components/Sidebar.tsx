
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Menu, X, Home, Briefcase, Code, FileText, User, Mail, ShoppingBag } from 'lucide-react';
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
  isOpen?: boolean;
  setIsOpen?: (isOpen: boolean) => void;
}

const Sidebar = ({ isOpen = false, setIsOpen }: SidebarProps) => {
  const location = useLocation();
  const isMobile = useIsMobile();
  
  const toggleSidebar = () => {
    if (setIsOpen) {
      setIsOpen(!isOpen);
    }
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
      {/* Mobile hamburger menu - hidden since we now have the toggle in the Layout */}
      <button 
        onClick={toggleSidebar}
        className="fixed top-5 left-5 z-50 p-2 rounded-full bg-background shadow-md border border-border md:hidden flex items-center justify-center hidden"
        aria-label="Toggle menu"
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
      
      {/* Sidebar for desktop */}
      <div className="hidden md:flex h-screen w-64 fixed left-0 top-0 border-r border-border bg-background">
        <div className="flex flex-col w-full">
          <div className="p-6">
            <h1 className="text-xl font-semibold">John Doe</h1>
            <p className="text-sm text-muted-foreground mt-1">Frontend Developer</p>
          </div>
          
          <nav className="px-3 flex-1 space-y-1">
            {navItems.map(item => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
              />
            ))}
          </nav>
          
          <div className="p-6 border-t border-border">
            <p className="text-xs text-muted-foreground">© 2023 John Doe</p>
          </div>
        </div>
      </div>
      
      {/* Mobile sidebar overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Mobile sidebar */}
      <div className={cn(
        "fixed inset-y-0 left-0 w-64 z-50 bg-background border-r border-border transform transition-transform duration-300 ease-in-out md:hidden",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex flex-col h-full">
          <div className="p-6">
            <h1 className="text-xl font-semibold">John Doe</h1>
            <p className="text-sm text-muted-foreground mt-1">Frontend Developer</p>
          </div>
          
          <nav className="px-3 flex-1 space-y-1">
            {navItems.map(item => (
              <NavItem
                key={item.to}
                to={item.to}
                icon={item.icon}
                label={item.label}
                isActive={location.pathname === item.to}
                onClick={toggleSidebar}
              />
            ))}
          </nav>
          
          <div className="p-6 border-t border-border">
            <p className="text-xs text-muted-foreground">© 2023 John Doe</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
