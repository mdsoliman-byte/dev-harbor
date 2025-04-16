import { useParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { fetchProjectBySlug, Project } from '@/services/api/projects';
import { useQuery } from '@tanstack/react-query';
import { ExternalLink, Calendar } from 'lucide-react';
import { format } from 'date-fns';

const ProjectDetailPage = () => {
  const { slug } = useParams<{ slug: string }>();
  
  const { data: project, isLoading } = useQuery<Project>({
    queryKey: ['project', slug],
    queryFn: () => fetchProjectBySlug(slug || '')
  });
  
  if (isLoading || !project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto py-12 px-4 md:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <div className="mb-8">
          <h1 className="text-3xl font-bold font-display mb-4">{project.title}</h1>
          <p className="text-muted-foreground">
            <Calendar className="inline-block h-4 w-4 mr-1" />
            {format(new Date(project.start_date), 'MMMM yyyy')} - {project.end_date ? format(new Date(project.end_date), 'MMMM yyyy') : 'Present'}
          </p>
        </div>

        <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden mb-6">
          <img
            src={project.image}
            alt={project.title}
            className="object-cover w-full h-full"
          />
        </div>

        <div className="space-y-4 text-muted-foreground mb-8">
          <p>{project.long_description}</p>
        </div>

        {project.url && (
          <Button asChild variant="outline" size="lg">
            <a href={project.url} target="_blank" rel="noopener noreferrer">
              View Project <ExternalLink className="h-4 w-4 ml-2" />
            </a>
          </Button>
        )}
      </motion.div>
    </div>
  );
};

export default ProjectDetailPage;
