import * as User from '../models/User.js';

export const getUser = (req, res) => {
  User.getUserById(req.params.id, (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json(result[0]);
  });
};

export const updateUser = (req, res) => {
  const updatedUser = req.body;
  User.updateUser(req.params.id, updatedUser, (err) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User updated successfully' });
  });
};
