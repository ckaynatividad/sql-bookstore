const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router()
  .post('/', async (req, res) => {
    const book = await Book.createBook(req.body);
    res.send(book);
  })
  .get('/', async (req, res) => {
    const books = await Book.findAllBooks();
    res.send(books);
  })
  .get('/:id', async (req, res, next) => {
    try {
      const book = await Book.findBookById(req.params.id);
      const bookWithPublisher = await book.getPublisher();
      const bookWithAuthor = await book.getAuthors();
      const bookWithReviews = await book.getReviews();
      res.send(bookWithReviews);
    } catch (error) {
      next(error);
    }
  });
