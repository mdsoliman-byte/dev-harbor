
import { motion } from 'framer-motion';
import { Github, Twitter, Linkedin, Mail, ExternalLink, PenTool, Database, BarChart, Terminal } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { useTheme } from '@/components/ThemeProvider';

const AboutPage = () => {
  const { theme } = useTheme();
  
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
                  src="/lovable-uploads/cdd6811a-1348-4f55-8abd-db74cf1f1ad7.png" 
                  alt="MD SOLIMAN"
                  className="w-full h-full object-cover"
                />
              </div>
              
              <h1 className="text-3xl font-display font-bold mb-2">MD SOLIMAN</h1>
              <p className="text-lg text-muted-foreground mb-6">Data Scientist & Programmer</p>
              
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
                  href="mailto:contact@mdsoliman.com" 
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
                  Hello! I'm MD SOLIMAN, a passionate data scientist with extensive expertise in Python and R programming.
                  I specialize in developing data-driven solutions that transform complex datasets into actionable insights and
                  predictive models.
                </p>
                <p>
                  My professional journey began with a strong foundation in statistics and computational methods,
                  which I've since expanded into developing advanced machine learning models and data visualization tools.
                  I'm particularly interested in the intersection of data science and real-world problem-solving.
                </p>
                <p>
                  I believe that effective data science goes beyond technical implementation—it's about asking the right questions,
                  understanding the domain, and communicating insights in ways that drive meaningful decisions. This philosophy
                  guides my approach to every project I undertake.
                </p>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">Experience</h2>
              <div className="space-y-8">
                <div className="border-l-2 border-border pl-5 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <h3 className="text-xl font-semibold">Senior Data Scientist</h3>
                  <p className="text-primary font-medium mb-1">DataTech Solutions</p>
                  <p className="text-sm text-muted-foreground mb-3">Jan 2021 - Present</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Lead a team of data scientists in developing predictive analytics models for financial services</li>
                    <li>Designed and implemented machine learning pipelines that improved forecast accuracy by 35%</li>
                    <li>Created data visualization dashboards for executive decision-making</li>
                    <li>Mentored junior data scientists and conducted code reviews for Python and R projects</li>
                  </ul>
                </div>
                
                <div className="border-l-2 border-border pl-5 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <h3 className="text-xl font-semibold">Data Scientist</h3>
                  <p className="text-primary font-medium mb-1">Analytics Innovations</p>
                  <p className="text-sm text-muted-foreground mb-3">Mar 2019 - Dec 2020</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Developed statistical models and machine learning algorithms for client projects</li>
                    <li>Built ETL pipelines and automated data processing workflows using Python</li>
                    <li>Conducted exploratory data analysis and feature engineering on diverse datasets</li>
                    <li>Created reproducible research reports using R Markdown and Jupyter Notebooks</li>
                  </ul>
                </div>
                
                <div className="border-l-2 border-border pl-5 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <h3 className="text-xl font-semibold">Data Analyst</h3>
                  <p className="text-primary font-medium mb-1">Research Institute</p>
                  <p className="text-sm text-muted-foreground mb-3">Jun 2017 - Feb 2019</p>
                  <ul className="list-disc list-inside text-muted-foreground space-y-2">
                    <li>Analyzed research data using statistical methods and visualization techniques</li>
                    <li>Developed R scripts for data cleaning and preliminary analysis</li>
                    <li>Assisted in designing experimental studies and survey methodologies</li>
                    <li>Created data visualizations and statistical reports for publication</li>
                  </ul>
                </div>
              </div>
            </section>
            
            <section className="mb-12">
              <h2 className="text-2xl font-display font-bold mb-6">Education</h2>
              <div className="space-y-8">
                <div className="border-l-2 border-border pl-5 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <h3 className="text-xl font-semibold">Master of Science in Data Science</h3>
                  <p className="text-primary font-medium mb-1">University of Data Analytics</p>
                  <p className="text-sm text-muted-foreground mb-3">2015 - 2017</p>
                  <p className="text-muted-foreground">
                    Graduated with distinction. Specialized in machine learning algorithms and statistical computing.
                  </p>
                </div>
                
                <div className="border-l-2 border-border pl-5 relative">
                  <div className="absolute w-3 h-3 bg-primary rounded-full -left-[7px] top-1" />
                  <h3 className="text-xl font-semibold">Bachelor of Science in Computer Science</h3>
                  <p className="text-primary font-medium mb-1">Technical University</p>
                  <p className="text-sm text-muted-foreground mb-3">2011 - 2015</p>
                  <p className="text-muted-foreground">
                    Graduated with honors. Focus on computational methods and programming.
                  </p>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-display font-bold mb-6">Interests & Specializations</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-secondary/30 rounded-lg p-5 border border-border">
                  <h3 className="font-semibold mb-2">Machine Learning & AI</h3>
                  <p className="text-sm text-muted-foreground">
                    I specialize in developing predictive models, natural language processing, and computer vision solutions using Python frameworks like TensorFlow and PyTorch.
                  </p>
                </div>
                
                <div className="bg-secondary/30 rounded-lg p-5 border border-border">
                  <h3 className="font-semibold mb-2">Statistical Analysis</h3>
                  <p className="text-sm text-muted-foreground">
                    Expert in statistical methods, hypothesis testing, and experimental design using R, SciPy, and StatsModels.
                  </p>
                </div>
                
                <div className="bg-secondary/30 rounded-lg p-5 border border-border">
                  <h3 className="font-semibold mb-2">Data Visualization</h3>
                  <p className="text-sm text-muted-foreground">
                    Creating insightful visualizations using tools like Matplotlib, Seaborn, ggplot2, Tableau, and D3.js.
                  </p>
                </div>
                
                <div className="bg-secondary/30 rounded-lg p-5 border border-border">
                  <h3 className="font-semibold mb-2">Big Data Technologies</h3>
                  <p className="text-sm text-muted-foreground">
                    Experience with Hadoop, Spark, and cloud-based data solutions on AWS and Google Cloud Platform.
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
