
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import { Pencil, Save, Trash2 } from 'lucide-react';
import { Skill } from '@/services/api/skills';
import SkillForm from './SkillForm';

interface SkillsListViewProps {
  skills: Skill[];
  onToggleEdit: (index: number) => void;
  onUpdateSkill: (index: number, field: string, value: any) => void;
  onSaveSkill: (skill: Skill, index: number) => void;
  onRemoveSkill: (id: number) => void;
}

const SkillsListView: React.FC<SkillsListViewProps> = ({
  skills,
  onToggleEdit,
  onUpdateSkill,
  onSaveSkill,
  onRemoveSkill
}) => {
  if (skills.length === 0) {
    return (
      <div className="text-center py-10">
        <h3 className="font-medium text-lg mb-2">No skills found</h3>
        <p className="text-muted-foreground">
          Try clearing your filters or add your first skill
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <div key={skill.id} className="rounded-lg border p-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
            <div className="flex items-center gap-2 mb-2 md:mb-0">
              <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
                <span className="text-xs font-medium text-primary">{skill.id}</span>
              </div>
              <h3 className="font-medium text-lg">{skill.title}</h3>
            </div>
            <div className="flex gap-2">
              <Button 
                size="sm" 
                variant="outline"
                onClick={() => onToggleEdit(index)}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Edit
              </Button>
              <Button 
                size="sm" 
                variant="destructive"
                onClick={() => onRemoveSkill(skill.id)}
              >
                <Trash2 className="h-4 w-4 mr-1" />
                Delete
              </Button>
            </div>
          </div>
          
          {skill.isEditing ? (
            <div className="pt-4 border-t">
              <SkillForm 
                skill={skill} 
                index={index} 
                isEditing={true} 
                onUpdate={onUpdateSkill} 
                onRemove={() => {}}
              />
              <div className="flex justify-end gap-2 mt-4">
                <Button 
                  variant="outline" 
                  onClick={() => onToggleEdit(index)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={() => onSaveSkill(skill, index)}
                >
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Description</p>
                <p className="text-sm mt-1">{skill.description}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Category</p>
                <p className="text-sm mt-1">{skill.category}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-muted-foreground">Icon</p>
                <p className="text-sm mt-1">{skill.icon}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default SkillsListView;
