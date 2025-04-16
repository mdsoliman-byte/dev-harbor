import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { CalendarDays } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useIsMobile } from '@/hooks/use-mobile';

// Additional blog posts for the popular articles section
export const popularArticles = [
  {
    id: 101,
    title: 'Best Strategy to Achieve Profitable Harvest',
    excerpt: 'Optimal strategies for achieving profitable harvests involve a comprehensive approach to farm management, selection of appropriate crop varieties, implementation of efficient practices.',
    date: 'October 23, 2023',
    category: 'Farming',
    image: 'https://images.unsplash.com/photo-1591857177580-dc82b9ac4e1e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  },
  {
    id: 102,
    title: 'Abundant Harvest from Agricultural Farm Land Shows Success',
    excerpt: 'Recent agricultural initiatives have led to unprecedented yields across multiple crop varieties.',
    date: 'October 23, 2023',
    category: 'Agriculture',
    image: 'https://images.unsplash.com/photo-1626553683558-dd8dc97e40a4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  },
  {
    id: 103,
    title: 'Latest Innovations Increasing Milk Production and Quality',
    excerpt: 'New technologies and farming practices have revolutionized the dairy industry.',
    date: 'October 23, 2023',
    category: 'Dairy',
    image: 'https://images.unsplash.com/photo-1551658042-e1e0a3ff5fab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  },
  {
    id: 104,
    title: 'Best Practices in Harvesting Vegetables from Plantations',
    excerpt: 'Learn about the most effective techniques for harvesting vegetables to maximize yield and quality.',
    date: 'October 23, 2023',
    category: 'Farming',
    image: 'https://images.unsplash.com/photo-1595141264890-05ed48f6fc38?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80',
  }
];

const PopularArticlesSection = () => {
  const isMobile = useIsMobile();
  
  return (
    <section className="mb-16">
      <h2 className="text-2xl md:text-3xl font-display font-bold mb-6">Popular Articles</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Featured Popular Article (Larger) */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="md:col-span-2 group"
        >
          <Link to={`/blog/${popularArticles[0].id}`} className="block">
            <Card className="overflow-hidden h-full border-none shadow-md hover:shadow-lg transition-shadow">
              <div className="relative aspect-[16/9] md:aspect-[16/10] overflow-hidden">
                <img 
                  src={popularArticles[0].image} 
                  alt={popularArticles[0].title} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                    {popularArticles[0].category}
                  </span>
                </div>
              </div>
              
              <CardContent className="p-5">
                <div className="flex items-center text-muted-foreground text-sm mb-3">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  <span>{popularArticles[0].date}</span>
                </div>
                
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                  {popularArticles[0].title}
                </h3>
                
                <p className="text-muted-foreground text-sm">
                  {popularArticles[0].excerpt}
                </p>
              </CardContent>
            </Card>
          </Link>
        </motion.div>
        
        {/* Other Popular Articles (Smaller) */}
        <div className="md:col-span-1 space-y-4">
          {popularArticles.slice(1, 4).map((article, index) => (
            <motion.div
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group"
            >
              <Link to={`/blog/${article.id}`} className="block">
                <Card className="overflow-hidden border-none shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-row items-center">
                    <div className="w-24 h-24 shrink-0 relative overflow-hidden">
                      <img 
                        src={article.image} 
                        alt={article.title} 
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    
                    <CardContent className="p-3 flex-1">
                      <div className="flex items-center text-muted-foreground text-xs mb-1">
                        <CalendarDays className="h-3 w-3 mr-1" />
                        <span>{article.date}</span>
                      </div>
                      
                      <h3 className="text-sm font-semibold line-clamp-2 group-hover:text-primary transition-colors">
                        {article.title}
                      </h3>
                    </CardContent>
                  </div>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PopularArticlesSection;
