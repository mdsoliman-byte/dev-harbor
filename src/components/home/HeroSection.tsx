
import { ArrowRight, ArrowDown, Cpu, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';

const HeroSection = () => {
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

  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background -z-10" />
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            className="max-w-3xl order-2 lg:order-1"
          >
            <motion.div 
              variants={fadeIn} 
              custom={1}
              className="inline-block px-3 py-1 mb-6 border border-border rounded-full bg-background/50 backdrop-blur-sm"
            >
              <p className="text-sm font-medium text-muted-foreground">Data Scientist & Programmer</p>
            </motion.div>
            
            <motion.h1 
              variants={fadeIn} 
              custom={2}
              className="text-4xl md:text-6xl font-display font-bold tracking-tight"
            >
              Transforming data into insights with Python & R expertise
            </motion.h1>
            
            <motion.p 
              variants={fadeIn} 
              custom={3}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              I'm MD SOLIMAN, a data scientist specializing in machine learning, statistical analysis, and data visualization, creating impactful solutions to complex data problems.
            </motion.p>
            
            <motion.div 
              variants={fadeIn} 
              custom={4}
              className="mt-6 flex flex-wrap gap-3"
            >
              <Badge variant="outline" className="bg-primary/10">Python</Badge>
              <Badge variant="outline" className="bg-primary/10">R</Badge>
              <Badge variant="outline" className="bg-primary/10">Machine Learning</Badge>
              <Badge variant="outline" className="bg-primary/10">Data Analysis</Badge>
              <Badge variant="outline" className="bg-primary/10">SQL</Badge>
              <Badge variant="outline" className="bg-primary/10">Visualization</Badge>
            </motion.div>
            
            <motion.div 
              variants={fadeIn} 
              custom={5}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button asChild size="lg" className="group">
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size="lg" className="group">
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 max-w-md mx-auto"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-2xl blur-2xl -z-10 transform rotate-6"></div>
              <img 
                src="/lovable-uploads/e8092dd1-2449-43ed-9410-0c6588466696.png" 
                alt="MD Soliman" 
                className="rounded-2xl shadow-2xl border-4 border-background/50 object-cover w-full h-auto"
              />
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="absolute -bottom-6 -right-6 bg-background rounded-lg p-3 shadow-lg border border-border"
              >
                <Cpu className="h-6 w-6 text-primary" />
              </motion.div>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="absolute -top-6 -left-6 bg-background rounded-lg p-3 shadow-lg border border-border"
              >
                <Code className="h-6 w-6 text-primary" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
      
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </div>
    </section>
  );
};

export default HeroSection;
