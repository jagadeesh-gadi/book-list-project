
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";

interface BookFiltersProps {
  onFilterChange: (filters: {
    genre?: string;
    minRating?: number;
    sortBy?: string;
    author?: string;
  }) => void;
}

export function BookFilters({ onFilterChange }: BookFiltersProps) {
  const [filters, setFilters] = useState({
    genre: "",
    minRating: 0,
    sortBy: "popularity",
    author: "",
  });

  const genres = [
    "Fiction",
    "Fantasy",
    "Science Fiction",
    "Mystery",
    "Thriller",
    "Romance",
    "Historical Fiction",
    "Biography",
    "Self-Help",
    "Business",
  ];

  const handleChange = (key: string, value: string | number) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  const handleReset = () => {
    const defaultFilters = {
      genre: "",
      minRating: 0,
      sortBy: "popularity",
      author: "",
    };
    setFilters(defaultFilters);
    onFilterChange(defaultFilters);
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="genre">Genre</Label>
        <Select
          value={filters.genre}
          onValueChange={(value) => handleChange("genre", value)}
        >
          <SelectTrigger id="genre">
            <SelectValue placeholder="All Genres" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Genres</SelectItem>
            {genres.map((genre) => (
              <SelectItem key={genre} value={genre.toLowerCase()}>
                {genre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="space-y-2">
        <Label htmlFor="author">Author</Label>
        <Input
          id="author"
          placeholder="Search by author"
          value={filters.author}
          onChange={(e) => handleChange("author", e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <div className="flex justify-between">
          <Label htmlFor="minRating">Minimum Rating</Label>
          <span className="text-sm">{filters.minRating} ★</span>
        </div>
        <Slider
          id="minRating"
          min={0}
          max={5}
          step={0.5}
          value={[filters.minRating]}
          onValueChange={([value]) => handleChange("minRating", value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="sortBy">Sort By</Label>
        <Select
          value={filters.sortBy}
          onValueChange={(value) => handleChange("sortBy", value)}
        >
          <SelectTrigger id="sortBy">
            <SelectValue placeholder="Sort By" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="popularity">Popularity</SelectItem>
            <SelectItem value="rating">Rating (High to Low)</SelectItem>
            <SelectItem value="newest">Newest First</SelectItem>
            <SelectItem value="title">Title (A-Z)</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button variant="outline" className="w-full" onClick={handleReset}>
        Reset Filters
      </Button>
    </div>
  );
}
