const { Router } = require('express');
const Author = require('../models/Author');

module.exports = Router()
  .post('/', async (req, res) => {
    const author = await Author.createAuthor(req.body);
    res.send(author);
  })

  .get('/', async (req, res) => {
    const authors = await Author.findAllAuthors();
    res.send(authors);
  })

  .get('/:id', async (req, res, next) => {
    try {
      const author = await Author.findAuthorById(req.params.id);
      const authorsWithBooks = await author.getBook();
      res.send(authorsWithBooks);
    } catch (error) {
      error.status = 404;
      next(error);
    }
  });
