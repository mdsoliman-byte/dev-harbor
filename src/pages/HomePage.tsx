
import { ArrowRight, ArrowDown, Github, ExternalLink, Code, Database, BarChart, PenTool, Terminal, Award, BookOpen, Layers, Cpu, Briefcase, User, Mail, MapPin, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/ThemeProvider';
import { Badge } from '@/components/ui/badge';

const HomePage = () => {
  const { theme } = useTheme();
  
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
  
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
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
      
      {/* Profile Section */}
      <section className="py-20 px-4 md:px-8 lg:px-16 bg-secondary/10">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={fadeIn} className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">About Me</h2>
              <div className="w-20 h-1 bg-primary mx-auto rounded-full"></div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="glass-panel mb-10">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <User className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Personal Profile</h3>
                  <p className="text-muted-foreground">
                    I'm a data scientist and programmer with 5+ years of experience in developing machine learning models and data-driven solutions. My passion lies in turning complex data into actionable insights that drive business decisions.
                  </p>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="glass-panel mb-10">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <Briefcase className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Professional Experience</h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-primary/50 pl-4">
                      <p className="font-medium">Senior Data Scientist</p>
                      <p className="text-sm text-muted-foreground">TechInnovate Inc. (2021 - Present)</p>
                      <p className="text-sm">Led a team of 5 data scientists in developing predictive models for financial forecasting.</p>
                    </div>
                    <div className="border-l-2 border-primary/50 pl-4">
                      <p className="font-medium">Data Analyst</p>
                      <p className="text-sm text-muted-foreground">DataVision Analytics (2018 - 2021)</p>
                      <p className="text-sm">Analyzed customer data to improve business strategies and increase revenue by 25%.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="glass-panel">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="flex-shrink-0">
                  <div className="p-2 bg-primary/20 rounded-full">
                    <BookOpen className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Education</h3>
                  <div className="space-y-4">
                    <div className="border-l-2 border-primary/50 pl-4">
                      <p className="font-medium">MSc in Data Science</p>
                      <p className="text-sm text-muted-foreground">Stanford University (2016 - 2018)</p>
                      <p className="text-sm">Specialized in machine learning algorithms and statistical analysis.</p>
                    </div>
                    <div className="border-l-2 border-primary/50 pl-4">
                      <p className="font-medium">BSc in Computer Science</p>
                      <p className="text-sm text-muted-foreground">MIT (2012 - 2016)</p>
                      <p className="text-sm">Graduated with honors. Thesis on "Predictive Models for Time Series Data".</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="mt-10 flex flex-wrap justify-center gap-6">
              <div className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                <span>San Francisco, CA</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-primary" />
                <span>contact@mdsoliman.com</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Available for freelance</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Projects */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-secondary/50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
            <div>
              <p className="text-sm font-medium text-primary mb-2">SELECTED WORK</p>
              <h2 className="text-3xl md:text-4xl font-display font-bold">Featured Projects</h2>
            </div>
            
            <Button asChild variant="ghost" className="group mt-4 md:mt-0">
              <Link to="/projects">
                View All Projects
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
          
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {[
              {
                title: "Predictive Analytics Dashboard",
                description: "A machine learning-powered dashboard for financial forecasting using Python, scikit-learn, and Streamlit.",
                tags: ["Python", "Machine Learning", "Streamlit"],
                icon: <BarChart className="h-6 w-6 text-primary" />
              },
              {
                title: "Natural Language Processing Tool",
                description: "Text analysis tool for sentiment analysis and entity recognition using NLTK, spaCy, and Hugging Face transformers.",
                tags: ["Python", "NLP", "Deep Learning"],
                icon: <PenTool className="h-6 w-6 text-primary" />
              },
              {
                title: "Data Pipeline Automation",
                description: "Automated ETL process for big data processing using Pandas, Airflow, and SQL with cloud integration.",
                tags: ["Python", "SQL", "Airflow"],
                icon: <Database className="h-6 w-6 text-primary" />
              }
            ].map((project, i) => (
              <motion.div 
                key={i}
                variants={fadeIn}
                custom={i}
                whileHover={{ y: -10, transition: { duration: 0.3 } }}
                className="group relative bg-background rounded-lg overflow-hidden border border-border shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                <div className="aspect-video bg-muted/30 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    {project.icon}
                  </div>
                </div>
                
                <div className="p-6 relative z-10">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">{tag}</span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300">{project.title}</h3>
                  <p className="text-muted-foreground text-sm mb-4">
                    {project.description}
                  </p>
                  
                  <div className="flex items-center space-x-4">
                    <a href="#" className="text-sm font-medium hover-underline inline-flex items-center">
                      <Github className="mr-1 h-4 w-4" />
                      GitHub
                    </a>
                    <a href="#" className="text-sm font-medium hover-underline inline-flex items-center">
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Live Demo
                    </a>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Skills Section Preview */}
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
            {[
              { name: 'Python', icon: <Terminal className="h-6 w-6 text-primary" /> },
              { name: 'R Language', icon: <Code className="h-6 w-6 text-primary" /> },
              { name: 'Machine Learning', icon: <BarChart className="h-6 w-6 text-primary" /> },
              { name: 'SQL & NoSQL', icon: <Database className="h-6 w-6 text-primary" /> },
              { name: 'Data Visualization', icon: <PenTool className="h-6 w-6 text-primary" /> },
              { name: 'Statistical Analysis', icon: <BarChart className="h-6 w-6 text-primary" /> }
            ].map((skill, i) => (
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
      
      {/* Call to Action */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-primary/5">
        <div className="container mx-auto">
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
            className="max-w-3xl mx-auto text-center"
          >
            <motion.h2 
              variants={fadeIn}
              className="text-3xl md:text-4xl font-display font-bold mb-6"
            >
              Let's collaborate on data-driven solutions
            </motion.h2>
            
            <motion.p 
              variants={fadeIn}
              custom={1}
              className="text-lg text-muted-foreground mb-10"
            >
              I'm always open to discussing new data science projects, research collaborations, or opportunities to be part of your data analytics vision.
            </motion.p>
            
            <motion.div variants={fadeIn} custom={2}>
              <Button asChild size="lg" className="group">
                <Link to="/contact">
                  Get in Touch
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
