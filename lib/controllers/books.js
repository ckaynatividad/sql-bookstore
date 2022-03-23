const { Router } = require('express');
const Book = require('../models/Book');

module.exports = Router().post('/', async (req, res) => {
  const book = await Book.createBook(req.body);
  res.send(book);
});
