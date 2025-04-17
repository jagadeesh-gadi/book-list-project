
import { Book } from "@/types/book";
import { Review } from "@/types/review";

// Mock data for featured books
const mockFeaturedBooks: Book[] = [
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
  {
    id: "5",
    title: "Mexican Gothic",
    author: "Silvia Moreno-Garcia",
    coverImage: "https://images.unsplash.com/photo-1645131566973-536874661bb8?q=80&w=1374&auto=format&fit=crop",
    description: "An isolated mansion in the Mexican countryside hides secrets and malevolent intentions.",
    averageRating: 4.0,
    reviewCount: 72,
    genres: ["Horror", "Gothic", "Historical Fiction"],
    publicationDate: "2020-06-30",
    publisher: "Del Rey",
    pageCount: 320,
    featured: true
  },
  {
    id: "6",
    title: "Educated",
    author: "Tara Westover",
    coverImage: "https://images.unsplash.com/photo-1508169351866-777fc0047ac5?q=80&w=1470&auto=format&fit=crop",
    description: "A memoir about a young girl who, kept out of school, leaves her survivalist family and goes on to earn a PhD from Cambridge University.",
    averageRating: 4.7,
    reviewCount: 134,
    genres: ["Memoir", "Biography", "Nonfiction"],
    publicationDate: "2018-02-20",
    publisher: "Random House",
    pageCount: 334,
    featured: true
  }
];

// Mock data for all books
const mockBooks: Book[] = [
  ...mockFeaturedBooks,
  {
    id: "7",
    title: "The Song of Achilles",
    author: "Madeline Miller",
    coverImage: "https://images.unsplash.com/photo-1629992101753-56d196c8aabb?q=80&w=1470&auto=format&fit=crop",
    description: "A tale of gods, kings, immortal fame, and the human heart.",
    averageRating: 4.4,
    reviewCount: 82,
    genres: ["Historical Fiction", "Fantasy", "Mythology"],
    publicationDate: "2012-03-06",
    publisher: "Ecco",
    pageCount: 378,
    featured: false
  },
  {
    id: "8",
    title: "Atomic Habits",
    author: "James Clear",
    coverImage: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?q=80&w=1470&auto=format&fit=crop",
    description: "Tiny Changes, Remarkable Results: An Easy & Proven Way to Build Good Habits & Break Bad Ones.",
    averageRating: 4.8,
    reviewCount: 165,
    genres: ["Self-Help", "Personal Development", "Psychology"],
    publicationDate: "2018-10-16",
    publisher: "Avery",
    pageCount: 320,
    featured: false
  },
  {
    id: "9",
    title: "A Gentleman in Moscow",
    author: "Amor Towles",
    coverImage: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=1374&auto=format&fit=crop",
    description: "The story of Count Alexander Rostov, who is sentenced to spend the rest of his life inside a luxury hotel.",
    averageRating: 4.6,
    reviewCount: 97,
    genres: ["Historical Fiction", "Literary Fiction"],
    publicationDate: "2016-09-06",
    publisher: "Viking",
    pageCount: 462,
    featured: false
  },
  {
    id: "10",
    title: "Where the Crawdads Sing",
    author: "Delia Owens",
    coverImage: "https://images.unsplash.com/photo-1495556650867-99590cea3657?q=80&w=1470&auto=format&fit=crop",
    description: "A murder mystery, a coming-of-age narrative, and a celebration of nature all rolled into one.",
    averageRating: 4.5,
    reviewCount: 143,
    genres: ["Literary Fiction", "Mystery", "Coming of Age"],
    publicationDate: "2018-08-14",
    publisher: "G.P. Putnam's Sons",
    pageCount: 384,
    featured: false
  }
];

// Mock reviews data
const mockReviews: Review[] = [
  {
    id: "1",
    bookId: "1",
    userId: "101",
    user: {
      id: "101",
      name: "Sarah Johnson",
      avatar: "https://i.pravatar.cc/150?img=1"
    },
    rating: 4.5,
    title: "Thought-provoking and beautiful",
    content: "This book made me reconsider so many choices in my life. The concept is fascinating and the execution is flawless. Highly recommend for anyone going through a difficult time.",
    date: "2022-05-12T14:32:00Z"
  },
  {
    id: "2",
    bookId: "1",
    userId: "102",
    user: {
      id: "102",
      name: "Michael Chen",
      avatar: "https://i.pravatar.cc/150?img=2"
    },
    rating: 3.5,
    title: "Interesting concept but slow at times",
    content: "While I enjoyed the philosophical aspects of this book, I found some sections dragged on too long. Still, the ending was satisfying and made the journey worthwhile.",
    date: "2022-06-23T09:17:00Z"
  },
  {
    id: "3",
    bookId: "2",
    userId: "103",
    user: {
      id: "103",
      name: "Emily Davis",
      avatar: "https://i.pravatar.cc/150?img=3"
    },
    rating: 5,
    title: "My favorite sci-fi novel in years!",
    content: "If you loved The Martian, you'll absolutely devour this book. The science is fascinating, the characters are compelling, and the story kept me on the edge of my seat from start to finish.",
    date: "2022-04-17T18:45:00Z"
  }
];

// Simulated API calls with delays
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export async function getFeaturedBooks(): Promise<Book[]> {
  // Simulating network delay
  await delay(800);
  return mockFeaturedBooks;
}

export async function getAllBooks(filters?: {
  search?: string;
  genre?: string;
  minRating?: number;
  author?: string;
  sortBy?: string;
}): Promise<Book[]> {
  // Simulating network delay
  await delay(1000);
  
  let filteredBooks = [...mockBooks];
  
  if (filters) {
    // Apply search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase();
      filteredBooks = filteredBooks.filter(
        book => 
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower) ||
          book.description.toLowerCase().includes(searchLower)
      );
    }
    
    // Apply genre filter
    if (filters.genre) {
      filteredBooks = filteredBooks.filter(book => 
        book.genres.some(g => g.toLowerCase() === filters.genre?.toLowerCase())
      );
    }
    
    // Apply rating filter
    if (filters.minRating !== undefined && filters.minRating > 0) {
      filteredBooks = filteredBooks.filter(book => book.averageRating >= filters.minRating!);
    }
    
    // Apply author filter
    if (filters.author) {
      const authorLower = filters.author.toLowerCase();
      filteredBooks = filteredBooks.filter(book => 
        book.author.toLowerCase().includes(authorLower)
      );
    }
    
    // Apply sorting
    if (filters.sortBy) {
      switch (filters.sortBy) {
        case 'popularity':
          filteredBooks.sort((a, b) => b.reviewCount - a.reviewCount);
          break;
        case 'rating':
          filteredBooks.sort((a, b) => b.averageRating - a.averageRating);
          break;
        case 'newest':
          filteredBooks.sort((a, b) => 
            new Date(b.publicationDate).getTime() - new Date(a.publicationDate).getTime()
          );
          break;
        case 'title':
          filteredBooks.sort((a, b) => a.title.localeCompare(b.title));
          break;
      }
    }
  }
  
  return filteredBooks;
}

export async function getBookById(id: string): Promise<Book | null> {
  // Simulating network delay
  await delay(600);
  const book = mockBooks.find(book => book.id === id);
  return book || null;
}

export async function getReviewsForBook(bookId: string): Promise<Review[]> {
  // Simulating network delay
  await delay(700);
  return mockReviews.filter(review => review.bookId === bookId);
}

export async function submitReview(review: {
  bookId: string;
  rating: number;
  title: string;
  content: string;
}): Promise<Review> {
  // Simulating network delay and review submission
  await delay(1200);
  
  // In a real app, this would be created on the server
  const newReview: Review = {
    id: `review-${Date.now()}`,
    bookId: review.bookId,
    userId: "current-user",
    user: {
      id: "current-user",
      name: "Current User",
      avatar: "https://i.pravatar.cc/150?img=5"
    },
    rating: review.rating,
    title: review.title,
    content: review.content,
    date: new Date().toISOString()
  };
  
  // This would be saved on the server in a real app
  mockReviews.push(newReview);
  
  return newReview;
}
