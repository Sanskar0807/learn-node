// controllers/bookController.js

const Joi = require('joi');
const Book = require('../models/book');

const bookController = {
  // ... other controller functions ...

  createBook: async (req, res) => {
    try {
      // Define a schema for request validation
      const schema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        genre: Joi.string(),
        publishedYear: Joi.number().integer(),
      });

      // Validate the request body against the schema
      const { error } = schema.validate(req.body);

      if (error) {
        // If validation fails, send a 400 Bad Request response with the error details
        return res.status(400).json({ error: error.details[0].message });
      }

      // If validation passes, create the book
      const book = await Book.create(req.body);
      res.status(201).json(book);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  updateBook: async (req, res) => {
    try {
      // Define a schema for request validation
      const schema = Joi.object({
        title: Joi.string(),
        author: Joi.string(),
        genre: Joi.string(),
        publishedYear: Joi.number().integer(),
      }).min(1); // Require at least one field to be updated

      // Validate the request body against the schema
      const { error } = schema.validate(req.body);

      if (error) {
        // If validation fails, send a 400 Bad Request response with the error details
        return res.status(400).json({ error: error.details[0].message });
      }

      // If validation passes, update the book
      const book = await Book.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!book) {
        return res.status(404).json({ error: 'Book not found' });
      }
      res.json(book);
    } catch (err) {
      res.status(400).json({ error: 'Invalid data' });
    }
  },
};

module.exports = bookController;
