
import { motion } from 'framer-motion';
import { Code, Server, Database, Terminal, BarChart, ChartPie, Brain, FileCode, ChartBar } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';
import { useState, useEffect } from 'react';
import { Skill, fetchSkillsData } from '@/services/api/skills';
import * as React from 'react';

const SkillsPage = () => {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Group skills by category for display
  const groupedSkills = skills.reduce((acc, skill) => {
    const category = skill.category;
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);
  
  useEffect(() => {
    const loadSkills = async () => {
      try {
        setLoading(true);
        const data = await fetchSkillsData();
        setSkills(data);
        setError(null);
      } catch (err) {
        setError('Failed to load skills data');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    loadSkills();
  }, []);
  
  // Map category names to icon components
  const categoryIcons: Record<string, any> = {
    'Development': Code,
    'Data': Database,
    'Design': ChartPie,
    'Infrastructure': Terminal,
    'Business': ChartBar,
    'Other': FileCode
  };
  
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-red-500 text-center">
          <p className="text-2xl font-bold mb-2">Error</p>
          <p>{error}</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Skills & Expertise</h1>
          <p className="text-lg text-muted-foreground">
            A comprehensive overview of my technical skills in data science, machine learning, and programming.
            I continuously enhance my knowledge and adapt to emerging technologies in the data science ecosystem.
          </p>
        </motion.div>
        
        <div className="space-y-20">
          {Object.entries(groupedSkills).map(([category, categorySkills], categoryIndex) => (
            <motion.div 
              key={category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
              className={`glass-card p-8 rounded-xl`}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  {categoryIcons[category] ? 
                    React.createElement(categoryIcons[category], { className: "h-6 w-6 text-primary" }) : 
                    <Code className="h-6 w-6 text-primary" />
                  }
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">{category}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categorySkills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 + categoryIndex * 0.1 }}
                    className="glass-morphism rounded-lg p-5"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{skill.title}</h3>
                      <span className="text-sm text-muted-foreground">Expert</span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-4">{skill.description}</p>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div 
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: "85%" }}
                        transition={{ duration: 1, delay: skillIndex * 0.05 + categoryIndex * 0.1 }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Certification and Education Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 glass-card p-8 rounded-xl"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Certifications & Education</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="glass-morphism rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Master of Science in Data Science</h3>
              <p className="text-muted-foreground mb-1">University of Data Analytics</p>
              <p className="text-sm text-muted-foreground">2015 - 2017</p>
            </div>
            
            <div className="glass-morphism rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Deep Learning Specialization</h3>
              <p className="text-muted-foreground mb-1">Coursera (DeepLearning.AI)</p>
              <p className="text-sm text-muted-foreground">2020</p>
            </div>
            
            <div className="glass-morphism rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Professional Certificate in Data Science</h3>
              <p className="text-muted-foreground mb-1">HarvardX</p>
              <p className="text-sm text-muted-foreground">2019</p>
            </div>
            
            <div className="glass-morphism rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-2">Machine Learning Engineer Nanodegree</h3>
              <p className="text-muted-foreground mb-1">Udacity</p>
              <p className="text-sm text-muted-foreground">2018</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsPage;
