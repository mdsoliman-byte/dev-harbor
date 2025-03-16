
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const AboutPage = () => {
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
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1374" 
                  alt="John Doe"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h1 className="text-3xl font-display font-bold mb-2">John Doe</h1>
              <p className="text-lg text-muted-foreground mb-6">Frontend Developer</p>
              
              <div className="flex space-x-4 mb-8">
                <a 
                  href="#" 
                  className="bg-secondary/50 rounded-full p-2 hover:bg-primary/10 transition-colors"
                  aria-label="GitHub"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="bg-secondary/50 rounded-full p-2 hover:bg-primary/10 transition-colors"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
                <a 
                  href="#" 
                  className="bg-secondary/50 rounded-full p-2 hover:bg-primary/10 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
                <a 
                  href="mailto:contact@johndoe.dev" 
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
                <p>
                  Hello! I'm John, a passionate frontend developer based in San Francisco with over 5 years of experience 
                  creating elegant and functional web applications. I specialize in building modern, responsive interfaces 
                  that deliver exceptional user experiences.
                </p>
                <p>
                  My journey in web development began during college when I built my first website for a local business. 
                  Since then, I've worked with startups, agencies, and enterprise companies, honing my skills and embracing 
                  new technologies along the way.
                </p>
                <p>
                  I believe that great software is not just about writing code—it's about solving problems and creating 
                  meaningful experiences for users. This philosophy guides my approach to every project I undertake.
                </p>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">Experience</h2>
              <div className="space-y-8">
                <div className="border-l-2 border-border pl-5 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <h3 className="text-xl font-semibold">Senior Frontend Developer</h3>
                  <p className="text-primary font-medium mb-1">TechCorp Inc.</p>
                  <p className="text-sm text-muted-foreground mb-3">Jan 2021 - Present</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Lead the frontend development of the company's flagship product</li>
                    <li>Implemented a new component library that improved development speed by 40%</li>
                    <li>Mentored junior developers and conducted code reviews</li>
                    <li>Collaborated with designers and product managers to deliver high-quality user experiences</li>
                  </ul>
                </div>
                
                <div className="border-l-2 border-border pl-5 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <h3 className="text-xl font-semibold">Frontend Developer</h3>
                  <p className="text-primary font-medium mb-1">WebSolutions Agency</p>
                  <p className="text-sm text-muted-foreground mb-3">Mar 2019 - Dec 2020</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Developed responsive web applications for various clients</li>
                    <li>Worked with React, TypeScript, and modern CSS frameworks</li>
                    <li>Optimized website performance and accessibility</li>
                    <li>Participated in client meetings and technical planning sessions</li>
                  </ul>
                </div>
                
                <div className="border-l-2 border-border pl-5 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <h3 className="text-xl font-semibold">Junior Web Developer</h3>
                  <p className="text-primary font-medium mb-1">StartUp Labs</p>
                  <p className="text-sm text-muted-foreground mb-3">Jun 2017 - Feb 2019</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Built and maintained websites for early-stage startups</li>
                    <li>Created interactive UI components and animations</li>
                    <li>Implemented responsive designs from Figma mockups</li>
                    <li>Participated in agile development processes</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">Education</h2>
              <div className="space-y-8">
                <div className="border-l-2 border-border pl-5 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
                  <p className="text-primary font-medium mb-1">University of Technology</p>
                  <p className="text-sm text-muted-foreground mb-3">2013 - 2017</p>
                  <p className="text-muted-foreground">
                    Graduated with honors. Specialized in web technologies and user interface design.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-display font-bold mb-6">Interests & Hobbies</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-secondary/30 rounded-lg p-5 border border-border">
                  <h3 className="font-semibold mb-2">Open Source Contribution</h3>
                  <p className="text-sm text-muted-foreground">
                    I actively contribute to open-source projects and maintain several of my own libraries.
                  </p>
                </div>
                
                <div className="bg-secondary/30 rounded-lg p-5 border border-border">
                  <h3 className="font-semibold mb-2">Technology Writing</h3>
                  <p className="text-sm text-muted-foreground">
                    I write technical articles and tutorials to share knowledge with the developer community.
                  </p>
                </div>
                
                <div className="bg-secondary/30 rounded-lg p-5 border border-border">
                  <h3 className="font-semibold mb-2">Photography</h3>
                  <p className="text-sm text-muted-foreground">
                    I enjoy landscape photography and experimenting with different techniques and styles.
                  </p>
                </div>
                
                <div className="bg-secondary/30 rounded-lg p-5 border border-border">
                  <h3 className="font-semibold mb-2">Hiking & Travel</h3>
                  <p className="text-sm text-muted-foreground">
                    I love exploring new places, experiencing different cultures, and hiking in nature.
                  </p>
                </div>
              </div>
            </section>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
