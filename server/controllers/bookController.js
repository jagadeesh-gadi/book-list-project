// controllers/bookController.js
import db from '../db.js';  // Ensure your database connection is correct

// Get all books
export const getBooks = (req, res) => {
  db.query('SELECT * FROM books', (err, results) => {
    if (err) {
      console.error('❌ Error fetching books:', err);
      return res.status(500).json({ error: 'Error fetching books' });
    }
    res.status(200).json(results);  // Send the books as a response
  });
};

// Get a single book by ID
export const getBook = (req, res) => {
  const { id } = req.params;  // Get the ID from the URL parameters
  db.query('SELECT * FROM books WHERE id = ?', [id], (err, result) => {
    if (err) {
      console.error('❌ Error fetching book:', err);
      return res.status(500).json({ error: 'Error fetching book' });
    }
    if (!result.length) {
      return res.status(404).json({ error: 'Book not found' });
    }
    res.status(200).json(result[0]);  // Send the book details as a response
  });
};

// Create a new book
export const createBook = (req, res) => {
  const { title, author, description } = req.body;  // Extract the book details from the body
  if (!title || !author || !description) {
    return res.status(400).json({ error: 'All fields (title, author, description) are required' });
  }
  const query = 'INSERT INTO books (title, author, description) VALUES (?, ?, ?)';
  db.query(query, [title, author, description], (err, result) => {
    if (err) {
      console.error('❌ Error creating book:', err);
      return res.status(500).json({ error: 'Error creating book' });
    }
    res.status(201).json({ message: 'Book created successfully', bookId: result.insertId });
  });
};
