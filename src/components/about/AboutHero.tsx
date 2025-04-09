
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { AboutData } from '@/types/about';

interface AboutHeroProps {
  aboutData: AboutData;
}

const AboutHero = ({ aboutData }: AboutHeroProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5 }}
      className="lg:w-1/3"
    >
      <div className="sticky top-20">
        <div className="aspect-square bg-muted rounded-2xl overflow-hidden mb-6">
          <img 
            src={aboutData?.profileImage || "/placeholder.svg"} 
            alt={aboutData?.fullName || "Profile"}
            className="w-full h-full object-cover"
          />
        </div>
        
        <h1 className="text-3xl font-display font-bold mb-2">{aboutData?.fullName}</h1>
        <p className="text-lg text-muted-foreground mb-6">{aboutData?.title}</p>
        
        <div className="flex space-x-4 mb-8">
          <a 
            href={aboutData?.socialLinks?.github} 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary/50 rounded-full p-2 hover:bg-primary/10 transition-colors"
            aria-label="GitHub"
          >
            <Github className="h-5 w-5" />
          </a>
          <a 
            href={aboutData?.socialLinks?.twitter} 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary/50 rounded-full p-2 hover:bg-primary/10 transition-colors"
            aria-label="Twitter"
          >
            <Twitter className="h-5 w-5" />
          </a>
          <a 
            href={aboutData?.socialLinks?.linkedin} 
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary/50 rounded-full p-2 hover:bg-primary/10 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin className="h-5 w-5" />
          </a>
          <a 
            href={`mailto:${aboutData?.contact?.email}`} 
            className="bg-secondary/50 rounded-full p-2 hover:bg-primary/10 transition-colors"
            aria-label="Email"
          >
            <Mail className="h-5 w-5" />
          </a>
        </div>
        
        <Button asChild size="lg" className="w-full mb-3">
          <a href="/resume.pdf" target="_blank">
            Download Resume
          </a>
        </Button>
        
        <Button asChild variant="outline" size="lg" className="w-full">
          <Link to="/contact">
            Contact Me
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default AboutHero;
