import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProjectById, Project } from '@/services/api/projects';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { ExternalLink, Calendar, Tag, ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';

const ProjectDetailPage = () => {
    const { id } = useParams<{ id: string }>();

    const { data: project, isLoading, error } = useQuery<Project>(
        ['project', id],
        () => fetchProjectById(Number(id)),
        {
            enabled: !!id,
        }
    );

    useEffect(() => {
        if (error) {
            console.error('Error fetching project:', error);
        }
    }, [error]);

    if (isLoading) {
        return (
            <div className="container mx-auto p-4">
                <div className="space-y-4">
                    <Skeleton className="h-10 w-3/4" />
                    <Skeleton className="h-4 w-1/2" />
                    <Skeleton className="h-64 w-full" />
                    <div className="flex gap-4">
                        <Skeleton className="h-8 w-20" />
                        <Skeleton className="h-8 w-20" />
                    </div>
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                </div>
            </div>
        );
    }

    if (error || !project) {
        return (
            <div className="container mx-auto p-4">
                <div className="text-red-500">Failed to load project details. Please check the ID or try again later.</div>
            </div>
        );
    }

    return (
        <motion.div
            className="container mx-auto p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
        >
            <Button asChild variant="ghost" className="mb-4">
                <Link to="/projects" className="flex items-center">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Back to Projects
                </Link>
            </Button>
            <h1 className="text-3xl font-bold mb-2">{project.title}</h1>
            <p className="text-muted-foreground mb-4">{project.short_description}</p>

            <img src={project.image} alt={project.title} className="w-full rounded-md mb-4" />

            <div className="flex flex-wrap gap-2 mb-4">
                {project.project_categories.map((category) => (
                    <div key={category.id} className="inline-flex items-center rounded-full border px-3 py-0.5 text-sm font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none border-border bg-secondary text-secondary-foreground">
                        <Tag className="mr-1 h-3 w-3" />
                        {category.name}
                    </div>
                ))}
            </div>

            <div className="flex items-center space-x-2 text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                <span>{new Date(project.start_date).toLocaleDateString()} - {project.end_date ? new Date(project.end_date).toLocaleDateString() : 'Present'}</span>
            </div>

            <div className="space-y-4">
                <div dangerouslySetInnerHTML={{ __html: project.long_description }} />
            </div>

            {project.url && (
                <Button asChild variant="outline" className="mt-6">
                    <a href={project.url} target="_blank" rel="noopener noreferrer" className="flex items-center">
                        View Project
                        <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                </Button>
            )}
        </motion.div>
    );
};

export default ProjectDetailPage;
