const mongoose = require('mongoose');
const Joi = require('joi');

// MongoDB schema for Book model
const BookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    }
});

// Joi schema for book validation
const bookSchema = Joi.object({
    title: Joi.string().required(),
    author: Joi.string().required(),
    year: Joi.number().integer().min(1000).max((new Date()).getFullYear()).required()
});

// Validate incoming book data
BookSchema.methods.validateBook = function (bookData) {
    return bookSchema.validate(bookData);
};

module.exports = mongoose.model('Book', BookSchema);