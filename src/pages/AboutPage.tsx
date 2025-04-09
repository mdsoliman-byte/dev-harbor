
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/ThemeProvider';
import { useEffect, useState } from 'react';
import { fetchAboutData, AboutData } from '@/services/api/about';
import { useQuery } from '@tanstack/react-query';

type AboutData = {
  id: number;
  fullName: string;
  title: string;
  bio: string[];
  experience: Array<{
    id: number;
    position: string;
    company: string;
    period: string;
    description: string[];
  }>;
  education: Array<{
    id: number;
    degree: string;
    institution: string;
    period: string;
    description: string;
  }>;
  skills: Array<{
    id: number;
    title: string;
    description: string;
  }>;
  contact: {
    location: string;
    email: string;
    availableForFreelance: boolean;
  };
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
  };
  profileImage: string;
};

const AboutPage = () => {
  const { theme } = useTheme();
  
  const { data: aboutData, isLoading, error } = useQuery<AboutData>({
    queryKey: ['aboutData'],
    queryFn: fetchAboutData
  });
  
  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
    </div>;
  }
  
  if (error) {
    console.error('Error loading about data:', error);
  }
  
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          {/* Left Column */}
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
          
          {/* Right Column */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:w-2/3"
          >
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">About Me</h2>
              <div className="space-y-4 text-muted-foreground">
                {aboutData?.bio?.map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">Experience</h2>
              <div className="space-y-8">
                {aboutData?.experience?.map((exp) => (
                  <div key={exp.id} className="border-l-2 border-border pl-5 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                    <h3 className="text-xl font-semibold">{exp.position}</h3>
                    <p className="text-primary font-medium mb-1">{exp.company}</p>
                    <p className="text-sm text-muted-foreground mb-3">{exp.period}</p>
                    <ul className="list-disc list-inside text-muted-foreground space-y-2">
                      {exp.description.map((item, index) => (
                        <li key={index}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">Education</h2>
              <div className="space-y-8">
                {aboutData?.education?.map((edu) => (
                  <div key={edu.id} className="border-l-2 border-border pl-5 relative">
                    <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                    <h3 className="text-xl font-semibold">{edu.degree}</h3>
                    <p className="text-primary font-medium mb-1">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground mb-3">{edu.period}</p>
                    <p className="text-muted-foreground">
                      {edu.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-display font-bold mb-6">Interests & Specializations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {aboutData?.skills?.map((skill) => (
                  <div key={skill.id} className="bg-secondary/30 rounded-lg p-5 border border-border">
                    <h3 className="font-semibold mb-2">{skill.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {skill.description}
                    </p>
                  </div>
                ))}
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
