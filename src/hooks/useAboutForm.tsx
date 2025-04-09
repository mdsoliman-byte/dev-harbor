import { useState, useEffect } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { fetchAboutData, updateAboutData } from '@/services/api/about';
import { AboutData } from '@/types/about';
import { toast } from '@/components/ui/use-toast';

export const useAboutForm = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState<AboutData | null>(null);
  
  const { data: aboutData, isLoading, error } = useQuery<AboutData>({
    queryKey: ['aboutData'],
    queryFn: fetchAboutData
  });
  
  // Update form data when aboutData is loaded
  useEffect(() => {
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
      
      // The fix is here - we need to safely handle the parent key
      // First, get the parent object
      const parentObj = prev[parent as keyof AboutData];
      
      // Check if parentObj exists and is an object before spreading
      if (parentObj && typeof parentObj === 'object') {
        return {
          ...prev,
          [parent]: {
            ...parentObj,
            [field]: value
          }
        };
      }
      
      // If parent doesn't exist or isn't an object, return prev unchanged
      return prev;
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

  return {
    isEditing,
    setIsEditing,
    formData,
    setFormData,
    aboutData,
    isLoading,
    error,
    updateMutation,
    handleSubmit,
    updateField,
    updateNestedField,
    addExperience,
    updateExperience,
    removeExperience,
    addEducation,
    updateEducation,
    removeEducation,
    addSkill,
    updateSkill,
    removeSkill
  };
};
