
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

// Latest articles data
export const latestArticles = [
  {
    id: 201,
    title: 'Exploring Potential and Challenges in Global Agriculture',
    excerpt: 'Uncovering the Vast Potential and Complex Challenges in the World of Global Agriculture.',
    date: 'October 23, 2023',
    category: 'Global Farming',
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 202,
    title: 'Bringing Change in the Livestock Industry',
    excerpt: 'Revealing Innovations, Challenges and Transformation Potential that Bring Positive.',
    date: 'October 23, 2023',
    category: 'Livestock',
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1474&q=80',
  },
  {
    id: 203,
    title: 'Potential and Constraints Faced in Production Quality',
    excerpt: 'Discusses Challenges and Opportunities in Achieving High Production Standards.',
    date: 'October 23, 2023',
    category: 'Production',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 204,
    title: 'Achieving High Productivity from Your Own Home Garden',
    excerpt: 'A Practical Guide to Achieving Satisfactory Results from Plants Grown in Your Home.',
    date: 'October 23, 2023',
    category: 'Gardening',
    image: 'https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 205,
    title: 'The Best Guide to Planting Seeds with Optimal Results',
    excerpt: 'Effective Strategies and Techniques to Achieve Healthy and Productive Plant Growth.',
    date: 'October 23, 2023',
    category: 'Planting',
    image: 'https://images.unsplash.com/photo-1599598177991-ec67b5c37318?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
  {
    id: 206,
    title: 'Strategies for Caring for Your Garden More Efficiently and Productively',
    excerpt: 'An approach that improves plant performance and makes garden management easier.',
    date: 'October 23, 2023',
    category: 'Garden Care',
    image: 'https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80',
  },
];

const LatestArticlesSection = () => {
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Latest Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {latestArticles.map((article, index) => (
          <motion.div 
            key={article.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="group"
          >
            <Link to={`/blog/${article.id}`} className="block h-full">
              <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-lg transition-shadow">
                <div className="relative aspect-video overflow-hidden">
                  <img 
                    src={article.image} 
                    alt={article.title} 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                      {article.category}
                    </span>
                  </div>
                </div>
                
                <CardContent className="p-5">
                  <div className="flex items-center text-muted-foreground text-sm mb-3">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{article.date}</span>
                  </div>
                  
                  <h3 className="text-lg font-bold mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {article.title}
                  </h3>
                  
                  <p className="text-muted-foreground text-sm line-clamp-2">
                    {article.excerpt}
                  </p>
                </CardContent>
              </Card>
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default LatestArticlesSection;
