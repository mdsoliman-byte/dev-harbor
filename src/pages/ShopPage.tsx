
import { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  FilePdf, 
  BookOpen, 
  ChevronLeft, 
  ChevronRight, 
  Mail, 
  Library,
  FileText,
  History,
  Sparkles,
  Lightbulb,
  Atom,
  BookCopy
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { useIsMobile } from '@/hooks/use-mobile';

// Sample PDF data
const pdfLibrary = [
  {
    id: 1,
    title: "Modern Web Development Techniques",
    category: "Programming",
    description: "A comprehensive guide to the latest web development practices and technologies",
    pages: 176,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    fileSize: "12.4 MB",
    releaseDate: "2023"
  },
  {
    id: 2,
    title: "The Psychology of User Experience",
    category: "Design",
    description: "How psychological principles can be applied to create better user experiences",
    pages: 204,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    fileSize: "9.7 MB",
    releaseDate: "2023"
  },
  {
    id: 3,
    title: "Data Analysis for Business Decisions",
    category: "Data Science",
    description: "Learn how to leverage data to drive strategic business decisions",
    pages: 253,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    fileSize: "14.2 MB",
    releaseDate: "2022"
  },
  {
    id: 4,
    title: "Artificial Intelligence: A Practical Guide",
    category: "Technology",
    description: "A beginner-friendly introduction to AI concepts and applications",
    pages: 198,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    fileSize: "10.8 MB",
    releaseDate: "2023"
  },
  {
    id: 5,
    title: "Responsive Design Patterns",
    category: "Design",
    description: "Best practices for creating websites that work on any device",
    pages: 165,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1586776802377-a600652634dd?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    fileSize: "8.5 MB",
    releaseDate: "2022"
  },
  {
    id: 6,
    title: "Cloud Computing Fundamentals",
    category: "Technology",
    description: "An overview of cloud technologies and their business applications",
    pages: 232,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1484417894907-623942c8ee29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    fileSize: "13.1 MB",
    releaseDate: "2022"
  },
  {
    id: 7,
    title: "Marketing in the Digital Age",
    category: "Marketing",
    description: "Strategies for effective digital marketing campaigns",
    pages: 218,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    fileSize: "11.3 MB",
    releaseDate: "2023"
  },
  {
    id: 8,
    title: "Software Engineering Best Practices",
    category: "Programming",
    description: "A guide to writing clean, maintainable, and efficient code",
    pages: 246,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    fileSize: "15.7 MB",
    releaseDate: "2022"
  },
  {
    id: 9,
    title: "Project Management for Tech Teams",
    category: "Management",
    description: "How to effectively manage software development projects",
    pages: 187,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    fileSize: "9.3 MB",
    releaseDate: "2023"
  },
  {
    id: 10,
    title: "Machine Learning Algorithms Explained",
    category: "Data Science",
    description: "A deep dive into popular machine learning techniques",
    pages: 274,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1515879128891-407a325eb6a0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    fileSize: "16.2 MB",
    releaseDate: "2022"
  }
];

// Extract unique categories for filtering
const categories = ["All", ...Array.from(new Set(pdfLibrary.map(pdf => pdf.category)))];

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
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedPdf, setSelectedPdf] = useState<typeof pdfLibrary[0] | null>(null);
  const [emailMessage, setEmailMessage] = useState("");
  const { toast } = useToast();
  const isMobile = useIsMobile();
  const itemsPerPage = 6;

  // Filter PDFs by category
  const filteredPdfs = selectedCategory === "All"
    ? pdfLibrary
    : pdfLibrary.filter(pdf => pdf.category === selectedCategory);

  // Calculate pagination
  const totalPages = Math.ceil(filteredPdfs.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredPdfs.slice(indexOfFirstItem, indexOfLastItem);

  // Open request modal
  const openRequestModal = (pdf: typeof pdfLibrary[0]) => {
    setSelectedPdf(pdf);
    setIsRequestModalOpen(true);
  };

  // Handle request submission
  const handleSubmitRequest = () => {
    if (!emailMessage.trim()) {
      toast({
        variant: "destructive",
        title: "Message required",
        description: "Please provide a message with your request."
      });
      return;
    }

    // In a real app, this would send the request to a server
    toast({
      title: "Request Sent Successfully!",
      description: "We'll get back to you soon with access to the PDF."
    });
    
    setEmailMessage("");
    setIsRequestModalOpen(false);
  };

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
                Browse our collection of high-quality PDF resources designed to enhance your knowledge and skills.
                Request access to any document that interests you.
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
                  <span className="text-xs text-muted-foreground">
                    {category === "All" 
                      ? `${pdfLibrary.length} PDFs` 
                      : `${pdfLibrary.filter(pdf => pdf.category === category).length} PDFs`}
                  </span>
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
                Premium PDFs <span className="text-amber-500">50% off</span> now!
              </h2>
              <p className="text-muted-foreground mb-4 md:mb-6">
                Limited time offer on our most popular technical resources. Don't miss this opportunity!
              </p>
              <div className="flex flex-wrap gap-3">
                <Button className="bg-amber-500 hover:bg-amber-600">
                  Request Now
                </Button>
                <Button variant="outline">
                  Get Coupon
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

        {/* PDF Grid Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="mb-12"
        >
          <div className="flex flex-wrap items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Popular Resources</h2>
            <div className="flex flex-wrap gap-2 mt-4 sm:mt-0">
              {["All", "Programming", "Design", "Data Science"].map(cat => (
                <Button
                  key={cat}
                  variant={selectedCategory === cat ? "default" : "outline"}
                  size="sm"
                  onClick={() => {
                    setSelectedCategory(cat);
                    setCurrentPage(1);
                  }}
                >
                  {cat}
                </Button>
              ))}
            </div>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {currentItems.map((pdf, index) => (
              <motion.div
                key={pdf.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <Card className="group overflow-hidden hover-lift h-full flex flex-col">
                  <div className="aspect-[3/4] relative overflow-hidden bg-muted">
                    <img 
                      src={pdf.image} 
                      alt={pdf.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 bg-primary/80 text-primary-foreground text-xs font-medium rounded-full backdrop-blur-sm">
                        {pdf.pages} pages
                      </span>
                    </div>
                  </div>
                  
                  <CardHeader className="p-4 pb-0">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-muted-foreground">
                        {pdf.releaseDate}
                      </span>
                      <span className="text-xs font-medium px-2 py-1 bg-primary/10 text-primary rounded-full">
                        {pdf.category}
                      </span>
                    </div>
                    <StarRating rating={pdf.rating} />
                    <h3 className="font-semibold text-lg mt-2 line-clamp-1 group-hover:text-primary transition-colors">
                      {pdf.title}
                    </h3>
                  </CardHeader>
                  
                  <CardContent className="p-4 pt-2 flex-grow">
                    <p className="text-sm text-muted-foreground line-clamp-2 mb-2">
                      {pdf.description}
                    </p>
                    <div className="text-xs flex items-center text-muted-foreground">
                      <FilePdf className="h-3 w-3 mr-1" />
                      {pdf.fileSize} PDF
                    </div>
                  </CardContent>
                  
                  <CardFooter className="p-4 pt-0">
                    <Button 
                      className="w-full"
                      onClick={() => openRequestModal(pdf)}
                    >
                      <Mail className="mr-2 h-4 w-4" />
                      Request Access
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </div>

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
            <DialogTitle>Request PDF Access</DialogTitle>
            <DialogDescription>
              {selectedPdf && (
                <div className="mt-2">
                  <span className="font-medium">{selectedPdf.title}</span>
                  <p className="text-sm text-muted-foreground mt-1">
                    {selectedPdf.description}
                  </p>
                </div>
              )}
            </DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <label htmlFor="message" className="text-sm font-medium">
                Your Message
              </label>
              <Textarea
                id="message"
                placeholder="Please briefly explain why you're interested in accessing this PDF..."
                rows={5}
                value={emailMessage}
                onChange={(e) => setEmailMessage(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRequestModalOpen(false)}
            >
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmitRequest}>
              <Mail className="mr-2 h-4 w-4" />
              Send Request
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ShopPage;
