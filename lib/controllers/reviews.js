const { Router } = require('express');
const Review = require('../models/Review');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const reviews = await Review.insert(req.body);
    res.json(reviews);
  } catch (error) {
    next(error);
  }
});
