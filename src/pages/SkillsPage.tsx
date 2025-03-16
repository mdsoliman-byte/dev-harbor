
import { motion } from 'framer-motion';
import { Code, Server, Layout, Database, Terminal, Workflow } from 'lucide-react';

const skillCategories = [
  {
    id: 'frontend',
    title: 'Frontend Development',
    icon: Layout,
    skills: [
      { name: 'React', level: 90 },
      { name: 'TypeScript', level: 85 },
      { name: 'JavaScript', level: 95 },
      { name: 'HTML/CSS', level: 90 },
      { name: 'TailwindCSS', level: 85 },
      { name: 'Next.js', level: 80 },
      { name: 'Vue.js', level: 75 },
      { name: 'Redux', level: 85 },
    ]
  },
  {
    id: 'backend',
    title: 'Backend Development',
    icon: Server,
    skills: [
      { name: 'Node.js', level: 80 },
      { name: 'Express', level: 85 },
      { name: 'REST APIs', level: 90 },
      { name: 'GraphQL', level: 75 },
      { name: 'Python', level: 70 },
      { name: 'Django', level: 65 },
    ]
  },
  {
    id: 'database',
    title: 'Databases',
    icon: Database,
    skills: [
      { name: 'MongoDB', level: 85 },
      { name: 'PostgreSQL', level: 80 },
      { name: 'MySQL', level: 75 },
      { name: 'Firebase', level: 85 },
      { name: 'Supabase', level: 80 },
    ]
  },
  {
    id: 'tools',
    title: 'Tools & Methods',
    icon: Workflow,
    skills: [
      { name: 'Git & GitHub', level: 90 },
      { name: 'Docker', level: 75 },
      { name: 'CI/CD', level: 80 },
      { name: 'Agile/Scrum', level: 85 },
      { name: 'Jest/Testing', level: 80 },
      { name: 'Figma/Design', level: 75 },
    ]
  }
];

const SkillsPage = () => {
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
            A comprehensive overview of my technical skills and areas of expertise. 
            I continuously learn and adapt to stay current with emerging technologies.
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
              <h3 className="text-xl font-semibold mb-2">Bachelor of Science in Computer Science</h3>
              <p className="text-muted-foreground mb-1">University of Technology</p>
              <p className="text-sm text-muted-foreground">2015 - 2019</p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-2">AWS Certified Developer</h3>
              <p className="text-muted-foreground mb-1">Amazon Web Services</p>
              <p className="text-sm text-muted-foreground">2021</p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-2">React Certification</h3>
              <p className="text-muted-foreground mb-1">Meta (Facebook)</p>
              <p className="text-sm text-muted-foreground">2022</p>
            </div>
            
            <div className="bg-secondary/30 rounded-lg p-6 border border-border">
              <h3 className="text-xl font-semibold mb-2">Full-Stack Web Development</h3>
              <p className="text-muted-foreground mb-1">Coursera</p>
              <p className="text-sm text-muted-foreground">2020</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SkillsPage;
