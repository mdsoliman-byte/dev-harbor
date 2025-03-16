
import { motion } from 'framer-motion';
import { Code, Server, Database, Terminal, BarChart, ChartPie, Brain, Flask, FileCode, ChartBar } from 'lucide-react';
import { useTheme } from '@/components/ThemeProvider';

const skillCategories = [
  {
    id: 'programming',
    title: 'Programming Languages',
    icon: Terminal,
    skills: [
      { name: 'Python', level: 95 },
      { name: 'R', level: 90 },
      { name: 'SQL', level: 85 },
      { name: 'Shell Scripting', level: 80 },
      { name: 'JavaScript', level: 75 },
      { name: 'Julia', level: 65 },
    ]
  },
  {
    id: 'ml',
    title: 'Machine Learning & AI',
    icon: Brain,
    skills: [
      { name: 'scikit-learn', level: 90 },
      { name: 'TensorFlow/Keras', level: 85 },
      { name: 'PyTorch', level: 80 },
      { name: 'Natural Language Processing', level: 85 },
      { name: 'Computer Vision', level: 75 },
      { name: 'Time Series Analysis', level: 90 },
    ]
  },
  {
    id: 'dataanalysis',
    title: 'Data Analysis & Visualization',
    icon: ChartPie,
    skills: [
      { name: 'Pandas', level: 95 },
      { name: 'NumPy', level: 90 },
      { name: 'Matplotlib/Seaborn', level: 90 },
      { name: 'ggplot2', level: 85 },
      { name: 'Tableau', level: 80 },
      { name: 'D3.js', level: 70 },
    ]
  },
  {
    id: 'dataengineering',
    title: 'Data Engineering',
    icon: Database,
    skills: [
      { name: 'PostgreSQL/MySQL', level: 85 },
      { name: 'MongoDB', level: 80 },
      { name: 'Apache Spark', level: 75 },
      { name: 'Airflow', level: 70 },
      { name: 'ETL Pipeline Design', level: 85 },
      { name: 'Data Warehousing', level: 80 },
    ]
  }
];

const SkillsPage = () => {
  const { theme } = useTheme();
  
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
          {skillCategories.map((category, categoryIndex) => (
            <motion.div 
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: categoryIndex * 0.1 }}
            >
              <div className="flex items-center gap-3 mb-8">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                  <category.icon className="h-6 w-6 text-primary" />
                </div>
                <h2 className="text-2xl md:text-3xl font-display font-bold">{category.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {category.skills.map((skill, skillIndex) => (
                  <motion.div 
                    key={skill.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: skillIndex * 0.05 + categoryIndex * 0.1 }}
                    className="bg-secondary/30 rounded-lg p-5 border border-border"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-medium">{skill.name}</h3>
                      <span className="text-sm text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <motion.div 
                        className="bg-primary h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${skill.level}%` }}
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
          className="mt-20"
        >
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-8">Certifications & Education</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-secondary/30 rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-2">Master of Science in Data Science</h3>
              <p className="text-muted-foreground mb-1">University of Data Analytics</p>
              <p className="text-sm text-muted-foreground">2015 - 2017</p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-2">Deep Learning Specialization</h3>
              <p className="text-muted-foreground mb-1">Coursera (DeepLearning.AI)</p>
              <p className="text-sm text-muted-foreground">2020</p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-2">Professional Certificate in Data Science</h3>
              <p className="text-muted-foreground mb-1">HarvardX</p>
              <p className="text-sm text-muted-foreground">2019</p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-6 border border-border">
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
