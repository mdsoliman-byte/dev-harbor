import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Github, ExternalLink } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination';
import { fetchProjectData } from '@/services/api';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
  const projectsPerPage = 6;
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    const loadProjects = async () => {
      try {
        setIsLoading(true);
        const data = await fetchProjectData();
        console.log('Fetched projects:', data); // Log the fetched data
        setProjects(data || []); // Ensure projects is always an array
      } catch (err) {
        setError('Failed to load projects. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    loadProjects();
  }, []);

  if (isLoading) {
    return <div className="text-center py-16">Loading projects...</div>;
  }

  if (error) {
    return <div className="text-center py-16 text-red-500">{error}</div>;
  }

  if (projects.length === 0) {
    return <div className="text-center py-16">No projects found.</div>;
  }

  // Calculate indexes for pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);
    // Filter Project by category
  const filteredproject = selectedCategory === "All"
  ? currentProjects
  : currentProjects.filter(project => project.category === selectedCategory);

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }
// Extract unique categories for filtering
const categories = ["All", ...Array.from(new Set(currentProjects.map(project => project.category)))];

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
           <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
                        {["All", "Programming", "Design", "Data Science"].map(cat => (
                          <Button
                            key={cat}
                            variant={selectedCategory === cat ? "default" : "outline"}
                            size="sm"
                            onClick={() => {
                              setSelectedCategory(cat);
                              setCurrentPage(1);
                            }}
                          >
                            {cat}
                          </Button>
                        ))}
                      </div>
          <p className="text-lg text-muted-foreground">
            A collection of my recent projects spanning web development, mobile applications, and UI/UX design. 
            Each project represents a unique challenge and solution.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {currentProjects.map((project, index) => (
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
                  {project.tags?.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                  {project.tags?.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium bg-secondary/20 text-secondary-foreground rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{project.title.length > 60 ? `${project.title.slice(0, 60)}...` : project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {/* {project.description} */}
                  {project.long_description.length > 200 ? `${project.long_description.slice(0, 200)}...` : project.description}
                </p>
                
                <div className="flex items-center justify-between mt-4">
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
                    <Link to={`/projects/${project.slug}`}>
                    <Button variant="ghost" size="sm">
                      Details
                    </Button>
                    </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
        
        {/* Pagination */}
        <div className="mt-16">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
              
              {/* First page */}
              {currentPage > 2 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setCurrentPage(1)}>
                    1
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis if needed */}
              {currentPage > 3 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              {/* Previous page if not on first page */}
              {currentPage > 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setCurrentPage(currentPage - 1)}>
                    {currentPage - 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {/* Current page */}
              <PaginationItem>
                <PaginationLink isActive onClick={() => setCurrentPage(currentPage)}>
                  {currentPage}
                </PaginationLink>
              </PaginationItem>
              
              {/* Next page if not on last page */}
              {currentPage < totalPages && (
                <PaginationItem>
                  <PaginationLink onClick={() => setCurrentPage(currentPage + 1)}>
                    {currentPage + 1}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              {/* Ellipsis if needed */}
              {currentPage < totalPages - 2 && (
                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>
              )}
              
              {/* Last page if not already showing */}
              {currentPage < totalPages - 1 && (
                <PaginationItem>
                  <PaginationLink onClick={() => setCurrentPage(totalPages)}>
                    {totalPages}
                  </PaginationLink>
                </PaginationItem>
              )}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
};

export default ProjectsPage;
