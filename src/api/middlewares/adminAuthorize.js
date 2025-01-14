exports.authorizeAdmin = (req, res, next) => {
  try {
    const { role } = req.user;
    if (role !== 'Admin') {
      return res.status(403).json({ message: 'Access denied. Admins only.' });
    }
    next();
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
  }
};

