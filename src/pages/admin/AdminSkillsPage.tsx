
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Plus, Loader2 } from 'lucide-react';
import { 
  Skill, fetchSkillsData, updateSkill, deleteSkill, 
  createSkill, fetchSkillCategories 
} from '@/services/api/skills';
import { useToast } from '@/components/ui/use-toast';
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from '@/components/ui/card';
import SkillFilters from '@/components/admin/skills/SkillFilters';
import CreateSkillForm from '@/components/admin/skills/CreateSkillForm';
import SkillsListView from '@/components/admin/skills/SkillsListView';

const AdminSkillsPage: React.FC = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('');
  const [isCreating, setIsCreating] = useState(false);
  const [newSkill, setNewSkill] = useState<Omit<Skill, 'id'>>({
    title: '',
    description: '',
    icon: 'Code',
    category: 'Development'
  });
  const { toast } = useToast();

  // Load skills and categories data on component mount
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const [skillsData, categoriesData] = await Promise.all([
          fetchSkillsData(),
          fetchSkillCategories()
        ]);
        setSkills(skillsData);
        setCategories(categoriesData);
        setError(null);
      } catch (err) {
        setError('Failed to load skills data');
        console.error(err);
        toast({
          title: "Error",
          description: "Failed to load skills data. Please try again.",
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [toast]);

  // Toggle editing state for a skill
  const handleToggleEdit = (index: number) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { 
      ...updatedSkills[index], 
      isEditing: !updatedSkills[index].isEditing 
    };
    setSkills(updatedSkills);
  };

  // Update skill
  const handleUpdateSkill = (index: number, field: string, value: any) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
  };

  // Handle new skill field change
  const handleNewSkillChange = (field: string, value: any) => {
    setNewSkill({ ...newSkill, [field]: value });
  };

  // Add skill
  const handleAddSkill = async () => {
    try {
      if (!newSkill.title.trim()) {
        toast({
          title: "Validation Error",
          description: "Skill title is required",
          variant: "destructive",
        });
        return;
      }

      setIsLoading(true);
      const createdSkill = await createSkill(newSkill);
      setSkills([...skills, createdSkill]);
      setIsCreating(false);
      setNewSkill({
        title: '',
        description: '',
        icon: 'Code',
        category: 'Development'
      });
      toast({
        title: "Success",
        description: "Skill has been created successfully.",
        variant: "default",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to create skill. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Remove skill
  const handleRemoveSkill = async (id: number) => {
    try {
      setIsLoading(true);
      await deleteSkill(id);
      setSkills(skills.filter(skill => skill.id !== id));
      toast({
        title: "Success",
        description: "Skill has been deleted successfully.",
        variant: "default",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to delete skill. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Save skill changes
  const handleSaveSkill = async (skill: Skill, index: number) => {
    try {
      setIsLoading(true);
      await updateSkill(skill.id, skill);
      // Toggle off editing mode after saving
      const updatedSkills = [...skills];
      updatedSkills[index] = { 
        ...skill, 
        isEditing: false 
      };
      setSkills(updatedSkills);
      toast({
        title: "Success",
        description: "Skill has been updated successfully.",
        variant: "default",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "Failed to update skill. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  // Cancel skill creation
  const handleCancelCreate = () => {
    setIsCreating(false);
    setNewSkill({
      title: '',
      description: '',
      icon: 'Code',
      category: 'Development'
    });
  };

  // Filter skills based on search term and category
  const filteredSkills = skills.filter(skill => {
    const matchesSearch = searchTerm === '' || 
      skill.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === '' || skill.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  if (isLoading && skills.length === 0) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="p-4">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Manage Skills</h1>
          <p className="text-muted-foreground">Add, edit, or remove skills displayed on your website</p>
        </div>
        
        <div className="flex gap-2">
          {!isCreating && (
            <Button onClick={() => setIsCreating(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add New Skill
            </Button>
          )}
        </div>
      </div>

      {/* Filters */}
      <SkillFilters 
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
        categories={categories}
      />

      {/* Create New Skill Form */}
      <CreateSkillForm 
        isCreating={isCreating}
        isLoading={isLoading}
        newSkill={newSkill}
        onUpdate={handleNewSkillChange}
        onCancel={handleCancelCreate}
        onSubmit={handleAddSkill}
      />

      {/* Skills List */}
      <Card>
        <CardHeader>
          <CardTitle>Skills List</CardTitle>
          <CardDescription>
            {filteredSkills.length} skills found
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SkillsListView 
            skills={filteredSkills}
            onToggleEdit={handleToggleEdit}
            onUpdateSkill={handleUpdateSkill}
            onSaveSkill={handleSaveSkill}
            onRemoveSkill={handleRemoveSkill}
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSkillsPage;
