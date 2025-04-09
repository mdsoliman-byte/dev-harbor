
import React from 'react';
import { AboutData } from '@/types/about';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash } from 'lucide-react';
import { motion } from 'framer-motion';

interface ExperienceTabProps {
  formData: AboutData;
  isEditing: boolean;
  updateExperience: (index: number, field: string, value: any) => void;
  removeExperience: (index: number) => void;
  addExperience: () => void;
}

const ExperienceTab: React.FC<ExperienceTabProps> = ({ 
  formData, 
  isEditing, 
  updateExperience, 
  removeExperience, 
  addExperience 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Work Experience</CardTitle>
        <CardDescription>Manage your work experience entries.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {formData.experience.map((exp, index) => (
            <motion.div 
              key={exp.id} 
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
                  onClick={() => removeExperience(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
              
              <div className="grid gap-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Position</label>
                    <Input 
                      value={exp.position} 
                      onChange={(e) => updateExperience(index, 'position', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Company</label>
                    <Input 
                      value={exp.company} 
                      onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Period</label>
                  <Input 
                    value={exp.period} 
                    onChange={(e) => updateExperience(index, 'period', e.target.value)}
                    disabled={!isEditing}
                    placeholder="e.g., Jan 2020 - Present"
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  {exp.description.map((item, itemIndex) => (
                    <div key={itemIndex} className="flex gap-2">
                      <Input 
                        value={item} 
                        onChange={(e) => {
                          const newDesc = [...exp.description];
                          newDesc[itemIndex] = e.target.value;
                          updateExperience(index, 'description', newDesc);
                        }}
                        disabled={!isEditing}
                      />
                      {isEditing && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon" 
                          onClick={() => {
                            const newDesc = exp.description.filter((_, i) => i !== itemIndex);
                            updateExperience(index, 'description', newDesc);
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
                        updateExperience(index, 'description', [...exp.description, '']);
                      }}
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Description Item
                    </Button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
          
          {isEditing && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={addExperience}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Experience
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ExperienceTab;
