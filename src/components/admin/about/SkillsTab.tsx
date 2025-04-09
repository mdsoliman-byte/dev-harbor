
import React from 'react';
import { AboutData } from '@/types/about';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, Trash } from 'lucide-react';
import { motion } from 'framer-motion';
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";

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
  // Available icon options
  const iconOptions = [
    { value: 'Terminal', label: 'Terminal' },
    { value: 'Code', label: 'Code' },
    { value: 'BarChart', label: 'Bar Chart' },
    { value: 'Database', label: 'Database' },
    { value: 'PenTool', label: 'Pen Tool' },
    { value: 'Smartphone', label: 'Smartphone' },
    { value: 'Award', label: 'Award' }
  ];

  // Available category options
  const categoryOptions = [
    { value: 'Development', label: 'Development' },
    { value: 'Data', label: 'Data' },
    { value: 'Design', label: 'Design' },
    { value: 'Infrastructure', label: 'Infrastructure' },
    { value: 'Business', label: 'Business' },
    { value: 'Other', label: 'Other' }
  ];

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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Icon</label>
                    <Select
                      disabled={!isEditing}
                      value={skill.icon || ''}
                      onValueChange={(value) => updateSkill(index, 'icon', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select an icon" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Icons</SelectLabel>
                          {iconOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Category</label>
                    <Select
                      disabled={!isEditing}
                      value={skill.category || ''}
                      onValueChange={(value) => updateSkill(index, 'category', value)}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Categories</SelectLabel>
                          {categoryOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
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
