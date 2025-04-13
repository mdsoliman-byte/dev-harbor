
import React, { useState, useEffect } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { toast } from '@/hooks/use-toast';
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group';

type Language = {
  code: string;
  name: string;
};

// Reduced to just English and Bangla
const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'bn', name: 'বাংলা' } // Bangla
];

// Create a context to make translations available throughout the app
export const TranslationContext = React.createContext<{
  currentLanguage: string;
  translate: (key: string) => string;
}>({
  currentLanguage: 'en',
  translate: (key) => key,
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
    'lang.select': 'Select Language',
    'weather': 'Weather',
    'theme': 'Theme',
    'sidebar.toggle': 'Toggle sidebar',
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
    'lang.select': 'ভাষা নির্বাচন করুন',
    'weather': 'আবহাওয়া',
    'theme': 'থিম',
    'sidebar.toggle': 'সাইডবার টগল',
  }
};

export const useTranslation = () => {
  return React.useContext(TranslationContext);
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

  const updateLanguage = (lang: string) => {
    setCurrentLanguage(lang);
    localStorage.setItem('selectedLanguage', lang);
    document.documentElement.lang = lang;
  };

  return (
    <TranslationContext.Provider value={{ currentLanguage, translate }}>
      {children}
    </TranslationContext.Provider>
  );
};

const LanguageTranslator = () => {
  const { currentLanguage, translate } = useTranslation();
  const [isTranslating, setIsTranslating] = useState(false);
  
  const handleLanguageChange = (value: string) => {
    if (!value || value === currentLanguage) return;
    setIsTranslating(true);
    
    // Small delay to show translation effect
    setTimeout(() => {
      localStorage.setItem('selectedLanguage', value);
      window.location.reload(); // Reload to apply translations everywhere
    }, 300);
  };

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button 
          variant="outline" 
          size="icon" 
          className="rounded-full glass-morphism relative overflow-hidden mr-2"
        >
          {isTranslating ? 
            <Loader2 className="h-4 w-4 animate-spin" /> : 
            <Globe className="h-4 w-4" />
          }
          <span className="sr-only">Change language</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48">
        <div className="space-y-2">
          <h3 className="font-medium text-center mb-3">{translate('lang.select')}</h3>
          
          <ToggleGroup 
            type="single" 
            value={currentLanguage}
            onValueChange={handleLanguageChange}
            className="justify-center w-full"
          >
            {languages.map((lang) => (
              <ToggleGroupItem 
                key={lang.code} 
                value={lang.code} 
                aria-label={lang.name}
                className="w-16 text-center"
              >
                {lang.code.toUpperCase()}
              </ToggleGroupItem>
            ))}
          </ToggleGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageTranslator;
