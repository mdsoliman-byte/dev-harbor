
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useIsMobile } from '@/hooks/use-mobile';

interface FilterSearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  setCurrentPage: (page: number) => void;
  categoryOptions: string[];
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const FilterSearchBar = ({
  searchQuery,
  setSearchQuery,
  setCurrentPage,
  categoryOptions,
  selectedCategory,
  setSelectedCategory
}: FilterSearchBarProps) => {
  const isMobile = useIsMobile();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-8"
    >
      <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search products..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>
        <div className="flex flex-row gap-2 overflow-x-auto pb-2 md:pb-0">
          {categoryOptions.slice(0, isMobile ? 3 : categoryOptions.length).map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            >
              {category}
            </Button>
          ))}
          {isMobile && categoryOptions.length > 3 && (
            <Button variant="outline" size="sm">
              More
            </Button>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default FilterSearchBar;
