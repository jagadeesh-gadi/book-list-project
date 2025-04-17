
import { Link } from "react-router-dom";

export function Footer() {
  return (
    <footer className="border-t bg-white py-6 md:py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          <div>
            <Link to="/" className="inline-block">
              <span className="text-xl font-bold text-book-primary font-serif">Read & Rate Realm</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              Discover your next favorite book and share your thoughts with a community of readers.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-6 md:gap-8">
            <div>
              <h3 className="text-sm font-semibold">Site Links</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link to="/" className="text-sm text-muted-foreground hover:text-book-primary">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/books" className="text-sm text-muted-foreground hover:text-book-primary">
                    Books
                  </Link>
                </li>
                <li>
                  <Link to="/register" className="text-sm text-muted-foreground hover:text-book-primary">
                    Sign Up
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold">Legal</h3>
              <ul className="mt-3 space-y-2">
                <li>
                  <Link to="/privacy" className="text-sm text-muted-foreground hover:text-book-primary">
                    Privacy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="text-sm text-muted-foreground hover:text-book-primary">
                    Terms
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div>
            <h3 className="text-sm font-semibold">Stay Connected</h3>
            <p className="mt-3 text-sm text-muted-foreground">
              Join our newsletter to receive the latest updates and reviews.
            </p>
            <div className="mt-4 flex items-center gap-4">
              <Link to="#" className="text-muted-foreground hover:text-book-primary">
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
                  className="h-5 w-5"
                >
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                </svg>
                <span className="sr-only">Facebook</span>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-book-primary">
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
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                </svg>
                <span className="sr-only">Instagram</span>
              </Link>
              <Link to="#" className="text-muted-foreground hover:text-book-primary">
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
                  className="h-5 w-5"
                >
                  <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
                </svg>
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t pt-6 text-center">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} Read & Rate Realm. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
