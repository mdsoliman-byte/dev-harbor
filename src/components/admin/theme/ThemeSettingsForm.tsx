
import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Switch } from '@/components/ui/switch';
import { ThemeSettings } from '@/services/api/shop';
import { useThemeSettings } from '@/hooks/useThemeSettings';

const themeSchema = z.object({
  primaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color'),
  secondaryColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color'),
  accentColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color'),
  fontFamily: z.string().min(1, 'Font family is required'),
  titleColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color'),
  textColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color'),
  backgroundColor: z.string().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/, 'Must be a valid hex color'),
  isDarkMode: z.boolean(),
});

type ThemeFormValues = z.infer<typeof themeSchema>;

const ThemeSettingsForm = () => {
  const { themeSettings, loading, saveThemeSettings } = useThemeSettings();
  
  const form = useForm<ThemeFormValues>({
    resolver: zodResolver(themeSchema),
    defaultValues: {
      primaryColor: '#4A4AE9',
      secondaryColor: '#22223B',
      accentColor: '#9A8C98',
      fontFamily: 'Inter',
      titleColor: '#22223B',
      textColor: '#333333',
      backgroundColor: '#F2E9E4',
      isDarkMode: false,
    },
  });
  
  React.useEffect(() => {
    if (themeSettings) {
      form.reset({
        primaryColor: themeSettings.primaryColor,
        secondaryColor: themeSettings.secondaryColor,
        accentColor: themeSettings.accentColor,
        fontFamily: themeSettings.fontFamily,
        titleColor: themeSettings.titleColor,
        textColor: themeSettings.textColor,
        backgroundColor: themeSettings.backgroundColor,
        isDarkMode: themeSettings.isDarkMode,
      });
    }
  }, [themeSettings, form]);

  const onSubmit = async (data: ThemeFormValues) => {
    await saveThemeSettings(data);
  };

  const colorPreview = (color: string) => (
    <div 
      className="w-8 h-8 rounded border border-gray-300" 
      style={{ backgroundColor: color }}
    />
  );

  return (
    <Card>
      <CardHeader>
        <CardTitle>Theme Settings</CardTitle>
        <CardDescription>Customize your website's appearance</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="primaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Primary Color</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input {...field} type="color" className="w-12 h-10 p-1" />
                        <Input {...field} className="flex-1" />
                        {colorPreview(field.value)}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="secondaryColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Secondary Color</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input {...field} type="color" className="w-12 h-10 p-1" />
                        <Input {...field} className="flex-1" />
                        {colorPreview(field.value)}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="accentColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Accent Color</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input {...field} type="color" className="w-12 h-10 p-1" />
                        <Input {...field} className="flex-1" />
                        {colorPreview(field.value)}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="fontFamily"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Font Family</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      Enter a valid font family name (e.g., Inter, Roboto)
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="titleColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title Color</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input {...field} type="color" className="w-12 h-10 p-1" />
                        <Input {...field} className="flex-1" />
                        {colorPreview(field.value)}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="textColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Text Color</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input {...field} type="color" className="w-12 h-10 p-1" />
                        <Input {...field} className="flex-1" />
                        {colorPreview(field.value)}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="backgroundColor"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Background Color</FormLabel>
                    <FormControl>
                      <div className="flex items-center space-x-2">
                        <Input {...field} type="color" className="w-12 h-10 p-1" />
                        <Input {...field} className="flex-1" />
                        {colorPreview(field.value)}
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="isDarkMode"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base">Dark Mode</FormLabel>
                      <FormDescription>
                        Enable dark mode as the default theme
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading && <div className="mr-2 h-4 w-4 animate-spin rounded-full border-2 border-primary border-t-transparent" />}
                Save Theme Settings
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default ThemeSettingsForm;
