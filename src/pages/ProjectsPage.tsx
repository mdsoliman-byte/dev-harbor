
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';

const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product listings, shopping cart, and secure checkout.',
    image: 'https://images.unsplash.com/photo-1523474438810-b04a2480633c?auto=format&fit=crop&q=80&w=1470',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A task management application with drag-and-drop interface, task prioritization, and team collaboration.',
    image: 'https://images.unsplash.com/photo-1507237998346-2d57dd271e4e?auto=format&fit=crop&q=80&w=1470',
    tags: ['TypeScript', 'React', 'Firebase', 'TailwindCSS'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A weather dashboard that displays current conditions and forecasts for multiple locations.',
    image: 'https://images.unsplash.com/photo-1562155847-e150f85cdd6a?auto=format&fit=crop&q=80&w=1471',
    tags: ['JavaScript', 'React', 'API Integration', 'ChartJS'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing projects, skills, and contact information.',
    image: 'https://images.unsplash.com/photo-1545239351-ceb31cf33ff8?auto=format&fit=crop&q=80&w=1470',
    tags: ['React', 'TailwindCSS', 'Framer Motion'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 5,
    title: 'Booking Platform',
    description: 'A booking platform for scheduling appointments, managing availability, and sending notifications.',
    image: 'https://images.unsplash.com/photo-1529119513315-c7c361862fc7?auto=format&fit=crop&q=80&w=1470',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Auth0'],
    githubUrl: '#',
    liveUrl: '#'
  },
  {
    id: 6,
    title: 'Recipe App',
    description: 'A recipe application with search, filtering, and user-generated content.',
    image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=1470',
    tags: ['React Native', 'GraphQL', 'Apollo', 'MongoDB'],
    githubUrl: '#',
    liveUrl: '#'
  }
];

const ProjectsPage = () => {
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Projects</h1>
          <p className="text-lg text-muted-foreground">
            A collection of my recent projects spanning web development, mobile applications, and UI/UX design. 
            Each project represents a unique challenge and solution.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div 
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative bg-background rounded-lg overflow-hidden border border-border hover-lift"
            >
              <div className="aspect-video bg-muted/30 relative overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
                </p>
                
                <div className="flex items-center space-x-4">
                  <a 
                    href={project.githubUrl} 
                    className="text-sm font-medium hover-underline inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Github className="mr-1 h-4 w-4" />
                    GitHub
                  </a>
                  <a 
                    href={project.liveUrl} 
                    className="text-sm font-medium hover-underline inline-flex items-center"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="mr-1 h-4 w-4" />
                    Live Demo
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
