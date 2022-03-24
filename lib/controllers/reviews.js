const { Router } = require('express');
const res = require('express/lib/response');
const Review = require('../models/Review');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const reviews = await Review.insert(req.body);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  })
  .get('/', async (req, res, next) => {
    try {
      const reviews = await Review.findAllReviews();
      res.send(reviews);
    } catch (error) {
      next(error);
    }
  })
  .get('/:id', async (req, res, next) => {
    try {
      const reviews = await Review.getById(req.params.id);
      res.send(reviews);
    } catch (error) {
      next(error);
    }
  })
  .delete('/:id', async (req, res, next) => {
    try {
      const reviews = await Review.deleteById(req.params.id);
      res.json(reviews);
    } catch (error) {
      next(error);
    }
  });
