
import { User, Briefcase, BookOpen, MapPin, Mail, Calendar } from 'lucide-react';
import { motion } from 'framer-motion';

const ProfileSection = () => {
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
  );
};

export default ProfileSection;
