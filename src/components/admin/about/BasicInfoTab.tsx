
import React from 'react';
import { AboutData } from '@/types/about';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash } from 'lucide-react';

interface BasicInfoTabProps {
  formData: AboutData;
  isEditing: boolean;
  updateField: (field: string, value: any) => void;
}

const BasicInfoTab: React.FC<BasicInfoTabProps> = ({ formData, isEditing, updateField }) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Basic Information</CardTitle>
        <CardDescription>Update your personal information that appears on the about page.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input 
              value={formData.fullName || ''} 
              onChange={(e) => updateField('fullName', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Title / Position</label>
            <Input 
              value={formData.title || ''} 
              onChange={(e) => updateField('title', e.target.value)}
              disabled={!isEditing}
            />
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Bio</label>
            {formData.bio.map((paragraph, index) => (
              <div key={index} className="flex gap-2">
                <Textarea 
                  value={paragraph} 
                  onChange={(e) => {
                    const newBio = [...formData.bio];
                    newBio[index] = e.target.value;
                    updateField('bio', newBio);
                  }}
                  disabled={!isEditing}
                  className="min-h-[100px]"
                />
                {isEditing && (
                  <Button 
                    type="button" 
                    variant="outline" 
                    size="icon" 
                    onClick={() => {
                      const newBio = formData.bio.filter((_, i) => i !== index);
                      updateField('bio', newBio);
                    }}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
              </div>
            ))}
            {isEditing && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  updateField('bio', [...formData.bio, '']);
                }}
              >
                <Plus className="h-4 w-4 mr-2" /> Add Paragraph
              </Button>
            )}
          </div>
          
          <div className="space-y-2">
            <label className="text-sm font-medium">Profile Image URL</label>
            <Input 
              value={formData.profileImage || ''} 
              onChange={(e) => updateField('profileImage', e.target.value)}
              disabled={!isEditing}
            />
            {formData.profileImage && (
              <div className="mt-2">
                <img 
                  src={formData.profileImage} 
                  alt="Profile Preview" 
                  className="w-32 h-32 object-cover rounded-lg border"
                />
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BasicInfoTab;
