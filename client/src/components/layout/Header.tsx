
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/books?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="border-b bg-white shadow-sm">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-6">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold text-book-primary font-serif">Read & Rate Realm</span>
          </Link>
          <nav className="hidden md:flex items-center gap-6">
            <Link to="/" className="text-sm font-medium transition-colors hover:text-book-primary">
              Home
            </Link>
            <Link to="/books" className="text-sm font-medium transition-colors hover:text-book-primary">
              Books
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-4">
          <form onSubmit={handleSearch} className="relative hidden md:flex items-center">
            <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search for books..."
              className="w-[200px] lg:w-[300px] pl-8 bg-secondary"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </form>
          <Link to="/login">
            <Button variant="outline" className="hidden md:flex">
              Log in
            </Button>
          </Link>
          <Link to="/register">
            <Button className="bg-book-primary hover:bg-book-secondary">Sign up</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
