import db from '../db.js';

export const getAllBooks = (callback) => {
  const sql = 'SELECT * FROM books';
  db.query(sql, callback);
};

export const getBookById = (id, callback) => {
  const sql = 'SELECT * FROM books WHERE id = ?';
  db.query(sql, [id], callback);
};

export const addBook = (book, callback) => {
  const sql = 'INSERT INTO books (title, author, description) VALUES (?, ?, ?)';
  db.query(sql, [book.title, book.author, book.description], callback);
};
