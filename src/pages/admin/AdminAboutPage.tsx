
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchAboutData, updateAboutData } from '@/services/api';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from '@/components/ui/use-toast';
import { motion } from 'framer-motion';
import { Pencil, Save, Plus, Trash, Check } from 'lucide-react';

const AdminAboutPage = () => {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);
  
  const { data: aboutData, isLoading, error } = useQuery({
    queryKey: ['aboutData'],
    queryFn: fetchAboutData
  });
  
  const [formData, setFormData] = useState(aboutData);
  
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
    updateMutation.mutate(formData);
  };
  
  const updateField = (field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [field]: value
    }));
  };
  
  const updateNestedField = (parent: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      [parent]: {
        ...prev[parent],
        [field]: value
      }
    }));
  };
  
  const addExperience = () => {
    setFormData((prev: any) => ({
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
    }));
  };
  
  const updateExperience = (index: number, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      experience: prev.experience.map((exp: any, i: number) => 
        i === index ? { ...exp, [field]: value } : exp
      )
    }));
  };
  
  const removeExperience = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      experience: prev.experience.filter((_: any, i: number) => i !== index)
    }));
  };
  
  const addEducation = () => {
    setFormData((prev: any) => ({
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
    }));
  };
  
  const updateEducation = (index: number, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      education: prev.education.map((edu: any, i: number) => 
        i === index ? { ...edu, [field]: value } : edu
      )
    }));
  };
  
  const removeEducation = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      education: prev.education.filter((_: any, i: number) => i !== index)
    }));
  };
  
  const addSkill = () => {
    setFormData((prev: any) => ({
      ...prev,
      skills: [
        ...prev.skills,
        {
          id: prev.skills.length + 1,
          title: "",
          description: ""
        }
      ]
    }));
  };
  
  const updateSkill = (index: number, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      skills: prev.skills.map((skill: any, i: number) => 
        i === index ? { ...skill, [field]: value } : skill
      )
    }));
  };
  
  const removeSkill = (index: number) => {
    setFormData((prev: any) => ({
      ...prev,
      skills: prev.skills.filter((_: any, i: number) => i !== index)
    }));
  };
  
  if (isLoading) {
    return <div className="flex items-center justify-center h-full">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  if (error) {
    return <div className="p-4 text-red-500">Error loading about data. Please try again.</div>;
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
              setFormData(aboutData);
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
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Update your personal information that appears on the about page.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <Input 
                      value={formData?.fullName || ''} 
                      onChange={(e) => updateField('fullName', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title / Position</label>
                    <Input 
                      value={formData?.title || ''} a
                      onChange={(e) => updateField('title', e.target.value)}
                      disabled={!isEditing}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Bio</label>
                    {formData?.bio.map((paragraph, index) => (
                      <div key={index} className="flex gap-2">
                        <Textarea 
                          value={paragraph} 
                          onChange={(e) => {
                            const newBio = [...formData.bio];
                            newBio[index] = e.target.value;
                            updateField('bio', newBio);
                          }}
                          disabled={!isEditing}
                          className="min-h-[100px]"
                        />
                        {isEditing && (
                          <Button 
                            type="button" 
                            variant="outline" 
                            size="icon" 
                            onClick={() => {
                              const newBio = formData.bio.filter((_, i) => i !== index);
                              updateField('bio', newBio);
                            }}
                          >
                            <Trash className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    {isEditing && (
                      <Button 
                        type="button" 
                        variant="outline" 
                        onClick={() => {
                          updateField('bio', [...formData.bio, '']);
                        }}
                      >
                        <Plus className="h-4 w-4 mr-2" /> Add Paragraph
                      </Button>
                    )}
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Profile Image URL</label>
                    <Input 
                      value={formData?.profileImage || ''} 
                      onChange={(e) => updateField('profileImage', e.target.value)}
                      disabled={!isEditing}
                    />
                    {formData?.profileImage && (
                      <div className="mt-2">
                        <img 
                          src={formData.profileImage} 
                          alt="Profile Preview" 
                          className="w-32 h-32 object-cover rounded-lg border"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="experience">
            <Card>
              <CardHeader>
                <CardTitle>Work Experience</CardTitle>
                <CardDescription>Manage your work experience entries.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {formData?.experience.map((exp, index) => (
                    <motion.div 
                      key={exp.id} 
                      className="p-4 border rounded-lg relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isEditing && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeExperience(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <div className="grid gap-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Position</label>
                            <Input 
                              value={exp.position} 
                              onChange={(e) => updateExperience(index, 'position', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                          <div className="space-y-2">
                            <label className="text-sm font-medium">Company</label>
                            <Input 
                              value={exp.company} 
                              onChange={(e) => updateExperience(index, 'company', e.target.value)}
                              disabled={!isEditing}
                            />
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Period</label>
                          <Input 
                            value={exp.period} 
                            onChange={(e) => updateExperience(index, 'period', e.target.value)}
                            disabled={!isEditing}
                            placeholder="e.g., Jan 2020 - Present"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Description</label>
                          {exp.description.map((item, itemIndex) => (
                            <div key={itemIndex} className="flex gap-2">
                              <Input 
                                value={item} 
                                onChange={(e) => {
                                  const newDesc = [...exp.description];
                                  newDesc[itemIndex] = e.target.value;
                                  updateExperience(index, 'description', newDesc);
                                }}
                                disabled={!isEditing}
                              />
                              {isEditing && (
                                <Button 
                                  type="button" 
                                  variant="outline" 
                                  size="icon" 
                                  onClick={() => {
                                    const newDesc = exp.description.filter((_, i) => i !== itemIndex);
                                    updateExperience(index, 'description', newDesc);
                                  }}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                          {isEditing && (
                            <Button 
                              type="button" 
                              variant="outline" 
                              onClick={() => {
                                updateExperience(index, 'description', [...exp.description, '']);
                              }}
                            >
                              <Plus className="h-4 w-4 mr-2" /> Add Description Item
                            </Button>
                          )}
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isEditing && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addExperience}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Experience
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="education">
            <Card>
              <CardHeader>
                <CardTitle>Education</CardTitle>
                <CardDescription>Manage your educational background.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {formData?.education.map((edu, index) => (
                    <motion.div 
                      key={edu.id} 
                      className="p-4 border rounded-lg relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isEditing && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeEducation(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Degree</label>
                          <Input 
                            value={edu.degree} 
                            onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Institution</label>
                          <Input 
                            value={edu.institution} 
                            onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Period</label>
                          <Input 
                            value={edu.period} 
                            onChange={(e) => updateEducation(index, 'period', e.target.value)}
                            disabled={!isEditing}
                            placeholder="e.g., 2015 - 2019"
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Description</label>
                          <Textarea 
                            value={edu.description} 
                            onChange={(e) => updateEducation(index, 'description', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isEditing && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addEducation}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Education
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="skills">
            <Card>
              <CardHeader>
                <CardTitle>Skills & Specializations</CardTitle>
                <CardDescription>Manage your skills and specializations.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {formData?.skills.map((skill, index) => (
                    <motion.div 
                      key={skill.id} 
                      className="p-4 border rounded-lg relative"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      {isEditing && (
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="absolute top-2 right-2"
                          onClick={() => removeSkill(index)}
                        >
                          <Trash className="h-4 w-4" />
                        </Button>
                      )}
                      
                      <div className="grid gap-4">
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Title</label>
                          <Input 
                            value={skill.title} 
                            onChange={(e) => updateSkill(index, 'title', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                        
                        <div className="space-y-2">
                          <label className="text-sm font-medium">Description</label>
                          <Textarea 
                            value={skill.description} 
                            onChange={(e) => updateSkill(index, 'description', e.target.value)}
                            disabled={!isEditing}
                          />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  
                  {isEditing && (
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={addSkill}
                      className="w-full"
                    >
                      <Plus className="h-4 w-4 mr-2" /> Add Skill
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="contact">
            <Card>
              <CardHeader>
                <CardTitle>Contact & Social Links</CardTitle>
                <CardDescription>Update your contact information and social media links.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Contact Information</h3>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Location</label>
                      <Input 
                        value={formData?.contact?.location || ''} 
                        onChange={(e) => updateNestedField('contact', 'location', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Email</label>
                      <Input 
                        value={formData?.contact?.email || ''} 
                        onChange={(e) => updateNestedField('contact', 'email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="availableForFreelance"
                        checked={formData?.contact?.availableForFreelance || false}
                        onChange={(e) => updateNestedField('contact', 'availableForFreelance', e.target.checked)}
                        disabled={!isEditing}
                        className="rounded border-gray-300 text-primary focus:ring-primary"
                      />
                      <label htmlFor="availableForFreelance" className="text-sm font-medium">
                        Available for Freelance
                      </label>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Social Media Links</h3>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">GitHub</label>
                      <Input 
                        value={formData?.socialLinks?.github || ''} 
                        onChange={(e) => updateNestedField('socialLinks', 'github', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">Twitter</label>
                      <Input 
                        value={formData?.socialLinks?.twitter || ''} 
                        onChange={(e) => updateNestedField('socialLinks', 'twitter', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-sm font-medium">LinkedIn</label>
                      <Input 
                        value={formData?.socialLinks?.linkedin || ''} 
                        onChange={(e) => updateNestedField('socialLinks', 'linkedin', e.target.value)}
                        disabled={!isEditing}
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default AdminAboutPage;
