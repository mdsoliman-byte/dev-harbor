
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Loader2, Plus } from 'lucide-react';
import { Skill } from '@/services/api/skills';
import SkillForm from './SkillForm';

interface CreateSkillFormProps {
  isCreating: boolean;
  isLoading: boolean;
  newSkill: Omit<Skill, 'id'>;
  onUpdate: (field: string, value: any) => void;
  onCancel: () => void;
  onSubmit: () => void;
}

const CreateSkillForm: React.FC<CreateSkillFormProps> = ({
  isCreating,
  isLoading,
  newSkill,
  onUpdate,
  onCancel,
  onSubmit
}) => {
  if (!isCreating) return null;
  
  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>Create New Skill</CardTitle>
        <CardDescription>Add a new skill to your portfolio</CardDescription>
      </CardHeader>
      <CardContent>
        <SkillForm 
          skill={newSkill as Skill} 
          onUpdate={(_, field, value) => onUpdate(field, value)}
          isEditing={true}
          onRemove={() => {}}
          index={-1}
        />
        <div className="flex justify-end gap-2 mt-4">
          <Button variant="outline" onClick={onCancel}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={isLoading}>
            {isLoading ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Plus className="mr-2 h-4 w-4" />
            )}
            Create Skill
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreateSkillForm;
