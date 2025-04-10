
import React, { useState, useEffect } from 'react';
import { Globe, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Label } from '@/components/ui/label';
import { toast } from '@/hooks/use-toast';

type Language = {
  code: string;
  name: string;
};

const languages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'ru', name: 'Russian' },
  { code: 'zh', name: 'Chinese' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ar', name: 'Arabic' }
];

const LanguageTranslator = () => {
  const [selectedLanguage, setSelectedLanguage] = useState('en');
  const [isTranslating, setIsTranslating] = useState(false);
  
  // Load previously selected language
  useEffect(() => {
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setSelectedLanguage(savedLanguage);
      applyTranslation(savedLanguage);
    }
  }, []);

  const handleLanguageChange = (value: string) => {
    setSelectedLanguage(value);
    localStorage.setItem('selectedLanguage', value);
    applyTranslation(value);
  };

  const applyTranslation = async (langCode: string) => {
    setIsTranslating(true);
    
    try {
      // In a real application, this would call a translation API
      // For this demo, we'll simulate translation with a delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // For demo purposes, we're not actually translating the content
      // In a real app, you'd update the text content based on translations
      
      toast({
        title: "Language Changed",
        description: `Website language set to ${languages.find(l => l.code === langCode)?.name || langCode}`,
      });
      
    } catch (error) {
      console.error('Translation error:', error);
      toast({
        title: "Translation Error",
        description: "Failed to translate the content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsTranslating(false);
    }
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
      <PopoverContent className="w-56">
        <div className="space-y-2">
          <h3 className="font-medium text-center mb-3">Select Language</h3>
          
          <RadioGroup 
            value={selectedLanguage} 
            onValueChange={handleLanguageChange}
            className="space-y-1"
          >
            {languages.map((lang) => (
              <div key={lang.code} className="flex items-center space-x-2">
                <RadioGroupItem value={lang.code} id={`lang-${lang.code}`} />
                <Label htmlFor={`lang-${lang.code}`}>{lang.name}</Label>
              </div>
            ))}
          </RadioGroup>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default LanguageTranslator;
