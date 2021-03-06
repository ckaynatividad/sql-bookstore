const { Router } = require('express');
const Publisher = require('../models/Publisher');

module.exports = Router()
  .post('/', async (req, res) => {
    const createdPublisher = await Publisher.createPublisher({
      name: req.body.name,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
    });
    res.json(createdPublisher);
  })
  .get('/', async (req, res) => {
    const allPublishers = await Publisher.findAllPublisher();
    res.json(allPublishers);
  })
  .get('/:id', async (req, res) => {
    const publisherId = await Publisher.findPublisherId(req.params.id);
    const publisherWithBooks = await publisherId.getBooks();
    res.json(publisherWithBooks);
  });
