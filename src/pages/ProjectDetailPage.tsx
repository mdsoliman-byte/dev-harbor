import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ChevronLeft, Github, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { fetchProjectData } from '@/services/api';
import { Card, CardContent } from '@/components/ui/card';

const ProjectDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);

  useEffect(() => {
    const loadProject = async () => {
      const data = await fetchProjectData();
      const selectedProject = data.find(p => p.id === Number(id));
      if (!selectedProject) {
        navigate('/projects', { replace: true });
      } else {
        setProject(selectedProject);
      }
    };
    loadProject();
  }, [id, navigate]);

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
          
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6">
            {project.title}
          </h1>
          
          <div className="flex flex-wrap gap-4 mb-12">
            {project.github_url && (
              <a 
                href={project.github_url} 
                className="inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline">
                  <Github className="h-4 w-4 mr-2" />
                  View on GitHub
                </Button>
              </a>
            )}
            {project.live_demo_url && (
              <a 
                href={project.live_demo_url} 
                className="inline-flex items-center gap-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button>
                  <ExternalLink className="h-4 w-4 mr-2" />
                  Live Demo
                </Button>
              </a>
            )}
          </div>
          
          <Card className="glass-panel">
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">About the Project</h2>
              <div className="prose prose-lg dark:prose-invert">
                {project.key_features.split('\n').map((feature, idx) => (
                  <p key={idx} className="text-muted-foreground mb-4">
                    {feature}
                  </p>
                ))}
              </div>
            </CardContent>
            <CardContent className="pt-6">
              <h2 className="text-2xl font-semibold mb-4">Project Description</h2>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-muted-foreground mb-4">
                  {project.description}
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;
