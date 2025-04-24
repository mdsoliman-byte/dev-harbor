
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Library, FileText, Sparkles, Lightbulb, BookOpen, History, BookCopy, Atom } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect } from 'react';
import { fetchProductCategories, fetchProducts, Product } from '@/services/api/shop/productsService';

// Get icon based on category
const getCategoryIcon = (category: string) => {
  switch (category) {
    case "Programming":
      return <FileText className="h-5 w-5" />;
    case "Design":
      return <Sparkles className="h-5 w-5" />;
    case "Data Science":
      return <Atom className="h-5 w-5" />;
    case "Technology":
      return <Lightbulb className="h-5 w-5" />;
    case "Marketing":
      return <BookOpen className="h-5 w-5" />;
    case "Management":
      return <History className="h-5 w-5" />;
    case "eBooks":
      return <BookCopy className="h-5 w-5" />;
    case "Themes":
      return <FileText className="h-5 w-5" />;
    case "Courses":
      return <BookOpen className="h-5 w-5" />;
    case "Templates":
      return <Sparkles className="h-5 w-5" />;
    default:
      return <BookCopy className="h-5 w-5" />;
  }
};

interface CategorySectionProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  setCurrentPage: (page: number) => void;
}

const CategorySection = ({
  selectedCategory,
  setSelectedCategory,
  setCurrentPage,
}: CategorySectionProps) => {
  const [categories, setCategories] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesData = await fetchProductCategories();
        setCategories(['All', ...categoriesData.map(category => category.name)]);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setCategories(['All']);
      }
    };

    const fetchAllProducts = async () => {
      try {
        const productsData = await fetchProducts();
        setProducts(productsData);
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      }
    };

    fetchCategories();
    fetchAllProducts();
  }, []);

  const filteredProducts = selectedCategory === 'All'
    ? products
    : products.filter(product => product.category.name === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
      className="mb-12"
    >
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl md:text-3xl font-bold">Browse By Category</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" className="rounded-full">
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {categories.map((category, index) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
          >
            <Button
              variant={selectedCategory === category ? "default" : "outline"}
              className="w-full h-full py-6 flex-col gap-3"
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
            >
              <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10">
                {category === "All" ? <Library className="h-5 w-5" /> : getCategoryIcon(category)}
              </div>
              <span className="text-sm font-medium">{category}</span>
              {category === "All" ? (
                <span className="text-xs text-muted-foreground">{products.length} Products</span>
              ) : (
                <span className="text-xs text-muted-foreground">
                  {filteredProducts.length} Products
                </span>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default CategorySection;
export { getCategoryIcon };
