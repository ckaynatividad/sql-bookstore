const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router().post('/', async (req, res, next) => {
  try {
    const reviewers = await Reviewer.insert(req.body);
    res.json(reviewers);
  } catch (error) {
    next(error);
  }
});
