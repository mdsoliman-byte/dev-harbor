
import React from 'react';
import { AboutData } from '@/types/about';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash } from 'lucide-react';
import { motion } from 'framer-motion';

interface EducationTabProps {
  formData: AboutData;
  isEditing: boolean;
  updateEducation: (index: number, field: string, value: any) => void;
  removeEducation: (index: number) => void;
  addEducation: () => void;
}

const EducationTab: React.FC<EducationTabProps> = ({ 
  formData, 
  isEditing, 
  updateEducation, 
  removeEducation, 
  addEducation 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Education</CardTitle>
        <CardDescription>Manage your educational background.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {formData.education.map((edu, index) => (
            <motion.div 
              key={edu.id} 
              className="p-4 border rounded-lg relative"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {isEditing && (
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => removeEducation(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Degree</label>
                  <Input 
                    value={edu.degree} 
                    onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Institution</label>
                  <Input 
                    value={edu.institution} 
                    onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Period</label>
                  <Input 
                    value={edu.period} 
                    onChange={(e) => updateEducation(index, 'period', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., 2015 - 2019"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={edu.description} 
                    onChange={(e) => updateEducation(index, 'description', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
              </div>
            </motion.div>
          ))}
          
          {isEditing && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={addEducation}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Education
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EducationTab;
