
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { BookCard } from "@/components/books/BookCard";
import { ReviewCard } from "@/components/books/ReviewCard";
import { Book } from "@/types/book";
import { Review } from "@/types/review";
import { Edit, BookOpen, Star, List, Settings } from "lucide-react";

// Mock user data
const userData = {
  id: "user-1",
  name: "Alice Johnson",
  username: "alicereads",
  bio: "Avid reader | Book lover | Fantasy & Mystery enthusiast",
  avatar: "https://i.pravatar.cc/150?img=5",
  joinedDate: "2023-01-15",
  booksRead: 84,
  reviewsWritten: 47,
  following: 152,
  followers: 98,
};

// Mock reading lists
const readingLists = [
  {
    id: "list-1",
    name: "Currently Reading",
    books: 3,
  },
  {
    id: "list-2",
    name: "Want to Read",
    books: 15,
  },
  {
    id: "list-3",
    name: "Favorites",
    books: 8,
  },
  {
    id: "list-4",
    name: "Fantasy Books",
    books: 12,
  },
];

// Mock books (reused from bookService.ts)
const userBooks: Book[] = [
  {
    id: "1",
    title: "The Midnight Library",
    author: "Matt Haig",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=687&auto=format&fit=crop",
    description: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.",
    averageRating: 4.2,
    reviewCount: 128,
    genres: ["Fiction", "Fantasy", "Contemporary"],
    publicationDate: "2020-08-13",
    publisher: "Canongate Books",
    pageCount: 304,
    featured: true
  },
  {
    id: "2",
    title: "Project Hail Mary",
    author: "Andy Weir",
    coverImage: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=687&auto=format&fit=crop",
    description: "Ryland Grace is the sole survivor on a desperate mission - and if he fails, humanity and the earth itself will perish.",
    averageRating: 4.5,
    reviewCount: 89,
    genres: ["Science Fiction", "Adventure", "Space"],
    publicationDate: "2021-05-04",
    publisher: "Ballantine Books",
    pageCount: 496,
    featured: true
  },
  {
    id: "3",
    title: "Klara and the Sun",
    author: "Kazuo Ishiguro",
    coverImage: "https://images.unsplash.com/photo-1495640388908-05fa85288e61?q=80&w=687&auto=format&fit=crop",
    description: "From the Nobel Prize-winning author, a powerful story about an artificial friend designed to be a child's companion.",
    averageRating: 3.8,
    reviewCount: 56,
    genres: ["Science Fiction", "Literary Fiction"],
    publicationDate: "2021-03-02",
    publisher: "Faber & Faber",
    pageCount: 320,
    featured: true
  },
  {
    id: "4",
    title: "The Invisible Life of Addie LaRue",
    author: "V.E. Schwab",
    coverImage: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1374&auto=format&fit=crop",
    description: "A life no one will remember. A story you will never forget. A young woman makes a Faustian bargain to live forever―and is cursed to be forgotten by everyone she meets.",
    averageRating: 4.3,
    reviewCount: 105,
    genres: ["Fantasy", "Historical Fiction", "Romance"],
    publicationDate: "2020-10-06",
    publisher: "Tor Books",
    pageCount: 448,
    featured: true
  },
];

// Mock reviews
const userReviews: Review[] = [
  {
    id: "r1",
    bookId: "1",
    userId: "user-1",
    user: {
      id: "user-1",
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    rating: 4.5,
    title: "A beautiful exploration of choices and regrets",
    content: "This book made me reconsider so many choices in my life. The concept is fascinating and the execution is flawless. Highly recommend for anyone going through a difficult time.",
    date: "2022-05-12T14:32:00Z"
  },
  {
    id: "r2",
    bookId: "2",
    userId: "user-1",
    user: {
      id: "user-1",
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    rating: 5,
    title: "Absolutely brilliant sci-fi",
    content: "If you loved The Martian, you'll absolutely devour this book. The science is fascinating, the characters are compelling, and the story kept me on the edge of my seat from start to finish.",
    date: "2022-04-17T18:45:00Z"
  },
  {
    id: "r3",
    bookId: "3",
    userId: "user-1",
    user: {
      id: "user-1",
      name: "Alice Johnson",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    rating: 3.5,
    title: "Thought-provoking but slow",
    content: "While the concepts explored in this book are fascinating, I found the pacing to be quite slow. The writing is beautiful as expected from Ishiguro, but the story didn't captivate me as much as I had hoped.",
    date: "2022-07-03T10:25:00Z"
  },
];

export default function UserProfilePage() {
  const [activeTab, setActiveTab] = useState("books");

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Profile Header */}
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-shrink-0 flex flex-col items-center md:items-start">
            <Avatar className="h-24 w-24 md:h-32 md:w-32">
              <AvatarImage src={userData.avatar} alt={userData.name} />
              <AvatarFallback>{userData.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <Button 
              variant="outline" 
              size="sm" 
              className="mt-3 md:hidden"
            >
              <Edit className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
          </div>
          
          <div className="flex-1 space-y-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
              <div>
                <h1 className="text-2xl font-bold font-serif text-book-primary">{userData.name}</h1>
                <p className="text-muted-foreground">@{userData.username}</p>
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="hidden md:flex mt-2 md:mt-0"
              >
                <Edit className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </div>
            
            <p className="text-muted-foreground">{userData.bio}</p>
            
            <div className="flex justify-between max-w-md">
              <div className="text-center">
                <p className="font-bold text-book-primary">{userData.booksRead}</p>
                <p className="text-sm text-muted-foreground">Books Read</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-book-primary">{userData.reviewsWritten}</p>
                <p className="text-sm text-muted-foreground">Reviews</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-book-primary">{userData.following}</p>
                <p className="text-sm text-muted-foreground">Following</p>
              </div>
              <div className="text-center">
                <p className="font-bold text-book-primary">{userData.followers}</p>
                <p className="text-sm text-muted-foreground">Followers</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Profile Content */}
      <Tabs defaultValue="books" value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="books" className="flex items-center">
            <BookOpen className="h-4 w-4 mr-2" />
            Books
          </TabsTrigger>
          <TabsTrigger value="reviews" className="flex items-center">
            <Star className="h-4 w-4 mr-2" />
            Reviews
          </TabsTrigger>
          <TabsTrigger value="lists" className="flex items-center">
            <List className="h-4 w-4 mr-2" />
            Reading Lists
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center">
            <Settings className="h-4 w-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>
        
        {/* Books Tab */}
        <TabsContent value="books">
          <div>
            <h2 className="text-xl font-semibold mb-4 font-serif">Recently Read</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {userBooks.map((book) => (
                <BookCard key={book.id} book={book} />
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Reviews Tab */}
        <TabsContent value="reviews">
          <div>
            <h2 className="text-xl font-semibold mb-4 font-serif">My Reviews</h2>
            <div className="space-y-6">
              {userReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Reading Lists Tab */}
        <TabsContent value="lists">
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold font-serif">My Reading Lists</h2>
              <Button size="sm" className="bg-book-primary hover:bg-book-secondary">
                Create New List
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {readingLists.map((list) => (
                <div 
                  key={list.id}
                  className="border rounded-lg p-4 hover:border-book-primary transition-colors"
                >
                  <h3 className="font-semibold text-lg mb-1">{list.name}</h3>
                  <p className="text-muted-foreground text-sm">{list.books} books</p>
                  <Button 
                    variant="link" 
                    className="p-0 h-auto text-book-primary mt-2"
                  >
                    View List
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        
        {/* Settings Tab */}
        <TabsContent value="settings">
          <div className="max-w-2xl">
            <h2 className="text-xl font-semibold mb-6 font-serif">Account Settings</h2>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <h3 className="font-medium">Email Notifications</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="notify-comments"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-book-primary focus:ring-book-primary"
                  />
                  <label htmlFor="notify-comments">Notify me about comments on my reviews</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="notify-follows"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-book-primary focus:ring-book-primary"
                  />
                  <label htmlFor="notify-follows">Notify me about new followers</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="notify-recs"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-book-primary focus:ring-book-primary"
                  />
                  <label htmlFor="notify-recs">Book recommendations</label>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium">Privacy</h3>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="public-profile"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-book-primary focus:ring-book-primary"
                  />
                  <label htmlFor="public-profile">Make my profile public</label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="share-reading"
                    defaultChecked
                    className="h-4 w-4 rounded border-gray-300 text-book-primary focus:ring-book-primary"
                  />
                  <label htmlFor="share-reading">Share my reading activity</label>
                </div>
              </div>
              
              <div className="pt-4">
                <Button className="bg-book-primary hover:bg-book-secondary">Save Changes</Button>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
