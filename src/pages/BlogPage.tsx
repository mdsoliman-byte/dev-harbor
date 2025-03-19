import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays, Clock, ChevronRight } from 'lucide-react';

import BlogCategories, { allBlogCategories } from '@/components/blog/BlogCategories';
import FeaturedPost from '@/components/blog/FeaturedPost';
import PopularArticlesSection, { popularArticles } from '@/components/blog/PopularArticlesSection';
import LatestArticlesSection, { latestArticles } from '@/components/blog/LatestArticlesSection';
import BlogPagination from '@/components/blog/BlogPagination';
import Newsletter from '@/components/blog/Newsletter';

export const blogPosts = [
  {
    id: 1,
    title: 'Creating Accessible Web Applications',
    excerpt: 'Exploring the importance of accessibility in modern web development and practical steps to implement it.',
    date: 'October 15, 2023',
    readTime: '5 min read',
    category: 'Accessibility',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=1470',
    content: `## Accessibility in Web Development

The web is meant to be accessible to everyone, regardless of their abilities or disabilities. Creating accessible web applications is not just a nice-to-have feature; it's a necessity.

### Why Accessibility Matters

Accessibility ensures that people with disabilities can perceive, understand, navigate, and interact with websites and tools. It also benefits people without disabilities, such as those using mobile devices or those with temporary limitations.

### Key WCAG Guidelines

The Web Content Accessibility Guidelines (WCAG) provide a set of recommendations for making web content more accessible. These guidelines are organized around four principles:

1. Perceivable: Information must be presentable to users in ways they can perceive.
2. Operable: User interface components must be operable by all users.
3. Understandable: Information and operation must be understandable.
4. Robust: Content must be robust enough to be interpreted by a wide variety of user agents, including assistive technologies.

### Practical Implementation Steps

\`\`\`javascript
// Example of accessible button with proper aria attributes
const AccessibleButton = () => {
  return (
    <button 
      aria-label="Close dialog"
      aria-pressed="false"
      onClick={handleClose}
    >
      <svg className="icon" {...props} />
      Close
    </button>
  );
};
\`\`\`

Remember that accessibility is not a one-time task but an ongoing process that should be integrated into your development workflow.`
  },
  {
    id: 2,
    title: 'The Future of React: What\'s Coming in React 19',
    excerpt: 'A deep dive into the upcoming features and improvements planned for React 19.',
    date: 'September 28, 2023',
    readTime: '8 min read',
    category: 'React',
    image: 'https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?auto=format&fit=crop&q=80&w=1470',
    content: `## The Future of React: React 19 Preview

React has been evolving rapidly, and the upcoming React 19 release promises to bring exciting improvements and new features to the popular JavaScript library.

### Performance Improvements

React 19 focuses heavily on performance optimization, with a particular emphasis on reducing bundle sizes and improving rendering speed.

### New Concurrent Features

Building upon the foundations laid in React 18, React 19 is expected to expand concurrent rendering capabilities, making applications even more responsive.

### Enhanced Server Components

Server Components will see significant improvements in React 19, with better integration and more streamlined APIs.

### Code Example: Using React 19 Features

\`\`\`jsx
// Example using new React 19 API (hypothetical)
function MyComponent() {
  const data = use(fetchData());
  
  return (
    <div>
      <h1>{data.title}</h1>
      <p>{data.description}</p>
    </div>
  );
}
\`\`\`

These advancements will make React even more powerful and developer-friendly, further cementing its position as one of the leading frontend libraries.`
  },
  {
    id: 3,
    title: 'Optimizing Performance in JavaScript Applications',
    excerpt: 'Strategies and techniques to improve the performance of JavaScript-heavy web applications.',
    date: 'September 10, 2023',
    readTime: '6 min read',
    category: 'Performance',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1470',
    content: `## Optimizing JavaScript Performance

Performance optimization is crucial for providing the best user experience in web applications. This post explores various techniques to enhance JavaScript performance.

### Code Splitting

Code splitting is an excellent way to reduce initial load times by splitting your JavaScript bundle into smaller chunks that can be loaded on demand.

### Memoization and Caching

Utilizing memoization and caching strategies can significantly reduce computation time for expensive operations.

### Efficient DOM Manipulation

Minimize DOM manipulations and batch updates whenever possible to avoid layout thrashing.

### Example: Using Web Workers

\`\`\`javascript
// Offloading heavy computations to a Web Worker
const worker = new Worker('worker.js');

worker.addEventListener('message', (event) => {
  console.log('Result from worker:', event.data);
});

worker.postMessage({
  type: 'COMPLEX_CALCULATION',
  data: hugeDataSet
});
\`\`\`

### Profiling and Monitoring

Regularly profile your application using browser developer tools to identify and fix performance bottlenecks. Tools like Lighthouse and WebPageTest can provide valuable insights.`
  },
  {
    id: 4,
    title: 'Building Responsive UIs with TailwindCSS',
    excerpt: 'A comprehensive guide to creating responsive and adaptive user interfaces using TailwindCSS.',
    date: 'August 22, 2023',
    readTime: '7 min read',
    category: 'CSS',
    image: 'https://images.unsplash.com/photo-1517134191118-9d595e4c8c2b?auto=format&fit=crop&q=80&w=1470',
    content: `## Building Responsive UIs with TailwindCSS

TailwindCSS has revolutionized the way developers approach CSS and UI design. This utility-first CSS framework offers unprecedented flexibility and speed in building responsive interfaces.

### Core Concepts

TailwindCSS works on the principle of applying small, single-purpose utility classes directly in your HTML. This approach allows for rapid UI development without leaving your markup.

### Responsive Design with Tailwind

Tailwind makes responsive design incredibly straightforward with its built-in breakpoint prefixes:

- \`sm:\` - Small screens (640px and up)
- \`md:\` - Medium screens (768px and up)
- \`lg:\` - Large screens (1024px and up)
- \`xl:\` - Extra large screens (1280px and up)
- \`2xl:\` - 2X large screens (1536px and up)

### Example: Responsive Grid Layout

\`\`\`html
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white p-4 rounded shadow">Item 1</div>
  <div class="bg-white p-4 rounded shadow">Item 2</div>
  <div class="bg-white p-4 rounded shadow">Item 3</div>
</div>
\`\`\`

### Customization and Theming

One of Tailwind's greatest strengths is its customizability. The tailwind.config.js file allows you to define your design system including colors, spacing, breakpoints, and more.`
  },
  {
    id: 5,
    title: 'Getting Started with TypeScript in 2023',
    excerpt: 'A beginner-friendly introduction to TypeScript for JavaScript developers.',
    date: 'August 5, 2023',
    readTime: '10 min read',
    category: 'TypeScript',
    image: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?auto=format&fit=crop&q=80&w=1470',
    content: `## Getting Started with TypeScript in 2023

TypeScript continues to gain popularity among developers for its ability to add static typing to JavaScript, enhancing code quality and developer experience.

### Why TypeScript?

TypeScript offers several advantages:
- Static type checking
- Better tooling and IDE support
- Enhanced code documentation
- Improved refactoring capabilities
- Early error detection

### Basic Types

TypeScript provides various built-in types:

\`\`\`typescript
// Basic types
let isDone: boolean = false;
let decimal: number = 6;
let color: string = "blue";
let list: number[] = [1, 2, 3];
let tuple: [string, number] = ["hello", 10];

// Object type
interface User {
  name: string;
  id: number;
  active?: boolean; // Optional property
}

// Function type
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}
\`\`\`

### TypeScript with React

TypeScript works exceptionally well with React, providing type safety for props, state, and events:

\`\`\`typescript
interface ButtonProps {
  text: string;
  onClick: () => void;
  variant?: 'primary' | 'secondary';
}

const Button: React.FC<ButtonProps> = ({ 
  text, 
  onClick, 
  variant = 'primary' 
}) => {
  return (
    <button 
      onClick={onClick}
      className={\`btn btn-\${variant}\`}
    >
      {text}
    </button>
  );
};
\`\`\`

### Setting Up a TypeScript Project

Setting up TypeScript has become much easier in 2023, with built-in support in most modern frameworks and build tools.`
  },
  {
    id: 6,
    title: 'The Art of Clean Code: Best Practices for Maintainability',
    excerpt: 'Principles and practices for writing clean, maintainable code that stands the test of time.',
    date: 'July 18, 2023',
    readTime: '9 min read',
    category: 'Best Practices',
    image: 'https://images.unsplash.com/photo-1563089145-599997674d42?auto=format&fit=crop&q=80&w=1470',
    content: `## The Art of Clean Code

Clean code is not just about making your code work; it's about making it work well for both computers and humans who need to understand and maintain it.

### Principles of Clean Code

#### 1. Readability

Code should be written for humans first, machines second. Use clear variable names, consistent formatting, and logical organization.

#### 2. Simplicity

Embrace simplicity. As Antoine de Saint-Exupéry said, "Perfection is achieved not when there is nothing more to add, but when there is nothing left to take away."

#### 3. DRY (Don't Repeat Yourself)

Duplicated code means duplicated bugs and maintenance. Extract common functionality into reusable functions or components.

### Example: Before and After Refactoring

\`\`\`javascript
// Before: Messy, hard-to-maintain code
function processUserData(data) {
  let result = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].age > 18) {
      let item = {
        name: data[i].name,
        email: data[i].email,
        isAdult: true
      };
      result.push(item);
    }
  }
  return result;
}

// After: Clean, maintainable code
function processUserData(users) {
  return users
    .filter(user => user.age > 18)
    .map(user => ({
      name: user.name,
      email: user.email,
      isAdult: true
    }));
}
\`\`\`

### Code Reviews and Standards

Establish coding standards for your team and enforce them through regular code reviews. Tools like ESLint, Prettier, and TypeScript can help maintain code quality automatically.`
  }
];

const categories = [
  'All', 'React', 'JavaScript', 'TypeScript', 'CSS', 'Performance', 'Accessibility', 'Best Practices'
];

const BlogPage = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [currentPage, setCurrentPage] = useState(1);

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category);
    setCurrentPage(1);
  };

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Blog</h1>
          <p className="text-lg text-muted-foreground">
            Insights, tutorials, and the latest trends in farming, agriculture, and sustainable practices.
            Learn from experts and discover innovative approaches to modern farming.
          </p>
        </motion.div>
        
        {/* Categories Filter */}
        <BlogCategories 
          activeCategory={activeCategory} 
          onCategoryChange={handleCategoryChange} 
        />
        
        {/* Featured Post */}
        <FeaturedPost 
          title="The Future of Sustainable Farming: Balancing Productivity and Conservation"
          excerpt="Discover how modern agricultural practices are evolving to meet the twin challenges of feeding a growing global population while preserving our natural ecosystems."
          date="November 2, 2023"
          readTime="15 min read"
          image="https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80"
          id={301}
        />
        
        {/* Popular Articles Section */}
        <PopularArticlesSection />
        
        {/* Latest Articles Section */}
        <LatestArticlesSection />
        
        {/* Original Blog Posts Grid */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Recommended For You</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.slice(0, 6).map((post, index) => (
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
        </section>
        
        {/* Pagination */}
        <BlogPagination currentPage={currentPage} totalPages={5} />
        
        {/* Newsletter */}
        <Newsletter />
      </div>
    </div>
  );
};

export default BlogPage;
