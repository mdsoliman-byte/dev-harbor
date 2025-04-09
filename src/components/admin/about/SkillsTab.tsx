
import React from 'react';
import { AboutData } from '@/types/about';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash } from 'lucide-react';
import { motion } from 'framer-motion';

interface SkillsTabProps {
  formData: AboutData;
  isEditing: boolean;
  updateSkill: (index: number, field: string, value: any) => void;
  removeSkill: (index: number) => void;
  addSkill: () => void;
}

const SkillsTab: React.FC<SkillsTabProps> = ({ 
  formData, 
  isEditing, 
  updateSkill, 
  removeSkill, 
  addSkill 
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills & Specializations</CardTitle>
        <CardDescription>Manage your skills and specializations.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {formData.skills.map((skill, index) => (
            <motion.div 
              key={skill.id} 
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
                  onClick={() => removeSkill(index)}
                >
                  <Trash className="h-4 w-4" />
                </Button>
              )}
              
              <div className="grid gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Title</label>
                  <Input 
                    value={skill.title} 
                    onChange={(e) => updateSkill(index, 'title', e.target.value)}
                    disabled={!isEditing}
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <Textarea 
                    value={skill.description} 
                    onChange={(e) => updateSkill(index, 'description', e.target.value)}
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
              onClick={addSkill}
              className="w-full"
            >
              <Plus className="h-4 w-4 mr-2" /> Add Skill
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillsTab;
