// Required libraries
const express = require('express');
const jwt = require('jsonwebtoken');
const multer = require('multer'); // Import Multer

// Initialize Express app
const app = express();

// Example secret key for JWT (this should be a more secure value in a real application)
const JWT_SECRET_KEY = 'your_secret_key';

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Upload files to the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Use the current timestamp as the filename
  },
});

// Multer file filter configuration (optional)
const fileFilter = (req, file, cb) => {
  // Here, you can implement custom logic to accept or reject files based on their type, size, etc.
  // For example, to accept only image files, you can do:
  // if (file.mimetype.startsWith('image/')) {
  //   cb(null, true);
  // } else {
  //   cb(new Error('Only image files are allowed.'), false);
  // }
  cb(null, true); // Accept all files for this example
};

// Multer upload middleware
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
});

// Middleware for verifying JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization; // Assuming the token is sent in the 'Authorization' header

  if (!token) {
    return res.status(401).json({ message: 'No token provided.' });
  }

  jwt.verify(token, JWT_SECRET_KEY, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: 'Failed to authenticate token.' });
    }

    req.user = decoded; // Store the decoded user information in the request object
    next();
  });
};

// Middleware for all APIs except the login API and file upload API
app.use((req, res, next) => {
  if (req.path === '/api/login' || req.path === '/api/upload') {
    return next();
  }
  verifyToken(req, res, next);
});

// File upload API
app.post('/api/upload', upload.single('file'), (req, res) => {
  // Check if a file was uploaded
  if (!req.file) {
    return res.status(400).json({ message: 'No file provided.' });
  }

  // If you need to associate the uploaded file with a specific user, you can use the 'req.user' object
  // which was set by the verifyToken middleware (assuming user information is stored in the JWT token).

  // Perform additional logic or database operations with the uploaded file if needed.

  res.json({ message: 'File uploaded successfully.' });
});

// Login API
app.post('/api/login', (req, res) => {
  // Perform authentication logic here
  // If authentication is successful, generate a JWT token and return it in the response
  const user = { id: 1, username: 'example_user' };
  const token = jwt.sign(user, JWT_SECRET_KEY, { expiresIn: '1h' });
  res.json({ token });
});

// Get all users API
app.get('/api/users', (req, res) => {
  // Implement logic to get all users from the database and return them
  const users = [{ id: 1, username: 'user1' }, { id: 2, username: 'user2' }];
  res.json(users);
});

// Get single user API
app.get('/api/users/:id', (req, res) => {
  // Implement logic to get a single user by their ID from the database and return it
  const user = { id: 1, username: 'user1' };
  res.json(user);
});

// Update user API
app.put('/api/users/:id', (req, res) => {
  // Implement logic to update a user's information based on their ID in the database
  // and return the updated user
  const user = { id: 1, username: 'user1_updated' };
  res.json(user);
});

// Delete user API
app.delete('/api/users/:id', (req, res) => {
  // Implement logic to delete a user by their ID from the database
  res.json({ message: 'User deleted successfully.' });
});

// Start the server
const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
