const { Router } = require('express');
const Reviewer = require('../models/Reviewer');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const reviewers = await Reviewer.insert(req.body);
      res.json(reviewers);
    } catch (error) {
      next(error);
    }
  })

  .get('/', async (req, res, next) => {
    try {
      const reviewers = await Reviewer.getAll();
      res.json(reviewers);
    } catch (error) {
      next(error);
    }
  });
