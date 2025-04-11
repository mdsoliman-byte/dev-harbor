
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useIsMobile } from '@/hooks/use-mobile';

interface PaginationControlsProps {
  currentPage: number;
  totalPages: number;
  setCurrentPage: (page: number) => void;
}

const PaginationControls = ({ currentPage, totalPages, setCurrentPage }: PaginationControlsProps) => {
  const isMobile = useIsMobile();

  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center">
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => setCurrentPage(Math.max(currentPage - 1, 1))}
              className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
          
          {[...Array(totalPages)].map((_, i) => (
            <PaginationItem 
              key={i} 
              className={isMobile && totalPages > 3 && i !== 0 && i !== totalPages - 1 && i !== currentPage - 1 ? "hidden" : ""}
            >
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
              onClick={() => setCurrentPage(Math.min(currentPage + 1, totalPages))}
              className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default PaginationControls;
