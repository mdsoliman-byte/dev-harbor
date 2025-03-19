
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from '@/components/ui/pagination';
import { useIsMobile } from '@/hooks/use-mobile';

// Blog data
const blogs = [
  {
    id: 1,
    title: 'Introduction to Data Science with Python',
    excerpt: 'Learn the fundamentals of data science using Python, from data cleaning to visualization.',
    date: 'June 15, 2023',
    category: 'Python',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 2,
    title: 'Advanced Statistical Analysis in R',
    excerpt: 'Explore advanced statistical techniques using R for complex data analysis tasks.',
    date: 'July 8, 2023',
    category: 'R',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 3,
    title: 'Building Machine Learning Models for Prediction',
    excerpt: 'A step-by-step guide to building reliable machine learning models for predictive analytics.',
    date: 'August 22, 2023',
    category: 'Machine Learning',
    image: 'https://images.unsplash.com/photo-1599598177991-ec67b5c37318?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 4,
    title: 'Data Visualization Techniques for Insights',
    excerpt: 'How to create effective data visualizations that communicate insights clearly and accurately.',
    date: 'September 14, 2023',
    category: 'Visualization',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 5,
    title: 'SQL for Data Scientists and Analysts',
    excerpt: 'Master SQL queries and database operations essential for data science and analysis workflows.',
    date: 'October 3, 2023',
    category: 'SQL',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 6,
    title: 'Feature Engineering for Machine Learning',
    excerpt: 'Learn essential feature engineering techniques to improve your machine learning models.',
    date: 'October 29, 2023',
    category: 'Machine Learning',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 7,
    title: 'Time Series Analysis in Python',
    excerpt: 'Techniques and approaches for analyzing time series data using Python libraries.',
    date: 'November 15, 2023',
    category: 'Python',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 8,
    title: 'Deep Learning Applications in Data Science',
    excerpt: 'Exploring practical applications of deep learning in solving complex data science problems.',
    date: 'December 8, 2023',
    category: 'Machine Learning',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&q=80&w=1470'
  }
];

const ITEMS_PER_PAGE = 3;

const LatestBlogsSection = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const isMobile = useIsMobile();
  
  // Calculate pagination
  const totalPages = Math.ceil(blogs.length / ITEMS_PER_PAGE);
  const indexOfLastBlog = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstBlog = indexOfLastBlog - ITEMS_PER_PAGE;
  const currentBlogs = blogs.slice(indexOfFirstBlog, indexOfLastBlog);
  
  // Generate page numbers
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  // Animation variants
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section id="latest-blogs" className="py-24 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16">
          <div>
            <p className="text-sm font-medium text-primary mb-2">LATEST INSIGHTS</p>
            <h2 className="text-3xl md:text-4xl font-display font-bold">From The Blog</h2>
          </div>
          
          <Button asChild variant="ghost" className="group mt-4 md:mt-0">
            <Link to="/blog">
              View All Articles
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
          {currentBlogs.map((blog) => (
            <motion.div 
              key={blog.id}
              variants={fadeIn}
              className="group"
            >
              <Link to={`/blog/${blog.id}`} className="block h-full">
                <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative aspect-video overflow-hidden">
                    <img 
                      src={blog.image} 
                      alt={blog.title} 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                        {blog.category}
                      </span>
                    </div>
                  </div>
                  
                  <CardContent className="p-5">
                    <div className="flex items-center text-muted-foreground text-sm mb-3">
                      <CalendarDays className="h-4 w-4 mr-1" />
                      <span>{blog.date}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                      {blog.title}
                    </h3>
                    
                    <p className="text-muted-foreground text-sm line-clamp-2">
                      {blog.excerpt}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="mt-16">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious 
                  onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                  className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
              
              {!isMobile && pageNumbers.map((number) => (
                <PaginationItem key={number}>
                  <PaginationLink 
                    onClick={() => setCurrentPage(number)}
                    isActive={currentPage === number}
                    className="cursor-pointer"
                  >
                    {number}
                  </PaginationLink>
                </PaginationItem>
              ))}
              
              <PaginationItem>
                <PaginationNext 
                  onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                  className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </section>
  );
};

export default LatestBlogsSection;
