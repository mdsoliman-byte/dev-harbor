
import React from 'react';
import { AboutData } from '@/types/about';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

interface ContactSocialTabProps {
  formData: AboutData;
  isEditing: boolean;
  updateNestedField: (parent: string, field: string, value: any) => void;
}

const ContactSocialTab: React.FC<ContactSocialTabProps> = ({ 
  formData, 
  isEditing, 
  updateNestedField 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Contact & Social Links</CardTitle>
        <CardDescription>Update your contact information and social media links.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Contact Information</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Location</label>
              <Input 
                value={formData.contact?.location || ''} 
                onChange={(e) => updateNestedField('contact', 'location', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input 
                value={formData.contact?.email || ''} 
                onChange={(e) => updateNestedField('contact', 'email', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="availableForFreelance"
                checked={formData.contact?.availableForFreelance || false}
                onChange={(e) => updateNestedField('contact', 'availableForFreelance', e.target.checked)}
                disabled={!isEditing}
                className="rounded border-gray-300 text-primary focus:ring-primary"
              />
              <label htmlFor="availableForFreelance" className="text-sm font-medium">
                Available for Freelance
              </label>
            </div>
          </div>
          
          <div className="space-y-4">
            <h3 className="text-lg font-medium">Social Media Links</h3>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">GitHub</label>
              <Input 
                value={formData.socialLinks?.github || ''} 
                onChange={(e) => updateNestedField('socialLinks', 'github', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Twitter</label>
              <Input 
                value={formData.socialLinks?.twitter || ''} 
                onChange={(e) => updateNestedField('socialLinks', 'twitter', e.target.value)}
                disabled={!isEditing}
              />
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">LinkedIn</label>
              <Input 
                value={formData.socialLinks?.linkedin || ''} 
                onChange={(e) => updateNestedField('socialLinks', 'linkedin', e.target.value)}
                disabled={!isEditing}
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default ContactSocialTab;
