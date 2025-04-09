
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAboutData, updateAboutData } from '@/services/api/about';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { Pencil, Save } from 'lucide-react';
import { AboutData } from '@/types/about';

// Import tab components
import BasicInfoTab from '@/components/admin/about/BasicInfoTab';
import ExperienceTab from '@/components/admin/about/ExperienceTab';
import EducationTab from '@/components/admin/about/EducationTab';
import SkillsTab from '@/components/admin/about/SkillsTab';
import ContactSocialTab from '@/components/admin/about/ContactSocialTab';

const AdminAboutPage = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: aboutData, isLoading, error } = useQuery<AboutData>({
    queryKey: ['aboutData'],
    queryFn: fetchAboutData
  });
  
  const [formData, setFormData] = useState<AboutData | null>(null);
  
  // Update form data when aboutData is loaded
  React.useEffect(() => {
    if (aboutData) {
      setFormData(aboutData);
    }
  }, [aboutData]);
  
  const updateMutation = useMutation({
    mutationFn: updateAboutData,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['aboutData'] });
      setIsEditing(false);
      toast({
        title: "Success",
        description: "About data updated successfully",
        variant: "default",
      });
    },
    onError: (error) => {
      console.error('Error updating about data:', error);
      toast({
        title: "Error",
        description: "Failed to update about data",
        variant: "destructive",
      });
    }
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData) {
      updateMutation.mutate(formData);
    }
  };
  
  const updateField = (field: string, value: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [field]: value
      };
    });
  };
  
  const updateNestedField = (parent: string, field: string, value: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        [parent]: {
          ...prev[parent as keyof AboutData],
          [field]: value
        }
      };
    });
  };
  
  const addExperience = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        experience: [
          ...prev.experience,
          {
            id: prev.experience.length + 1,
            position: "",
            company: "",
            period: "",
            description: [""]
          }
        ]
      };
    });
  };
  
  const updateExperience = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        experience: prev.experience.map((exp, i) => 
          i === index ? { ...exp, [field]: value } : exp
        )
      };
    });
  };
  
  const removeExperience = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        experience: prev.experience.filter((_, i) => i !== index)
      };
    });
  };
  
  const addEducation = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        education: [
          ...prev.education,
          {
            id: prev.education.length + 1,
            degree: "",
            institution: "",
            period: "",
            description: ""
          }
        ]
      };
    });
  };
  
  const updateEducation = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        education: prev.education.map((edu, i) => 
          i === index ? { ...edu, [field]: value } : edu
        )
      };
    });
  };
  
  const removeEducation = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        education: prev.education.filter((_, i) => i !== index)
      };
    });
  };
  
  const addSkill = () => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        skills: [
          ...prev.skills,
          {
            id: prev.skills.length + 1,
            title: "",
            description: ""
          }
        ]
      };
    });
  };
  
  const updateSkill = (index: number, field: string, value: any) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        skills: prev.skills.map((skill, i) => 
          i === index ? { ...skill, [field]: value } : skill
        )
      };
    });
  };
  
  const removeSkill = (index: number) => {
    setFormData((prev) => {
      if (!prev) return prev;
      return {
        ...prev,
        skills: prev.skills.filter((_, i) => i !== index)
      };
    });
  };
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">Error loading about data. Please try again.</div>;
  }

  if (!formData) {
    return <div className="p-4 text-red-500">No data available.</div>;
  }
  
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Manage About Page</h1>
        {!isEditing ? (
          <Button onClick={() => setIsEditing(true)}>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
        ) : (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={() => {
              setFormData(aboutData || null);
              setIsEditing(false);
            }}>
              Cancel
            </Button>
            <Button onClick={handleSubmit} disabled={updateMutation.isPending}>
              {updateMutation.isPending ? (
                <div className="animate-spin mr-2 h-4 w-4 border-t-2 border-b-2 border-current rounded-full" />
              ) : (
                <Save className="mr-2 h-4 w-4" />
              )}
              Save Changes
            </Button>
          </div>
        )}
      </div>
      
      <form onSubmit={handleSubmit}>
        <Tabs defaultValue="basic">
          <TabsList className="mb-6">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="experience">Experience</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="contact">Contact & Social</TabsTrigger>
          </TabsList>
          
          <TabsContent value="basic">
            <BasicInfoTab 
              formData={formData}
              isEditing={isEditing}
              updateField={updateField}
            />
          </TabsContent>
          
          <TabsContent value="experience">
            <ExperienceTab 
              formData={formData}
              isEditing={isEditing}
              updateExperience={updateExperience}
              removeExperience={removeExperience}
              addExperience={addExperience}
            />
          </TabsContent>
          
          <TabsContent value="education">
            <EducationTab 
              formData={formData}
              isEditing={isEditing}
              updateEducation={updateEducation}
              removeEducation={removeEducation}
              addEducation={addEducation}
            />
          </TabsContent>
          
          <TabsContent value="skills">
            <SkillsTab 
              formData={formData}
              isEditing={isEditing}
              updateSkill={updateSkill}
              removeSkill={removeSkill}
              addSkill={addSkill}
            />
          </TabsContent>
          
          <TabsContent value="contact">
            <ContactSocialTab 
              formData={formData}
              isEditing={isEditing}
              updateNestedField={updateNestedField}
            />
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default AdminAboutPage;
