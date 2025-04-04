import { ArrowRight, Github, ExternalLink, BarChart, PenTool, Database } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchProjectData } from '@/services/api';

const ProjectsSection = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const loadProjects = async () => {
      const data = await fetchProjectData();
      const shuffled = data.sort(() => 0.5 - Math.random());
      setProjects(shuffled.slice(0, 6));
    };
    loadProjects();
  }, []);

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
          {projects.map((project, i) => (
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
                  {/* <BarChart className="h-6 w-6 text-primary" /> */}
                  <div className="aspect-video bg-muted/30 relative overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                </div>
              </div>

              <div className="p-6 relative z-10">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags?.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">{tag}</span>
                  ))}
                </div>

                <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors duration-300"> {project.title.length > 60 ? `${project.title.slice(0, 60)}...` : project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description.length > 200 ? `${project.description.slice(0, 200)}...` : project.description}
                </p>


                <div className="flex items-center space-x-4">
                  {project.github_url && (
                    <a href={project.github_url} className="text-sm font-medium hover-underline inline-flex items-center">
                      <Github className="mr-1 h-4 w-4" />
                      GitHub
                    </a>
                  )}
                  {project.live_demo_url && (
                    <a href={project.live_demo_url} className="text-sm font-medium hover-underline inline-flex items-center">
                      <ExternalLink className="mr-1 h-4 w-4" />
                      Live Demo
                    </a>
                  )}
                  <Link to={`/projects/${project.slug}`}>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                  </Link>
                </div>

              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ProjectsSection;
