
import { useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { projects } from './ProjectsPage';
import { Card, CardContent } from '@/components/ui/card';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  
  const project = projects.find(p => p.id === Number(id));
  
  useEffect(() => {
    if (!project) {
      navigate('/projects', { replace: true });
    }
  }, [project, navigate]);
  
  if (!project) return null;
  
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto max-w-5xl">
        <Link to="/projects" className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8">
          <ChevronLeft className="h-4 w-4 mr-2" />
          Back to Projects
        </Link>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="aspect-video rounded-xl overflow-hidden mb-8">
            <img 
              src={project.image} 
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map(tag => (
              <span key={tag} className="px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full">
                {tag}
              </span>
            ))}
          </div>
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 mb-12">
            <a 
              href={project.githubUrl} 
              className="inline-flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline">
                <Github className="h-4 w-4 mr-2" />
                View on GitHub
              </Button>
            </a>
            <a 
              href={project.liveUrl} 
              className="inline-flex items-center gap-2"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button>
                <ExternalLink className="h-4 w-4 mr-2" />
                Live Demo
              </Button>
            </a>
          </div>
          
          <Card className="glass-panel">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
              <div className="prose prose-lg dark:prose-invert">
                {project.fullDescription.split('\n\n').map((paragraph, idx) => (
                  <p key={idx} className="text-muted-foreground mb-4">
                    {paragraph}
                  </p>
                ))}
              </div>
            </CardContent>
          </Card>
          
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects
              .filter(p => p.id !== project.id)
              .slice(0, 2)
              .map(relatedProject => (
                <Link key={relatedProject.id} to={`/projects/${relatedProject.id}`}>
                  <Card className="hover-lift h-full">
                    <div className="aspect-video overflow-hidden rounded-t-lg">
                      <img 
                        src={relatedProject.image} 
                        alt={relatedProject.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-semibold mb-2">{relatedProject.title}</h3>
                      <p className="text-muted-foreground text-sm">
                        {relatedProject.description}
                      </p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
