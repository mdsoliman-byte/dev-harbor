
import { motion } from 'framer-motion';
import { CalendarDays, Clock, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const blogPosts = [
  {
    id: 1,
    title: 'Creating Accessible Web Applications',
    excerpt: 'Exploring the importance of accessibility in modern web development and practical steps to implement it.',
    date: 'October 15, 2023',
    readTime: '5 min read',
    category: 'Accessibility',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 2,
    title: 'The Future of React: What's Coming in React 19',
    excerpt: 'A deep dive into the upcoming features and improvements planned for React 19.',
    date: 'September 28, 2023',
    readTime: '8 min read',
    category: 'React',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 3,
    title: 'Optimizing Performance in JavaScript Applications',
    excerpt: 'Strategies and techniques to improve the performance of JavaScript-heavy web applications.',
    date: 'September 10, 2023',
    readTime: '6 min read',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 4,
    title: 'Building Responsive UIs with TailwindCSS',
    excerpt: 'A comprehensive guide to creating responsive and adaptive user interfaces using TailwindCSS.',
    date: 'August 22, 2023',
    readTime: '7 min read',
    category: 'CSS',
    image: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 5,
    title: 'Getting Started with TypeScript in 2023',
    excerpt: 'A beginner-friendly introduction to TypeScript for JavaScript developers.',
    date: 'August 5, 2023',
    readTime: '10 min read',
    category: 'TypeScript',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1470'
  },
  {
    id: 6,
    title: 'The Art of Clean Code: Best Practices for Maintainability',
    excerpt: 'Principles and practices for writing clean, maintainable code that stands the test of time.',
    date: 'July 18, 2023',
    readTime: '9 min read',
    category: 'Best Practices',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=1470'
  }
];

const categories = [
  'All', 'React', 'JavaScript', 'TypeScript', 'CSS', 'Performance', 'Accessibility', 'Best Practices'
];

const BlogPage = () => {
  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Thoughts, insights, and tutorials on web development, design, and technology.
            I write about my experiences, learnings, and the latest trends in the industry.
          </p>
        </motion.div>
        
        {/* Categories Filter */}
        <div className="mb-12 overflow-x-auto scrollbar-hidden">
          <div className="flex space-x-2 pb-4">
            {categories.map((category, index) => (
              <motion.button
                key={category}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className={`px-4 py-2 rounded-full text-sm font-medium ${
                  category === 'All' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-foreground'
                } transition-colors whitespace-nowrap`}
              >
                {category}
              </motion.button>
            ))}
          </div>
        </div>
        
        {/* Featured Post */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="relative rounded-xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
            
            <img 
              src="https://images.unsplash.com/photo-1569748130764-3fed0c102c59?auto=format&fit=crop&q=80&w=1470" 
              alt="Featured post" 
              className="w-full h-[500px] object-cover"
            />
            
            <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
              <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
                Featured
              </span>
              
              <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-3">
                The Evolution of Frontend Development: Past, Present, and Future
              </h2>
              
              <p className="text-white/80 mb-6 max-w-3xl">
                A comprehensive look at how frontend development has evolved over the years, current best practices, and what the future might hold.
              </p>
              
              <div className="flex items-center text-white/70 text-sm space-x-4">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  <span>October 24, 2023</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  <span>12 min read</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
        
        {/* Blog Posts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post, index) => (
            <motion.article 
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background rounded-lg overflow-hidden border border-border hover-lift"
            >
              <div className="aspect-video relative overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center text-muted-foreground text-sm space-x-4 mb-4">
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{post.date}</span>
                  </div>
                  
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{post.readTime}</span>
                  </div>
                </div>
                
                <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                  {post.title}
                </h3>
                
                <p className="text-muted-foreground text-sm mb-4">
                  {post.excerpt}
                </p>
                
                <Link to={`/blog/${post.id}`} className="inline-flex items-center text-sm font-medium hover-underline">
                  Read More
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
        
        {/* Newsletter */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-20 bg-secondary/50 rounded-xl p-8 md:p-12"
        >
          <div className="max-w-3xl mx-auto text-center">
            <h3 className="text-2xl md:text-3xl font-display font-bold mb-4">
              Subscribe to my newsletter
            </h3>
            
            <p className="text-muted-foreground mb-8">
              Get notified when I publish new articles. No spam, just quality content.
            </p>
            
            <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
              <button 
                type="submit" 
                className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Subscribe
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default BlogPage;
