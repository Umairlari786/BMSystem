const Joi = require('joi');
const Book = require('../models/Book');

// Joi schema for book validation
const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().integer().min(1000).max((new Date()).getFullYear()).required()
});

// Controller methods for CRUD operations
// Get all books
exports.getAllBooks = async (req, res, next) => {
    try {
        const books = await Book.find();
        res.json(books);
    } catch (err) {
        next(err);
    }
};

// Get a book by ID
exports.getBookById = async (req, res, next) => {
    try {
        const book = await Book.findById(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        next(err);
    }
};

// Create a new book
exports.createBook = async (req, res, next) => {
    try {
        // Validate request body
        const { error, value } = bookSchema.validate(req.body);
        if (error) {
            return res.status(400).json({ message: error.details[0].message });
        }

        const book = new Book(value);
        await book.save();
        res.status(201).json(book);
    } catch (err) {
        next(err);
    }
};

// Update a book by ID
exports.updateBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        next(err);
    }
};

// Delete a book by ID
exports.deleteBook = async (req, res, next) => {
    try {
        const book = await Book.findByIdAndDelete(req.params.id);
        if (!book) {
            return res.status(404).json({ message: 'Book not found' });
        }
        res.json({ message: 'Book deleted successfully' });
    } catch (err) {
        next(err);
    }
};
