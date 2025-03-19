
import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Star, ArrowRight } from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '@/components/ui/button';

// Sample product data
const products = [
  {
    id: 1,
    title: "Ergonomic Desk Chair",
    price: 259.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1596162954151-cdcb4c0f70a8?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8b2ZmaWNlJTIwY2hhaXJ8ZW58MHx8MHx8fDA%3D",
    category: "Furniture"
  },
  {
    id: 2,
    title: "Wireless Noise-Cancelling Headphones",
    price: 199.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1578319439584-104c94d37305?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8aGVhZHBob25lc3xlbnwwfHwwfHx8MA%3D%3D",
    category: "Electronics"
  },
  {
    id: 3,
    title: "Smart Home Hub",
    price: 129.99,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c21hcnQlMjBob21lfGVufDB8fDB8fHww",
    category: "Electronics"
  },
  {
    id: 4,
    title: "Minimalist Desk Lamp",
    price: 49.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVzayUyMGxhbXB8ZW58MHx8MHx8fDA%3D",
    category: "Lighting"
  },
  {
    id: 5,
    title: "Mechanical Keyboard",
    price: 119.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVjaGFuaWNhbCUyMGtleWJvYXJkfGVufDB8fDB8fHww",
    category: "Electronics"
  },
  {
    id: 6,
    title: "Adjustable Standing Desk",
    price: 349.99,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1593062096033-9a26b09da705?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8c3RhbmRpbmclMjBkZXNrfGVufDB8fDB8fHww",
    category: "Furniture"
  },
  {
    id: 7,
    title: "Ergonomic Mouse",
    price: 79.99,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1615663245857-ac93bb7c39e7?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZXJnb25vbWljJTIwbW91c2V8ZW58MHx8MHx8fDA%3D",
    category: "Electronics"
  },
  {
    id: 8,
    title: "Desktop Monitor",
    price: 299.99,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1548113408-c8d851d22c6e?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8ZGVza3RvcCUyMG1vbml0b3J8ZW58MHx8MHx8fDA%3D",
    category: "Electronics"
  }
];

const categories = ["All", "Electronics", "Furniture", "Lighting"];

const ShopPage = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const itemsPerPage = 6;

  // Filter products by category
  const filteredProducts = selectedCategory === "All"
    ? products
    : products.filter(product => product.category === selectedCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  return (
    <div className="min-h-screen py-16 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">Shop</h1>
          <p className="text-lg text-muted-foreground">
            Browse our collection of high-quality products designed to enhance your productivity and workspace.
          </p>
        </motion.div>

        {/* Categories Filter */}
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map(category => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => {
                setSelectedCategory(category);
                setCurrentPage(1);
              }}
              size="sm"
              className="transition-all duration-300"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {currentItems.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-background border border-border rounded-lg overflow-hidden hover-lift"
            >
              <div className="aspect-[4/3] relative overflow-hidden">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                    ${product.price.toFixed(2)}
                  </span>
                </div>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-2">
                  <div className="flex text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        className="h-4 w-4" 
                        fill={i < Math.floor(product.rating) ? "currentColor" : "none"}
                        fillOpacity={i < Math.floor(product.rating) ? 1 : 0}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-muted-foreground ml-2">{product.rating}</span>
                </div>
                
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors">
                  {product.title}
                </h3>
                
                <p className="text-sm text-muted-foreground mb-4">
                  Category: {product.category}
                </p>
                
                <Button className="w-full">
                  <ShoppingBag className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-8 flex justify-center"
          >
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious 
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
                
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink 
                      onClick={() => setCurrentPage(i + 1)}
                      isActive={currentPage === i + 1}
                      className="cursor-pointer"
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                
                <PaginationItem>
                  <PaginationNext 
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </motion.div>
        )}

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="mt-16 p-8 border border-border rounded-lg bg-muted/30 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            We're constantly updating our inventory with new and exciting products. 
            Contact our customer service team for special requests or inquiries.
          </p>
          <Button size="lg">
            Contact Support
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default ShopPage;
