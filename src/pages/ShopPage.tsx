
import { useState } from 'react';
import { useShop } from '@/contexts/ShopContext';
import { Product } from '@/services/api/shop';

// Import refactored components
import ShopHero from '@/components/shop/ShopHero';
import FilterSearchBar from '@/components/shop/FilterSearchBar';
import CategorySection from '@/components/shop/CategorySection';
import PromotionalBanner from '@/components/shop/PromotionalBanner';
import ProductGrid from '@/components/shop/ProductGrid';
import CallToActionSection from '@/components/shop/CallToActionSection';
import ProductRequestModal from '@/components/shop/ProductRequestModal';

const ShopPage = () => {
  const { loading } = useShop();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [isRequestModalOpen, setIsRequestModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

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

  // Reset all filters
  const resetFilters = () => {
    setSelectedCategory("All");
    setSearchQuery("");
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
        {/* <ShopHero /> */}

        {/* Search & Filter Bar */}
        <FilterSearchBar
          searchQuery={searchQuery}
          setSearchQuery={setSearchQuery}
          setCurrentPage={setCurrentPage}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        {/* Categories Section */}
        <CategorySection
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          setCurrentPage={setCurrentPage}
        />

        {/* Special Offer Banner */}
        {/* <PromotionalBanner /> */}

        {/* Product Grid Section */}
        <ProductGrid
          selectedCategory={selectedCategory}
          onRequestAccess={openRequestModal}
          onResetFilters={resetFilters}
          setCurrentPage={setCurrentPage}
        />

        {/* Call to Action */}
        <CallToActionSection />
      </div>

      {/* Request Access Modal */}
      <ProductRequestModal 
        isOpen={isRequestModalOpen}
        setIsOpen={setIsRequestModalOpen}
        selectedProduct={selectedProduct}
        onSuccess={handleRequestSuccess}
        onCancel={closeRequestModal}
      />
    </div>
  );
};

export default ShopPage;
