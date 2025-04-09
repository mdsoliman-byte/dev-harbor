
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { AboutData } from '@/types/about';
import BasicInfoTab from '@/components/admin/about/BasicInfoTab';
import ExperienceTab from '@/components/admin/about/ExperienceTab';
import EducationTab from '@/components/admin/about/EducationTab';
import SkillsTab from '@/components/admin/about/SkillsTab';
import ContactSocialTab from '@/components/admin/about/ContactSocialTab';

interface AboutFormTabsProps {
  formData: AboutData;
  isEditing: boolean;
  updateField: (field: string, value: any) => void;
  updateNestedField: (parent: string, field: string, value: any) => void;
  addExperience: () => void;
  updateExperience: (index: number, field: string, value: any) => void;
  removeExperience: (index: number) => void;
  addEducation: () => void;
  updateEducation: (index: number, field: string, value: any) => void;
  removeEducation: (index: number) => void;
  addSkill: () => void;
  updateSkill: (index: number, field: string, value: any) => void;
  removeSkill: (index: number) => void;
}

const AboutFormTabs: React.FC<AboutFormTabsProps> = ({
  formData,
  isEditing,
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
}) => {
  return (
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
  );
};

export default AboutFormTabs;
