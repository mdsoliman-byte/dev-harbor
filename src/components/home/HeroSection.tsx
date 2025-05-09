import { ArrowRight, ArrowDown, Cpu, Code } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Badge } from '@/components/ui/badge';
import { useIsMobile } from '@/hooks/use-mobile';
import { useEffect, useState } from 'react';
import { fetchHeroData } from '@/services/api';

const HeroSection = () => {
  const isMobile = useIsMobile();
  const [heroData, setHeroData] = useState(null);

  useEffect(() => {
    const getHeroData = async () => {
      try {
        const data = await fetchHeroData();
        setHeroData(data);
      } catch (error) {
        console.error('Failed to fetch hero data:', error);
      }
    };

    getHeroData();
  }, []);

  if (!heroData) {
    return <div>Loading...</div>; // Placeholder while data is loading
  }

  const { heading, title, shortbio, skills, profile_image } = heroData;

  return (
    <section className="relative min-h-screen flex items-center px-4 md:px-8 lg:px-16 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-background -z-10" />
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={{
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
            }}
            className="max-w-3xl order-2 lg:order-1"
          >
            <motion.div 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} 
              custom={1}
              className="inline-block px-3 py-1 mb-6 border border-border rounded-full bg-background/50 backdrop-blur-sm"
            >
              <p className="text-sm font-medium text-muted-foreground">{heading}</p>
            </motion.div>
            
            <motion.h1 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} 
              custom={2}
              className="text-4xl md:text-6xl font-display font-bold tracking-tight"
            >
              {title}
            </motion.h1>
            
            <motion.p 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} 
              custom={3}
              className="mt-6 text-lg text-muted-foreground leading-relaxed"
            >
              {shortbio}
            </motion.p>
            
            <motion.div 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} 
              custom={4}
              className="mt-6 flex flex-wrap gap-3"
            >
              {skills.map((skill, index) => (
                <Badge key={index} variant="outline" className="bg-primary/10">
                  {skill}
                </Badge>
              ))}
            </motion.div>
            
            <motion.div 
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }} 
              custom={5}
              className="mt-10 flex flex-wrap gap-4"
            >
              <Button asChild size={isMobile ? "default" : "lg"} className="group">
                <Link to="/projects">
                  View My Work
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              
              <Button asChild variant="outline" size={isMobile ? "default" : "lg"} className="group">
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
            <div className="relative p-[40px]">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-2xl blur-2xl -z-10 transform rotate-6"></div>
              <img 
                src={`http://localhost:8000${heroData.profile_image}`}
                alt="Profile" 
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
      
      <Link 
        to="/blog" 
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer"
        aria-label="Scroll to latest blogs"
      >
        <ArrowDown className="h-6 w-6 text-muted-foreground" />
      </Link>
    </section>
  );
};

export default HeroSection;
