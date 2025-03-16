
import { ArrowRight, ArrowDown, Github, ExternalLink, Code, Database, BarChart, PenTool, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/ThemeProvider';

const HomePage = () => {
  const { theme } = useTheme();
  
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center px-4 md:px-8 lg:px-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-background -z-10" />
        
        <div className="container mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-3xl"
          >
            <div className="inline-block px-3 py-1 mb-6 border border-border rounded-full bg-background/50 backdrop-blur-sm">
              <p className="text-sm font-medium text-muted-foreground">Data Scientist & Programmer</p>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold tracking-tight">
              Transforming data into insights with Python & R expertise
            </h1>
            
            <p className="mt-6 text-lg text-muted-foreground leading-relaxed">
              I'm MD SOLIMAN, a data scientist specializing in machine learning, statistical analysis, and data visualization, creating impactful solutions to complex data problems.
            </p>
            
            <div className="mt-10 flex flex-wrap gap-4">
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
            </div>
          </motion.div>
        </div>
        
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
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
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                viewport={{ once: true }}
                className="group relative bg-background rounded-lg overflow-hidden border border-border hover-lift"
              >
                <div className="aspect-video bg-muted/30 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-muted-foreground">
                    {project.icon}
                  </div>
                </div>
                
                <div className="p-6">
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tags.map(tag => (
                      <span key={tag} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">{tag}</span>
                    ))}
                  </div>
                  
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
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
          </div>
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
          
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-6">
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
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.05 }}
                viewport={{ once: true }}
                className="flex flex-col items-center justify-center p-6 bg-secondary/30 rounded-lg border border-border hover-expand"
              >
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-3">
                  {skill.icon}
                </div>
                <h3 className="text-center font-medium">{skill.name}</h3>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Call to Action */}
      <section className="py-24 px-4 md:px-8 lg:px-16 bg-primary/5">
        <div className="container mx-auto">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">Let's collaborate on data-driven solutions</h2>
            <p className="text-lg text-muted-foreground mb-10">
              I'm always open to discussing new data science projects, research collaborations, or opportunities to be part of your data analytics vision.
            </p>
            
            <Button asChild size="lg" className="group">
              <Link to="/contact">
                Get in Touch
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
