
import React from 'react';
import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Save } from 'lucide-react';
import { Skill, fetchSkillsData, updateSkillsData } from '@/services/api/skills';
import { useToast } from '@/components/ui/use-toast';
import SkillList from '@/components/admin/skills/SkillList';

const AdminSkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

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

      <SkillList
        skills={skills}
        isEditing={isEditing}
        onUpdateSkill={handleUpdateSkill}
        onRemoveSkill={handleRemoveSkill}
        onAddSkill={handleAddSkill}
      />
    </div>
  );
};

export default AdminSkillsPage;
