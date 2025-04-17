import { createReview } from "../models/reviews.js";

export const submitReview = async (req, res) => {
  const { bookId, rating, title, content } = req.body;

  if (!bookId || !rating || !title || !content) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    await createReview(bookId, rating, title, content);
    res.status(201).json({ message: "Review submitted successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to submit review" });
  }
};
