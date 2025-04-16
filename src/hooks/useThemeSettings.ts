
import { useState, useEffect } from 'react';
import { ThemeSettings, fetchThemeSettings, updateThemeSettings } from '@/services/api/shop';
import { useToast } from '@/hooks/use-toast';

export const useThemeSettings = () => {
  const [themeSettings, setThemeSettings] = useState<ThemeSettings | null>(null);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const fetchSettings = async () => {
    setLoading(true);
    try {
      const data = await fetchThemeSettings();
      setThemeSettings(data);
    } catch (error) {
      console.error('Error fetching theme settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch theme settings',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const saveThemeSettings = async (settings: Partial<ThemeSettings>) => {
    setLoading(true);
    try {
      const updatedSettings = await updateThemeSettings(settings);
      setThemeSettings(updatedSettings);
      toast({
        title: 'Success',
        description: 'Theme settings updated successfully',
      });
      return true;
    } catch (error) {
      console.error('Error updating theme settings:', error);
      toast({
        title: 'Error',
        description: 'Failed to update theme settings',
        variant: 'destructive',
      });
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSettings();
  }, []);

  return {
    themeSettings,
    loading,
    saveThemeSettings,
    fetchSettings
  };
};
