
import React from 'react';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Save, Plus, Trash } from 'lucide-react';
import { Skill, fetchSkillsData, updateSkillsData } from '@/services/api';
import { useToast } from '@/components/ui/use-toast';

const AdminSkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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

  useEffect(() => {
    const loadSkills = async () => {
      try {
        const data = await fetchSkillsData();
        setSkills(data);
        setError(null);
      } catch (err) {
        setError('Failed to load skills data');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadSkills();
  }, []);

  const handleUpdateSkill = (index: number, field: string, value: any) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  const handleAddSkill = () => {
    const newSkill: Skill = {
      id: skills.length > 0 ? Math.max(...skills.map(skill => skill.id)) + 1 : 1,
      title: 'New Skill',
      description: 'Skill description',
      icon: 'Award',
      category: 'Other'
    };
    setSkills([...skills, newSkill]);
  };

  const handleRemoveSkill = (index: number) => {
    const updatedSkills = skills.filter((_, i) => i !== index);
    setSkills(updatedSkills);
  };

  const handleSave = async () => {
    try {
      setIsLoading(true);
      await updateSkillsData(skills);
      setIsEditing(false);
      toast({
        title: "Success",
        description: "Skills have been updated successfully.",
        variant: "default",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to update skills. Please try again.",
        variant: "destructive",
      });
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading && skills.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage Skills</h1>
        
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit Skills
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => setIsEditing(false)}>
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

      <Card>
        <CardHeader>
          <CardTitle>Skills & Specializations</CardTitle>
          <CardDescription>Manage the skills displayed on your website.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {skills.map((skill, index) => (
              <div 
                key={skill.id} 
                className="p-4 border rounded-lg relative"
              >
                {isEditing && (
                  <Button
                    type="button"
                    variant="outline"
                    size="icon"
                    className="absolute top-2 right-2"
                    onClick={() => handleRemoveSkill(index)}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                )}
                
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input 
                      value={skill.title} 
                      onChange={(e) => handleUpdateSkill(index, 'title', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Description</label>
                    <Textarea 
                      value={skill.description} 
                      onChange={(e) => handleUpdateSkill(index, 'description', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Icon</label>
                      <Select
                        disabled={!isEditing}
                        value={skill.icon}
                        onValueChange={(value) => handleUpdateSkill(index, 'icon', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select an icon" />
                        </SelectTrigger>
                        <SelectContent>
                          {iconOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Category</label>
                      <Select
                        disabled={!isEditing}
                        value={skill.category}
                        onValueChange={(value) => handleUpdateSkill(index, 'category', value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                          {categoryOptions.map(option => (
                            <SelectItem key={option.value} value={option.value}>
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            {isEditing && (
              <Button 
                type="button" 
                variant="outline" 
                onClick={handleAddSkill}
                className="w-full"
              >
                <Plus className="h-4 w-4 mr-2" /> Add Skill
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSkillsPage;
