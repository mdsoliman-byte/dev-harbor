
import React from 'react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skill } from '@/services/api/skills';

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

interface SkillFormProps {
  skill: Skill;
  index: number;
  isEditing: boolean;
  onUpdate: (index: number, field: string, value: any) => void;
  onRemove: (index: number) => void;
}

const SkillForm: React.FC<SkillFormProps> = ({ 
  skill, 
  index, 
  isEditing, 
  onUpdate, 
  onRemove 
}) => {
  return (
    <div className="p-4 border rounded-lg relative">
      {isEditing && (
        <button
          type="button"
          className="absolute top-2 right-2 inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
          onClick={() => onRemove(index)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path></svg>
        </button>
      )}
      
      <div className="grid gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Title</label>
          <Input 
            value={skill.name} 
            onChange={(e) => onUpdate(index, 'title', e.target.value)}
            disabled={!isEditing}
          />
        </div>
        
        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Textarea 
            value={skill.description} 
            onChange={(e) => onUpdate(index, 'description', e.target.value)}
            disabled={!isEditing}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Icon</label>
            <Select
              disabled={!isEditing}
              value={skill.icon}
              onValueChange={(value) => onUpdate(index, 'icon', value)}
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
              onValueChange={(value) => onUpdate(index, 'category', value)}
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
  );
};

export default SkillForm;
