import express from 'express';
import { getBooks, getBook, createBook } from '../controllers/bookController.js'; // Assuming you have these functions
import { adminCheck } from '../middlewares/adminCheck.js';  // Ensure this path is correct


const router = express.Router();

// Routes
router.get('/', getBooks); // Get all books
router.get('/:id', getBook); // Get a single book by ID
router.post('/', adminCheck, createBook); // Create a new book (admin only)

export default router;
