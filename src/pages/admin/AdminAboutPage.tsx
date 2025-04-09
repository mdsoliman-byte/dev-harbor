
import React from 'react';
import { useAboutForm } from '@/hooks/useAboutForm';
import AboutPageHeader from '@/components/admin/about/AboutPageHeader';
import AboutFormTabs from '@/components/admin/about/AboutFormTabs';

const AdminAboutPage = () => {
  const {
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
  } = useAboutForm();
  
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
      <AboutPageHeader 
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleSubmit={handleSubmit}
        isPending={updateMutation.isPending}
        aboutData={aboutData}
        setFormData={setFormData}
      />
      
      <form onSubmit={handleSubmit}>
        <AboutFormTabs 
          formData={formData}
          isEditing={isEditing}
          updateField={updateField}
          updateNestedField={updateNestedField}
          addExperience={addExperience}
          updateExperience={updateExperience}
          removeExperience={removeExperience}
          addEducation={addEducation}
          updateEducation={updateEducation}
          removeEducation={removeEducation}
          addSkill={addSkill}
          updateSkill={updateSkill}
          removeSkill={removeSkill}
        />
      </form>
    </div>
  );
};

export default AdminAboutPage;
