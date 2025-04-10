
import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Pencil, Save } from 'lucide-react';
import { ContactData, fetchContactData, updateContactData } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

const AdminContactPage = () => {
  const [contactData, setContactData] = useState<ContactData | null>(null);
  const [formData, setFormData] = useState<ContactData | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    const loadContactData = async () => {
      try {
        const data = await fetchContactData();
        setContactData(data);
        setFormData(data);
        setError(null);
      } catch (err) {
        setError('Failed to load contact data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadContactData();
  }, []);

  const handleInputChange = (field: string, value: string) => {
    if (!formData) return;
    setFormData({ ...formData, [field]: value });
  };

  const handleSocialLinkChange = (field: string, value: string) => {
    if (!formData) return;
    setFormData({
      ...formData,
      social_links: {
        ...formData.social_links,
        [field]: value
      }
    });
  };

  const handleFormSettingChange = (field: string, value: string) => {
    if (!formData) return;
    setFormData({
      ...formData,
      form_settings: {
        ...formData.form_settings,
        [field]: value
      }
    });
  };

  const handleSave = async () => {
    if (!formData) return;
    
    try {
      setIsLoading(true);
      const updatedData = await updateContactData(formData);
      setContactData(updatedData);
      setFormData(updatedData);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Contact data has been updated successfully.",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update contact data. Please try again.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && !formData) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (error || !formData) {
    return <div className="p-4 text-red-500">{error || 'No data available.'}</div>;
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Contact Page</h1>
        
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => {
              setFormData(contactData);
              setIsEditing(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSave} disabled={isLoading}>
              {isLoading ? (
                <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
            <CardDescription>Update your contact page information.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Title</label>
              <Input 
                value={formData.title} 
                onChange={(e) => handleInputChange('title', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Description</label>
              <Textarea 
                value={formData.description} 
                onChange={(e) => handleInputChange('description', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                value={formData.email} 
                onChange={(e) => handleInputChange('email', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Phone</label>
              <Input 
                value={formData.phone} 
                onChange={(e) => handleInputChange('phone', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Address</label>
              <Textarea 
                value={formData.address} 
                onChange={(e) => handleInputChange('address', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
            <CardDescription>Update your social media links.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Twitter</label>
              <Input 
                value={formData.social_links.twitter} 
                onChange={(e) => handleSocialLinkChange('twitter', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Facebook</label>
              <Input 
                value={formData.social_links.facebook} 
                onChange={(e) => handleSocialLinkChange('facebook', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">LinkedIn</label>
              <Input 
                value={formData.social_links.linkedin} 
                onChange={(e) => handleSocialLinkChange('linkedin', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Instagram</label>
              <Input 
                value={formData.social_links.instagram} 
                onChange={(e) => handleSocialLinkChange('instagram', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Form Settings</CardTitle>
            <CardDescription>Configure your contact form settings.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Submit Button Text</label>
              <Input 
                value={formData.form_settings.submit_button_text} 
                onChange={(e) => handleFormSettingChange('submit_button_text', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Success Message</label>
              <Textarea 
                value={formData.form_settings.success_message} 
                onChange={(e) => handleFormSettingChange('success_message', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Error Message</label>
              <Textarea 
                value={formData.form_settings.error_message} 
                onChange={(e) => handleFormSettingChange('error_message', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminContactPage;
