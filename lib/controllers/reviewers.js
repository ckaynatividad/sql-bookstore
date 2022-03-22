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
  })

  .get('/:id', async (req, res, next) => {
    try {
      const reviewers = await Reviewer.getById(req.params.id);
      //   res.json(reviewers);
      const reviewersWithReviews = await reviewers.getReviews();
      res.send(reviewersWithReviews);
    } catch (error) {
      next(error);
    }
  })

  .patch('/:id', async (req, res) => {
    const reviewers = await Reviewer.updateById(req.params.id, req.body);
    res.json(reviewers);
  })

  .delete('/:id', async (req, res, next) => {
    try {
      const reviewers = await Reviewer.deleteById(req.params.id);
      res.json(reviewers);
    } catch (error) {
      next(error);
    }
  });
