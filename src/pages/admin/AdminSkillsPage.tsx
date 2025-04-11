
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Pencil, Save, Plus, Trash2, Filter, 
  X, Search, ArrowUpDown, Loader2 
} from 'lucide-react';
import { 
  Skill, fetchSkillsData, updateSkillsData, 
  createSkill, updateSkill, deleteSkill, 
  fetchSkillCategories 
} from '@/services/api/skills';
import { useToast } from '@/components/ui/use-toast';
import SkillList from '@/components/admin/skills/SkillList';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Table, TableHeader, TableRow, TableHead, TableBody, TableCell } from '@/components/ui/table';
import { 
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue 
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import SkillForm from '@/components/admin/skills/SkillForm';

const AdminSkillsPage = () => {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState('all');
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

  // Update skill
  const handleUpdateSkill = (index: number, field: string, value: any) => {
    const updatedSkills = [...skills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setSkills(updatedSkills);
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
  const handleSave = async (skill: Skill) => {
    try {
      setIsLoading(true);
      await updateSkill(skill.id, skill);
      setSkills(skills.map(s => s.id === skill.id ? skill : s));
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

  // Handle new skill field change
  const handleNewSkillChange = (field: string, value: any) => {
    setNewSkill({ ...newSkill, [field]: value });
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

      {/* Filters and Search */}
      <Card className="mb-6">
        <CardContent className="pt-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search skills..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="w-full md:w-[200px]">
              <Select
                value={selectedCategory}
                onValueChange={setSelectedCategory}
              >
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            {(searchTerm || selectedCategory) && (
              <Button 
                variant="outline" 
                onClick={() => {
                  setSearchTerm('');
                  setSelectedCategory('');
                }}
              >
                <X className="mr-2 h-4 w-4" /> Clear Filters
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create New Skill */}
      {isCreating && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Create New Skill</CardTitle>
            <CardDescription>Add a new skill to your portfolio</CardDescription>
          </CardHeader>
          <CardContent>
            <SkillForm 
              skill={newSkill as Skill} 
              onUpdate={(_, field, value) => handleNewSkillChange(field, value)}
              isEditing={true}
              onRemove={() => {}}
              index={-1}
            />
            <div className="flex justify-end gap-2 mt-4">
              <Button variant="outline" onClick={handleCancelCreate}>
                Cancel
              </Button>
              <Button onClick={handleAddSkill} disabled={isLoading}>
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
      )}

      {/* Skills List */}
      <Card>
        <CardHeader>
          <CardTitle>Skills List</CardTitle>
          <CardDescription>
            {filteredSkills.length} skills found
          </CardDescription>
        </CardHeader>
        <CardContent>
          {filteredSkills.length === 0 ? (
            <div className="text-center py-10">
              <h3 className="font-medium text-lg mb-2">No skills found</h3>
              <p className="text-muted-foreground">
                {searchTerm || selectedCategory ? 
                  "Try clearing your filters or search term" : 
                  "Get started by adding your first skill"}
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredSkills.map((skill, index) => (
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
                        onClick={() => {
                          // Toggle editing for this skill
                          const updatedSkills = [...skills];
                          updatedSkills[index] = { 
                            ...updatedSkills[index], 
                            isEditing: !updatedSkills[index].isEditing 
                          };
                          setSkills(updatedSkills);
                        }}
                      >
                        <Pencil className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                      <Button 
                        size="sm" 
                        variant="destructive"
                        onClick={() => handleRemoveSkill(skill.id)}
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
                        onUpdate={handleUpdateSkill} 
                        onRemove={() => {}}
                      />
                      <div className="flex justify-end gap-2 mt-4">
                        <Button 
                          variant="outline" 
                          onClick={() => {
                            const updatedSkills = [...skills];
                            updatedSkills[index] = { 
                              ...updatedSkills[index], 
                              isEditing: false 
                            };
                            setSkills(updatedSkills);
                          }}
                        >
                          Cancel
                        </Button>
                        <Button 
                          onClick={() => {
                            handleSave(skill);
                            const updatedSkills = [...skills];
                            updatedSkills[index] = { 
                              ...updatedSkills[index], 
                              isEditing: false 
                            };
                            setSkills(updatedSkills);
                          }}
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
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AdminSkillsPage;
