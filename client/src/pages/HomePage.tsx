
import { FeaturedBooks } from "@/components/books/FeaturedBooks";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-book-neutral py-12 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="flex flex-col justify-center space-y-4">
              <div className="space-y-2">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl font-serif text-book-primary">
                  Discover Your Next Favorite Book
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Join our community of book lovers. Read reviews, rate your favorites, and find your next literary adventure.
                </p>
              </div>
              <div className="flex flex-col gap-2 min-[400px]:flex-row">
                <Link to="/books">
                  <Button className="bg-book-primary hover:bg-book-secondary">Browse Books</Button>
                </Link>
                <Link to="/register">
                  <Button variant="outline" className="border-book-primary text-book-primary">Join the Community</Button>
                </Link>
              </div>
            </div>
            <div className="flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?q=80&w=1373&auto=format&fit=crop"
                alt="Stack of colorful books"
                className="rounded-lg shadow-xl object-cover max-h-[500px]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Featured Books Section */}
      <FeaturedBooks />

      {/* Features Section */}
      <section className="py-12 md:py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex flex-col items-center justify-center space-y-4 text-center">
            <div className="space-y-2">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif text-book-primary">
                Why Join Read & Rate Realm?
              </h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl mx-auto">
                Connect with other readers, discover new books, and share your literary opinions.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg bg-book-neutral">
              <div className="p-3 rounded-full bg-book-accent/30 text-book-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Discover New Books</h3>
              <p className="text-muted-foreground">
                Find your next read with personalized recommendations and curated lists.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg bg-book-neutral">
              <div className="p-3 rounded-full bg-book-accent/30 text-book-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M17 3a2.85 2.85 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Write Reviews</h3>
              <p className="text-muted-foreground">
                Share your thoughts and opinions on the books you've read with our community.
              </p>
            </div>
            <div className="flex flex-col items-center text-center space-y-2 p-6 rounded-lg bg-book-neutral">
              <div className="p-3 rounded-full bg-book-accent/30 text-book-primary">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-6 w-6"
                >
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
              </div>
              <h3 className="text-xl font-bold">Join the Community</h3>
              <p className="text-muted-foreground">
                Connect with fellow book lovers, participate in discussions, and build your reading network.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 bg-book-primary text-white">
        <div className="container mx-auto px-4 md:px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-serif mb-4">
            Ready to Start Your Reading Journey?
          </h2>
          <p className="max-w-[600px] mx-auto mb-8 text-book-primary-foreground/80 md:text-xl">
            Create your account today and join thousands of readers sharing their literary experiences.
          </p>
          <Link to="/register">
            <Button size="lg" className="bg-white text-book-primary hover:bg-book-accent">
              Sign Up Now
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}
