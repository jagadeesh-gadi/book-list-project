
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/books/BookCard";
import { BookFilters } from "@/components/books/BookFilters";
import { getAllBooks } from "@/services/bookService";
import { Book } from "@/types/book";
import { useLocation } from "react-router-dom";
import { Search, Filter, X } from "lucide-react";
import { 
  Sheet, 
  SheetClose, 
  SheetContent, 
  SheetDescription, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from "@/components/ui/sheet";

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [filteredBooks, setFilteredBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    genre: "",
    minRating: 0,
    sortBy: "popularity",
    author: "",
  });
  
  const location = useLocation();
  
  useEffect(() => {
    // Extract search query from URL if it exists
    const queryParams = new URLSearchParams(location.search);
    const searchFromUrl = queryParams.get("search");
    if (searchFromUrl) {
      setSearchQuery(searchFromUrl);
    }
    
    const fetchBooks = async () => {
      setIsLoading(true);
      try {
        const allBooks = await getAllBooks();
        setBooks(allBooks);
        setFilteredBooks(allBooks);
      } catch (error) {
        console.error("Failed to fetch books:", error);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchBooks();
  }, [location.search]);
  
  useEffect(() => {
    applyFilters();
  }, [searchQuery, filters, books]);
  
  const applyFilters = async () => {
    setIsLoading(true);
    try {
      const results = await getAllBooks({
        search: searchQuery,
        ...filters
      });
      setFilteredBooks(results);
    } catch (error) {
      console.error("Error applying filters:", error);
    } finally {
      setIsLoading(false);
    }
  };
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    applyFilters();
  };
  
  const handleFilterChange = (newFilters: any) => {
    setFilters(newFilters);
  };
  
  const resetFilters = () => {
    setSearchQuery("");
    setFilters({
      genre: "",
      minRating: 0,
      sortBy: "popularity",
      author: "",
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2 font-serif text-book-primary">Explore Books</h1>
        <p className="text-muted-foreground">
          Discover new titles, read reviews, and find your next favorite book.
        </p>
      </div>
      
      <div className="flex flex-col md:flex-row gap-6 mb-8">
        <div className="w-full">
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by title, author, or description..."
              className="w-full"
            />
            <Button type="submit" className="bg-book-primary">
              <Search className="h-4 w-4" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>
        
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="w-full flex items-center gap-2">
                <Filter className="h-4 w-4" />
                Filters
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Filters</SheetTitle>
                <SheetDescription>
                  Refine your book search with these filters.
                </SheetDescription>
              </SheetHeader>
              <div className="py-4">
                <BookFilters onFilterChange={handleFilterChange} />
              </div>
              <SheetClose asChild>
                <Button className="w-full mt-4 bg-book-primary">Apply Filters</Button>
              </SheetClose>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="hidden md:block">
          <div className="sticky top-4">
            <div className="bg-white p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-semibold text-lg">Filters</h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="h-8 px-2 text-muted-foreground"
                >
                  <X className="h-4 w-4 mr-1" />
                  Reset
                </Button>
              </div>
              <BookFilters onFilterChange={handleFilterChange} />
            </div>
          </div>
        </div>
        
        <div className="md:col-span-3">
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-muted rounded-lg aspect-[2/3]"></div>
                  <div className="mt-3 h-4 bg-muted rounded w-3/4"></div>
                  <div className="mt-2 h-3 bg-muted rounded w-1/2"></div>
                </div>
              ))}
            </div>
          ) : filteredBooks.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-lg font-medium mb-2">No books found</h3>
              <p className="text-muted-foreground mb-4">
                No books match your current filters. Try adjusting your search criteria.
              </p>
              <Button onClick={resetFilters} variant="outline">
                Reset Filters
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
