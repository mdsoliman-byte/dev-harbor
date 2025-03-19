
import { motion } from "framer-motion";
import { CalendarDays, Clock } from "lucide-react";
import { Link } from "react-router-dom";

interface FeaturedPostProps {
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  image: string;
  id: number;
}

const FeaturedPost = ({
  title = "The Evolution of Frontend Development: Past, Present, and Future",
  excerpt = "A comprehensive look at how frontend development has evolved over the years, current best practices, and what the future might hold.",
  date = "October 24, 2023",
  readTime = "12 min read",
  image = "https://images.unsplash.com/photo-1569748130764-3fed0c102c59?auto=format&fit=crop&q=80&w=1470",
  id = 0
}: FeaturedPostProps) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mb-16"
    >
      <div className="relative rounded-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent z-10" />
        
        <img 
          src={image} 
          alt="Featured post" 
          className="w-full h-[300px] md:h-[500px] object-cover"
        />
        
        <div className="absolute bottom-0 left-0 right-0 p-6 md:p-10 z-20">
          <span className="inline-block px-3 py-1 bg-primary text-primary-foreground text-xs font-medium rounded-full mb-4">
            Featured
          </span>
          
          <Link to={`/blog/${id}`}>
            <h2 className="text-2xl md:text-4xl font-display font-bold text-white mb-3 hover:text-primary/90 transition-colors">
              {title}
            </h2>
          </Link>
          
          <p className="text-white/80 mb-6 max-w-3xl">
            {excerpt}
          </p>
          
          <div className="flex items-center text-white/70 text-sm space-x-4">
            <div className="flex items-center">
              <CalendarDays className="h-4 w-4 mr-1" />
              <span>{date}</span>
            </div>
            
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-1" />
              <span>{readTime}</span>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FeaturedPost;
