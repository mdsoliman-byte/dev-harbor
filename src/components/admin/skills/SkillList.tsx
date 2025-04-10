
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { Skill } from '@/services/api/skills';
import SkillForm from './SkillForm';

interface SkillListProps {
  skills: Skill[];
  isEditing: boolean;
  onUpdateSkill: (index: number, field: string, value: any) => void;
  onRemoveSkill: (index: number) => void;
  onAddSkill: () => void;
}

const SkillList: React.FC<SkillListProps> = ({
  skills,
  isEditing,
  onUpdateSkill,
  onRemoveSkill,
  onAddSkill
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Skills & Specializations</CardTitle>
        <CardDescription>Manage the skills displayed on your website.</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {skills.map((skill, index) => (
            <SkillForm
              key={skill.id}
              skill={skill}
              index={index}
              isEditing={isEditing}
              onUpdate={onUpdateSkill}
              onRemove={onRemoveSkill}
            />
          ))}
          
          {isEditing && (
            <Button 
              type="button" 
              variant="outline" 
              onClick={onAddSkill}
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

export default SkillList;
