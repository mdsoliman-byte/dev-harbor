
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FileText, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Library,
  History,
  Sparkles,
  Lightbulb,
  Atom,
  BookCopy,
  ShoppingCart,
  Search
} from 'lucide-react';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useIsMobile } from '@/hooks/use-mobile';
import { useShop } from '@/contexts/ShopContext';
import { Product } from '@/services/api/shop';
import ProductRequestForm from '@/components/shop/ProductRequestForm';

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

// Function to generate star rating display
const StarRating = ({ rating }: { rating: number }) => {
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating % 1 >= 0.5;
  
  return (
    <div className="flex items-center text-yellow-500">
      {[...Array(5)].map((_, i) => (
        <span key={i} className="inline-block">
          {i < fullStars ? (
            "★"
          ) : i === fullStars && hasHalfStar ? (
            "★" // Use a full star for simplicity, could be replaced with a half-star
          ) : (
            "☆"
          )}
        </span>
      ))}
      <span className="ml-1 text-xs text-muted-foreground">{rating.toFixed(1)}</span>
    </div>
  );
};

const ShopPage = () => {
  const { products, categories, loading } = useShop();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const isMobile = useIsMobile();
  const itemsPerPage = 6;

  // Generate category options from categories
  const categoryOptions = [
    "All", 
    ...Array.from(new Set(categories.map(cat => cat.name)))
  ];

  // Filter products by category and search query
  const filteredProducts = products
    .filter(product => 
      selectedCategory === "All" || product.category === selectedCategory
    )
    .filter(product => 
      searchQuery === "" || 
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

  // Calculate pagination
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredProducts.slice(indexOfFirstItem, indexOfLastItem);

  // Open request modal
  const openRequestModal = (product: Product) => {
    setSelectedProduct(product);
    setIsRequestModalOpen(true);
  };

  // Close request modal
  const closeRequestModal = () => {
    setIsRequestModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle successful submission
  const handleRequestSuccess = () => {
    setIsRequestModalOpen(false);
    setSelectedProduct(null);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-col items-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
          <p className="mt-4 text-muted-foreground">Loading shop data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-4 md:px-8 lg:px-16">
      <div className="container mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden mb-16 bg-gradient-to-br from-sky-50 to-indigo-50 dark:from-slate-800 dark:to-slate-900"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-8 md:p-12">
            <div className="flex flex-col justify-center">
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                Unleash Your Creativity <span className="text-primary">With Digital Resources</span>
              </h1>
              <p className="text-muted-foreground mb-8 max-w-md">
                Browse our collection of high-quality digital resources designed to enhance your knowledge and skills.
                Request access to any product that interests you.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button size="lg" className="font-medium">
                  <Library className="mr-2 h-4 w-4" />
                  Browse Library
                </Button>
                <Button size="lg" variant="outline" className="font-medium">
                  <Mail className="mr-2 h-4 w-4" />
                  Contact Us
                </Button>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <div className="relative h-64 w-full md:h-72 lg:h-80">
                <img 
                  src="/lovable-uploads/03071016-242b-4c82-a634-de51f3580f2e.png" 
                  alt="PDF Library" 
                  className="absolute top-0 right-0 h-full object-contain"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* Search & Filter Bar */}
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

        {/* Categories Section */}
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
            {categoryOptions.map((category, index) => (
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
                      {products.filter(product => product.category === category).length} Products
                    </span>
                  )}
                </Button>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Special Offer Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-16 bg-amber-50 dark:bg-amber-950/30 rounded-xl p-6 md:p-8"
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="md:col-span-2">
              <h2 className="text-2xl md:text-3xl font-bold mb-2">
                Premium Resources <span className="text-amber-500">50% off</span> now!
              </h2>
              <p className="text-muted-foreground mb-4 md:mb-6">
                Limited time offer on our most popular resources. Don't miss this opportunity!
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-amber-500 hover:bg-amber-600">
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Get Discount
                </Button>
                <Button variant="outline">
                  View Offers
                </Button>
              </div>
            </div>
            <div className="flex justify-center md:justify-end">
              <img
                src="https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"
                alt="Special Offer Books"
                className="h-40 md:h-48 object-cover rounded-lg"
              />
            </div>
          </div>
        </motion.div>

        {/* Product Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Resources</h2>
            <div className="flex items-center mt-4 sm:mt-0">
              <span className="text-sm text-muted-foreground mr-2">
                {filteredProducts.length} products found
              </span>
            </div>
          </div>
          
          {filteredProducts.length === 0 ? (
            <div className="text-center py-16 bg-muted/30 rounded-lg">
              <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
              <h3 className="text-2xl font-medium mb-2">No products found</h3>
              <p className="text-muted-foreground max-w-md mx-auto">
                We couldn't find any products matching your search or filter criteria.
                Try adjusting your search or browse a different category.
              </p>
              <Button onClick={() => {
                setSelectedCategory("All");
                setSearchQuery("");
              }} className="mt-6">
                View All Products
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {currentItems.map((product, index) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="group overflow-hidden hover-lift h-full flex flex-col">
                    <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                      <img 
                        src={product.image || "https://images.unsplash.com/photo-1532012197267-da84d127e765?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3"} 
                        alt={product.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute top-4 right-4">
                        <span className="px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                          {product.category}
                        </span>
                      </div>
                    </div>
                    
                    <CardHeader className="p-4 pb-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-xs text-muted-foreground">
                          ID: {product.id}
                        </span>
                        {product.featured && (
                          <span className="text-xs font-medium px-2 py-1 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-full">
                            Featured
                          </span>
                        )}
                      </div>
                      <StarRating rating={4.5} />
                      <h3 className="font-semibold text-lg mt-2 line-clamp-1 group-hover:text-primary transition-colors">
                        {product.title}
                      </h3>
                    </CardHeader>
                    
                    <CardContent className="p-4 pt-2 flex-grow">
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                        {product.description}
                      </p>
                      <div className="flex justify-between items-center mt-3">
                        <div className="text-xs flex items-center text-muted-foreground">
                          {getCategoryIcon(product.category)}
                          <span className="ml-1">{product.category}</span>
                        </div>
                        <div className="font-semibold">
                          {product.sale_price !== null ? (
                            <div className="flex flex-col items-end">
                              <span className="line-through text-xs text-muted-foreground">${product.price}</span>
                              <span className="text-green-500">${product.sale_price}</span>
                            </div>
                          ) : (
                            <span>${product.price}</span>
                          )}
                        </div>
                      </div>
                    </CardContent>
                    
                    <CardFooter className="p-4 pt-0">
                      <Button 
                        className="w-full"
                        onClick={() => openRequestModal(product)}
                      >
                        <Mail className="mr-2 h-4 w-4" />
                        Request Access
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="mt-8 flex justify-center">
              <Pagination>
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious 
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                    />
                  </PaginationItem>
                  
                  {[...Array(totalPages)].map((_, i) => (
                    <PaginationItem key={i} className={isMobile && totalPages > 3 && i !== 0 && i !== totalPages - 1 && i !== currentPage - 1 ? "hidden" : ""}>
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
            </div>
          )}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-16 p-8 border border-border rounded-lg bg-muted/30 text-center"
        >
          <h2 className="text-2xl font-semibold mb-4">Can't find what you're looking for?</h2>
          <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
            Our library is constantly updated with new resources. If you're looking for something specific,
            let us know and we'll help you find it or create it.
          </p>
          <Button size="lg">
            <Mail className="mr-2 h-4 w-4" />
            Contact Us
          </Button>
        </motion.div>
      </div>

      {/* Request Access Modal */}
      <Dialog open={isRequestModalOpen} onOpenChange={setIsRequestModalOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Request Product Access</DialogTitle>
            <DialogDescription>
              {selectedProduct && (
                <div className="mt-2">
                  <span className="font-medium">{selectedProduct.title}</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedProduct.description}
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          
          {selectedProduct && (
            <ProductRequestForm 
              product={selectedProduct} 
              onSuccess={handleRequestSuccess} 
              onCancel={closeRequestModal}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopPage;
