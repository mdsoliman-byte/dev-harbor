
import { ArrowRight, Terminal, Code, BarChart, Database, PenTool } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const SkillsSection = () => {
  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: (i = 0) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.7,
        ease: [0.6, -0.05, 0.01, 0.99],
      },
    }),
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const skills = [
    { name: 'Python', icon: <Terminal className="h-6 w-6 text-primary" /> },
    { name: 'R Language', icon: <Code className="h-6 w-6 text-primary" /> },
    { name: 'Machine Learning', icon: <BarChart className="h-6 w-6 text-primary" /> },
    { name: 'SQL & NoSQL', icon: <Database className="h-6 w-6 text-primary" /> },
    { name: 'Data Visualization', icon: <PenTool className="h-6 w-6 text-primary" /> },
    { name: 'Statistical Analysis', icon: <BarChart className="h-6 w-6 text-primary" /> }
  ];

  return (
    <section className="py-24 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className="text-sm font-medium text-primary mb-2">EXPERTISE</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">Skills & Technologies</h2>
          </div>
          
          <Button asChild variant="ghost" className="group mt-4 md:mt-0">
            <Link to="/skills">
              View All Skills
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </div>
        
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={staggerContainer}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6"
        >
          {skills.map((skill, i) => (
            <motion.div 
              key={skill.name}
              variants={fadeIn}
              custom={i}
              whileHover={{ 
                scale: 1.05,
                boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.3 } 
              }}
              className="flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-lg border border-border"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                {skill.icon}
              </div>
              <h3 className="text-center font-medium">{skill.name}</h3>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default SkillsSection;
