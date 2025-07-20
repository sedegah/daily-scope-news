
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";
import { Moon, Sun, Search, Menu } from "lucide-react";

interface NavbarProps {
  toggleTheme: () => void;
  isDarkMode: boolean;
}

const categories = [
  { name: "Politics", slug: "politics" },
  { name: "Technology", slug: "technology" },
  { name: "Sports", slug: "sport" },
  { name: "World", slug: "world" },
  { name: "Business", slug: "business" },
  { name: "Culture", slug: "culture" },
];

const Navbar = ({ toggleTheme, isDarkMode }: NavbarProps) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm">
      <div className="container flex h-16 md:h-18 items-center">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center">
            <Link to="/" className="font-display font-bold text-2xl md:text-3xl mr-6 text-news-red">
              Daily Scope
            </Link>
            
            <nav className="hidden md:flex items-center gap-6">
              {categories.map((category) => (
                <Link
                  key={category.slug}
                  to={`/category/${category.slug}`}
                  className="text-sm font-medium hover:text-news-red transition-colors uppercase tracking-wide"
                >
                  {category.name}
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <form onSubmit={handleSearch} className="hidden md:flex relative">
              <Input
                type="search"
                placeholder="Search articles..."
                className="w-[200px] lg:w-[300px]"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <Button 
                variant="ghost" 
                size="icon" 
                className="absolute right-0"
                type="submit"
              >
                <Search className="h-4 w-4" />
              </Button>
            </form>

            <Button
              variant="ghost"
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
              className="rounded-full hover:bg-muted"
            >
              {isDarkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </Button>

            <div className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                aria-label="Toggle menu"
                className="rounded-full hover:bg-muted"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="container md:hidden pb-4 pt-2 animate-fade-in bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
          <form onSubmit={handleSearch} className="mb-4 relative">
            <Input
              type="search"
              placeholder="Search articles..."
              className="w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Button 
              variant="ghost" 
              size="icon" 
              className="absolute right-0 top-0"
              type="submit"
            >
              <Search className="h-4 w-4" />
            </Button>
          </form>
          
          <div className="grid grid-cols-2 gap-2">
            {categories.map((category) => (
              <Link
                key={category.slug}
                to={`/category/${category.slug}`}
                className="text-sm font-medium py-2 hover:text-news-red transition-colors uppercase tracking-wide"
                onClick={() => setIsMenuOpen(false)}
              >
                {category.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
