import express from 'express';
import { createReview, getReviews } from '../models/review.js';  // Import the functions from the model

const router = express.Router();

// Route to create a new review
router.post('/', async (req, res) => {
  const { bookId, rating, title, content } = req.body;

  try {
    // Call the createReview function from the model
    const result = await createReview(bookId, rating, title, content);
    res.status(201).json({
      message: 'Review created successfully',
      reviewId: result.insertId,  // Inserted ID of the new review
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create review' });
  }
});

// Route to get all reviews for a specific book
router.get('/:bookId', async (req, res) => {
  const { bookId } = req.params;

  try {
    // Call the getReviews function from the model
    const reviews = await getReviews(bookId);
    if (reviews.length === 0) {
      return res.status(404).json({ message: 'No reviews found for this book' });
    }
    res.status(200).json(reviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch reviews' });
  }
});

export default router;
