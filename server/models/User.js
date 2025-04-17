import db from '../db.js';

export const getUserById = (id, callback) => {
  const sql = 'SELECT * FROM users WHERE id = ?';
  db.query(sql, [id], callback);
};

export const updateUser = (id, user, callback) => {
  const sql = 'UPDATE users SET name = ?, email = ? WHERE id = ?';
  db.query(sql, [user.name, user.email, id], callback);
};
