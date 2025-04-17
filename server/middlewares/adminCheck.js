export const adminCheck = (req, res, next) => {
    // Your logic for admin check
    const isAdmin = req.user && req.user.role === 'admin';
    if (!isAdmin) {
      return res.status(403).json({ message: 'Forbidden: Admins only' });
    }
    next(); // If the user is admin, allow them to proceed to the next middleware or route handler
  };
  