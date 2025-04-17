import db from '../db.js'; // MySQL connection

// Create a new review
export const createReview = async (bookId, rating, title, content) => {
  return new Promise((resolve, reject) => {
    const query = `INSERT INTO reviews (book_id, rating, title, content) VALUES (?, ?, ?, ?)`;
    db.query(query, [bookId, rating, title, content], (err, result) => {
      if (err) {
        return reject(err);
      }
      resolve(result);
    });
  });
};

// Get reviews for a specific book
export const getReviews = async (bookId) => {
  return new Promise((resolve, reject) => {
    const query = `SELECT * FROM reviews WHERE book_id = ?`;
    db.query(query, [bookId], (err, results) => {
      if (err) {
        return reject(err);
      }
      resolve(results); // Return all reviews for the specified book
    });
  });
};
