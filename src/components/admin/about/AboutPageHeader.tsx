
import React from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Save } from 'lucide-react';
import { AboutData } from '@/types/about';

interface AboutPageHeaderProps {
  isEditing: boolean;
  setIsEditing: (value: boolean) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isPending: boolean;
  aboutData: AboutData | null;
  setFormData: (data: AboutData | null) => void;
}

const AboutPageHeader: React.FC<AboutPageHeaderProps> = ({ 
  isEditing, 
  setIsEditing, 
  handleSubmit, 
  isPending,
  aboutData,
  setFormData
}) => {
  return (
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-2xl font-bold">Manage About Page</h1>
      {!isEditing ? (
        <Button onClick={() => setIsEditing(true)}>
          <Pencil className="mr-2 h-4 w-4" /> Edit
        </Button>
      ) : (
        <div className="flex space-x-2">
          <Button variant="outline" onClick={() => {
            setFormData(aboutData || null);
            setIsEditing(false);
          }}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={isPending}>
            {isPending ? (
              <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default AboutPageHeader;
