
import { motion } from "framer-motion";
import { useIsMobile } from "@/hooks/use-mobile";

// A more extensive list of blog categories that matches our content
export const allBlogCategories = [
  'All',
  'React',
  'JavaScript', 
  'TypeScript', 
  'CSS', 
  'Performance', 
  'Accessibility', 
  'Best Practices',
  'Farming',
  'Agriculture',
  'Dairy',
  'Livestock',
  'Global Farming',
  'Production',
  'Gardening',
  'Planting',
  'Garden Care'
];

interface BlogCategoriesProps {
  activeCategory?: string;
  onCategoryChange?: (category: string) => void;
}

const BlogCategories = ({ 
  activeCategory = 'All',
  onCategoryChange = () => {}
}: BlogCategoriesProps) => {
  const isMobile = useIsMobile();
  
  return (
    <div className="mb-8 md:mb-12 overflow-x-auto scrollbar-hidden -mx-4 md:mx-0 px-4 md:px-0">
      <div className="flex space-x-2 pb-4 min-w-max">
        {allBlogCategories.map((category, index) => (
          <motion.button
            key={category}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
            className={`px-3 py-1.5 md:px-4 md:py-2 rounded-full text-xs md:text-sm font-medium ${
              category === activeCategory
                ? 'bg-primary text-primary-foreground'
                : 'bg-secondary hover:bg-primary/10 text-muted-foreground hover:text-foreground'
            } transition-colors whitespace-nowrap`}
            onClick={() => onCategoryChange(category)}
            aria-pressed={category === activeCategory}
            aria-label={`Filter by ${category} category`}
          >
            {category}
          </motion.button>
        ))}
      </div>
    </div>
  );
};

export default BlogCategories;
