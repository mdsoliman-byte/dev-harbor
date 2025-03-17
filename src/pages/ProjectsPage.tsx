
import { useState } from 'react';
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

export const projects = [
  {
    id: 1,
    title: 'E-Commerce Platform',
    description: 'A full-featured e-commerce platform with product listings, shopping cart, and secure checkout.',
    image: 'https://images.unsplash.com/photo-1523474438810-b04a2480633c?auto=format&fit=crop&q=80&w=1470',
    tags: ['React', 'Node.js', 'MongoDB', 'Stripe'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This comprehensive e-commerce solution provides businesses with everything they need to sell products online. Built with a React frontend and Node.js backend, it features a responsive design, product search and filtering, user authentication, shopping cart functionality, and Stripe payment integration.

The platform includes an admin dashboard for inventory management, order processing, and customer data analysis. MongoDB is used for data storage, providing flexibility for different product types and categories.

Key features include:
• Responsive product catalog with search and filtering
• User account management and order history
• Shopping cart with persistent storage
• Secure checkout with Stripe integration
• Admin dashboard for inventory and order management
• Analytics dashboard with sales reports`
  },
  {
    id: 2,
    title: 'Task Management App',
    description: 'A task management application with drag-and-drop interface, task prioritization, and team collaboration.',
    image: 'https://images.unsplash.com/photo-1507237998346-2d57dd271e4e?auto=format&fit=crop&q=80&w=1470',
    tags: ['TypeScript', 'React', 'Firebase', 'TailwindCSS'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This task management application helps teams organize and track their work efficiently. Built with TypeScript and React, it features a drag-and-drop interface for easy task management, real-time updates via Firebase, and a clean UI designed with TailwindCSS.

Users can create boards for different projects, add tasks with detailed descriptions, assign them to team members, set due dates, and track progress. The app supports real-time collaboration, allowing team members to see updates instantaneously.

Key features include:
• Kanban-style boards with customizable columns
• Drag-and-drop task management
• Task prioritization and labeling
• Due date tracking with notifications
• Real-time collaboration
• User permissions and role management
• Mobile-responsive design`
  },
  {
    id: 3,
    title: 'Weather Dashboard',
    description: 'A weather dashboard that displays current conditions and forecasts for multiple locations.',
    image: 'https://images.unsplash.com/photo-1562155847-e150f85cdd6a?auto=format&fit=crop&q=80&w=1471',
    tags: ['JavaScript', 'React', 'API Integration', 'ChartJS'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This weather dashboard provides real-time weather data and forecasts for locations worldwide. Built with React and JavaScript, it integrates with multiple weather APIs to provide comprehensive data and uses ChartJS for data visualization.

Users can search for locations, save favorites, and view detailed weather information including temperature, humidity, wind speed, UV index, and precipitation forecasts. The dashboard includes interactive charts showing temperature and precipitation trends over time.

Key features include:
• Location-based weather data
• 7-day forecast with detailed information
• Interactive charts for data visualization
• Saved locations for quick access
• Weather alerts and notifications
• Responsive design for all devices
• Dark mode support`
  },
  {
    id: 4,
    title: 'Portfolio Website',
    description: 'A personal portfolio website showcasing projects, skills, and contact information.',
    image: 'https://images.unsplash.com/photo-1545239351-ceb31cf33ff8?auto=format&fit=crop&q=80&w=1470',
    tags: ['React', 'TailwindCSS', 'Framer Motion'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This portfolio website showcases my work, skills, and experience in a modern, interactive format. Built with React and styled with TailwindCSS, it features smooth animations powered by Framer Motion for an engaging user experience.

The site includes sections for featured projects, skills, experience, and contact information. Each project has its own detailed page with descriptions, images, and links to live demos and repositories.

Key features include:
• Modern, responsive design
• Interactive UI with smooth animations
• Detailed project showcases
• Skills and experience sections
• Contact form with validation
• Dark/light mode toggle
• SEO optimization`
  },
  {
    id: 5,
    title: 'Booking Platform',
    description: 'A booking platform for scheduling appointments, managing availability, and sending notifications.',
    image: 'https://images.unsplash.com/photo-1529119513315-c7c361862fc7?auto=format&fit=crop&q=80&w=1470',
    tags: ['Next.js', 'TypeScript', 'PostgreSQL', 'Auth0'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This booking platform simplifies appointment scheduling for service-based businesses. Built with Next.js and TypeScript, it features a clean, intuitive interface for both business owners and customers, with PostgreSQL for data storage and Auth0 for authentication.

Business owners can define their services, set availability, and manage bookings, while customers can easily book appointments, receive confirmations, and manage their bookings. The platform includes automated notifications for appointment reminders and updates.

Key features include:
• Calendar-based availability management
• Service and pricing configuration
• Customer self-service booking
• Automated email/SMS notifications
• Payment processing integration
• Admin dashboard with analytics
• User account management`
  },
  {
    id: 6,
    title: 'Recipe App',
    description: 'A recipe application with search, filtering, and user-generated content.',
    image: 'https://images.unsplash.com/photo-1515378960530-7c0da6231fb1?auto=format&fit=crop&q=80&w=1470',
    tags: ['React Native', 'GraphQL', 'Apollo', 'MongoDB'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This recipe application helps users discover, save, and share recipes. Built with React Native for cross-platform mobile support, it uses GraphQL and Apollo for efficient data fetching and MongoDB for data storage.

Users can browse recipes by category, search with filters for ingredients or dietary restrictions, save favorites, and create shopping lists. The app also supports user-generated content, allowing users to share their own recipes with the community.

Key features include:
• Extensive recipe database with search and filtering
• User accounts for saving favorites and creating collections
• User-generated content with moderation
• Shopping list generation from recipes
• Meal planning calendar
• Offline access to saved recipes
• Cross-platform support (iOS and Android)`
  },
  {
    id: 7,
    title: 'AI Content Generator',
    description: 'An AI-powered tool that generates various types of content including blog posts, social media captions, and marketing copy.',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1932',
    tags: ['OpenAI', 'React', 'Node.js', 'Express'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This AI-powered content generator helps marketers, bloggers, and social media managers create high-quality content quickly. Built with React and Node.js, it leverages OpenAI's GPT models to generate various types of content based on user prompts and parameters.

Users can specify content type, tone, length, and key points, and the tool generates tailored content that can be edited and exported. The application includes templates for common content types and allows users to save and organize their generated content.

Key features include:
• Multiple content type generation (blog posts, social media, emails)
• Customizable parameters for tone and style
• Content editing and formatting tools
• Template library for quick starts
• Export to various formats
• Content history and organization
• Usage analytics and suggestions`
  },
  {
    id: 8,
    title: 'Fitness Tracking App',
    description: 'A comprehensive fitness application for tracking workouts, setting goals, and monitoring progress.',
    image: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80&w=1470',
    tags: ['Flutter', 'Firebase', 'HealthKit', 'Google Fit'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This fitness tracking application helps users monitor their workouts, set fitness goals, and track their progress over time. Built with Flutter for cross-platform support, it integrates with health platforms like Apple HealthKit and Google Fit for comprehensive data collection.

Users can log various types of workouts, track metrics like heart rate and calories burned, set goals, and view progress charts. The app includes workout plans and tutorial videos for different fitness levels.

Key features include:
• Workout logging with detailed metrics
• Integration with wearable devices
• Custom workout plan creation
• Progress tracking with visual charts
• Goal setting and achievements
• Social sharing and community features
• Personalized recommendations based on activity`
  },
  {
    id: 9,
    title: 'Real Estate Marketplace',
    description: 'A platform for buying, selling, and renting properties with advanced search and virtual tours.',
    image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&q=80&w=1473',
    tags: ['Next.js', 'MongoDB', 'Google Maps API', 'AWS S3'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This real estate marketplace connects property buyers, sellers, and renters in a user-friendly platform. Built with Next.js and MongoDB, it features advanced search capabilities, interactive maps using Google Maps API, and media storage with AWS S3.

Users can list properties with detailed descriptions and media, search based on various criteria, schedule viewings, and contact property owners or agents. The platform includes virtual tour functionality and neighborhood information for comprehensive property research.

Key features include:
• Advanced property search with multiple filters
• Interactive map-based property browsing
• Virtual property tours and 3D models
• Property comparison tools
• Saved searches with notifications
• Agent and agency profiles
• Mortgage calculator and affordability tools`
  },
  {
    id: 10,
    title: 'Language Learning Platform',
    description: 'An interactive platform for learning languages through lessons, exercises, and conversation practice.',
    image: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?auto=format&fit=crop&q=80&w=1471',
    tags: ['Vue.js', 'Express', 'MongoDB', 'WebRTC'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This language learning platform helps users master new languages through structured lessons, interactive exercises, and conversation practice. Built with Vue.js, Express, and MongoDB, it offers a comprehensive learning experience with progress tracking and personalized feedback.

The platform includes modules for vocabulary, grammar, reading, writing, listening, and speaking, with difficulty levels from beginner to advanced. Users can practice conversation skills with other learners using WebRTC for real-time video chat.

Key features include:
• Structured lessons for multiple languages
• Interactive exercises with immediate feedback
• Speech recognition for pronunciation practice
• Vocabulary flashcards with spaced repetition
• Peer-to-peer conversation practice
• Progress tracking and skill assessment
• Gamification elements for motivation`
  },
  {
    id: 11,
    title: 'Finance Management Dashboard',
    description: 'A comprehensive financial dashboard for tracking expenses, investments, and financial goals.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1415',
    tags: ['React', 'Redux', 'Node.js', 'D3.js'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This financial management dashboard helps users track their finances, analyze spending patterns, and work toward financial goals. Built with React and Redux for state management, it uses D3.js for data visualization and connects to various financial institutions via secure APIs.

Users can link bank accounts, credit cards, and investment accounts to get a complete view of their financial situation. The dashboard categorizes transactions, generates spending reports, and provides insights for better financial decision-making.

Key features include:
• Account aggregation from multiple sources
• Automated transaction categorization
• Budget creation and tracking
• Investment portfolio analysis
• Financial goal setting and monitoring
• Bill payment reminders
• Tax preparation assistance`
  },
  {
    id: 12,
    title: 'Social Media Analytics Tool',
    description: 'A tool for analyzing social media performance across platforms, tracking engagement, and planning content.',
    image: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?auto=format&fit=crop&q=80&w=1374',
    tags: ['React', 'Python', 'Flask', 'PostgreSQL'],
    githubUrl: '#',
    liveUrl: '#',
    fullDescription: `This social media analytics tool helps businesses and content creators measure and optimize their social media performance. Built with a React frontend and Python/Flask backend, it integrates with multiple social media platforms to provide comprehensive analytics in a unified dashboard.

Users can track metrics across platforms, analyze engagement patterns, identify top-performing content, and plan future posts with a content calendar. The tool includes competitor analysis features and generates detailed reports for stakeholder presentations.

Key features include:
• Cross-platform social media metrics
• Engagement and reach analytics
• Audience demographic insights
• Content performance analysis
• Competitor benchmarking
• Scheduled reporting and alerts
• Content calendar and planning tools`
  }
];

const ProjectsPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const projectsPerPage = 6;
  
  // Calculate indexes for pagination
  const indexOfLastProject = currentPage * projectsPerPage;
  const indexOfFirstProject = indexOfLastProject - projectsPerPage;
  const currentProjects = projects.slice(indexOfFirstProject, indexOfLastProject);
  const totalPages = Math.ceil(projects.length / projectsPerPage);
  
  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

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
                  {project.tags.slice(0, 3).map(tag => (
                    <span key={tag} className="px-2 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full">
                      {tag}
                    </span>
                  ))}
                  {project.tags.length > 3 && (
                    <span className="px-2 py-1 text-xs font-medium bg-secondary/20 text-secondary-foreground rounded-full">
                      +{project.tags.length - 3}
                    </span>
                  )}
                </div>
                
                <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                <p className="text-muted-foreground text-sm mb-4">
                  {project.description}
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
                  <Link to={`/projects/${project.id}`}>
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
