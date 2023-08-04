// index.js

const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const dbURI = process.env.MONGODB_URI || 'mongodb://localhost:27017/express-crud-api';





// Middleware to parse JSON data
app.use(express.json());

// Routes
const bookRoutes = require('./routes/bookRoutes');
app.use('/', bookRoutes);

// Start the server
console.log(dbURI)
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to the database');
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to the database', err);
  });
