const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const request = require('supertest');
const setup = require('../data/setup');
const Review = require('../lib/models/Review');

describe('quotable routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a review', async () => {
    const res = await request(app).post('/api/v1/reviews').send({
      rating: 5,
      reviewer: '1',
      review: 'Its impossible to read this book and not be moved. ',
      book: '1',
    });

    expect(res.body).toEqual({
      id: '2',
      rating: 5,
      reviewer: '1',
      review: 'Its impossible to read this book and not be moved. ',
      book: '1',
    });
  });

  it('should be able to get the top 100 reviews', async () => {
    for (let i = 0; i < 200; i++) {
      await Review.insert({
        rating: '4',
        reviewer: '1',
        review: 'Dumb Data',
        book: '1',
      });
    }
    const res = await request(app).get('/api/v1/reviews');

    expect(res.body.length).toEqual(100);
    expect(res.body[0]).toEqual({
      id: '1',
      rating: 5,
      review: 'Its impossible to read this book and not be moved. ',
      book: '1',
      title: 'Heartsongs: Readings for Weddings',
    });
    expect(res.body[1]).toEqual({
      id: expect.any(String),
      rating: 4,
      review: 'Dumb Data',
      book: '1',
      title: 'Heartsongs: Readings for Weddings',
    });
  });

  //test for getById
  it('gets review by Id', async () => {
    const expected = {
      id: '1',
      rating: 5,
      review: 'Its impossible to read this book and not be moved. ',
      book: '1',
      reviewer: '1',
    };
    const res = await request(app).get(`/api/v1/reviews/${expected.id}`);
    expect(res.body).toEqual(expected);
  });

  it('should be able to delete a review', async () => {
    const review = await Review.insert({
      id: expect.any(String),
      rating: 1,
      reviewer: '1',
      review: 'This book was awesome, and I am not Pinkys mom.',
      book: '1',
    });
    const res = await request(app).delete(`/api/v1/reviews/${review.id}`);

    expect(res.body).toEqual(review);
    expect(await Review.getById(review.id)).toBeNull();
  });
});
