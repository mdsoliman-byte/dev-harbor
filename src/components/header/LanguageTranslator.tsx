
import React, { useState, useEffect, createContext, useContext } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { toast } from '@/hooks/use-toast';

type Language = {
  code: string;
  name: string;
};

// Two languages - English and Bangla
const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'বাংলা' } // Bangla
];

// Create a context to make translations available throughout the app
export const TranslationContext = React.createContext<{
  currentLanguage: string;
  translate: (key: string) => string;
  toggleLanguage: () => void;
}>({
  currentLanguage: 'en',
  translate: (key) => key,
  toggleLanguage: () => {}
});

// Dictionary of translations
const translations: Record<string, Record<string, string>> = {
  en: {
    // English translations (default)
    'nav.home': 'Home',
    'nav.projects': 'Projects',
    'nav.skills': 'Skills',
    'nav.blog': 'Blog',
    'nav.shop': 'Shop',
    'nav.about': 'About',
    'nav.contact': 'Contact',
    'nav.dashboard': 'Dashboard',
    'nav.settings': 'Settings',
    'lang.select': 'Select Language',
    'theme': 'Theme',
    'sidebar.toggle': 'Toggle sidebar',
    'settings': 'Settings'
  },
  bn: {
    // Bangla translations
    'nav.home': 'হোম',
    'nav.projects': 'প্রজেক্টস',
    'nav.skills': 'দক্ষতা',
    'nav.blog': 'ব্লগ',
    'nav.shop': 'দোকান',
    'nav.about': 'সম্পর্কে',
    'nav.contact': 'যোগাযোগ',
    'nav.dashboard': 'ড্যাশবোর্ড',
    'nav.settings': 'সেটিংস',
    'lang.select': 'ভাষা নির্বাচন করুন',
    'theme': 'থিম',
    'sidebar.toggle': 'সাইডবার টগল',
    'settings': 'সেটিংস'
  }
};

export const useTranslation = () => {
  return useContext(TranslationContext);
};

export const TranslationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('en');
  
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setCurrentLanguage(savedLanguage);
      document.documentElement.lang = savedLanguage;
      document.documentElement.dir = 'ltr'; // Both languages are left-to-right
    }
  }, []);

  const translate = (key: string): string => {
    if (!translations[currentLanguage]) {
      return key; // Fallback to key if language not found
    }
    
    return translations[currentLanguage][key] || key; // Fallback to key if translation not found
  };

  const toggleLanguage = () => {
    const newLanguage = currentLanguage === 'en' ? 'bn' : 'en';
    setCurrentLanguage(newLanguage);
    localStorage.setItem('selectedLanguage', newLanguage);
    document.documentElement.lang = newLanguage;
    
    // Force re-render of all components to apply new translations
    window.location.reload();
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, translate, toggleLanguage }}>
      {children}
    </TranslationContext.Provider>
  );
};

const LanguageTranslator = () => {
  const { currentLanguage, toggleLanguage } = useTranslation();
  const [isTranslating, setIsTranslating] = useState(false);

  const handleToggle = () => {
    setIsTranslating(true);
    setTimeout(() => {
      toggleLanguage();
    }, 300);
  };

  return (
    <div className="flex items-center gap-2 mr-2 px-2 py-1 rounded-full bg-background/50 border border-border">
      <span className="text-xs font-medium">{currentLanguage === 'en' ? 'EN' : 'BN'}</span>
      {isTranslating ? (
        <Loader2 className="h-4 w-4 animate-spin" />
      ) : (
        <Switch
          checked={currentLanguage === 'bn'}
          onCheckedChange={handleToggle}
          aria-label="Toggle language"
        />
      )}
    </div>
  );
};

export default LanguageTranslator;
