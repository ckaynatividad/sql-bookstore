const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const request = require('supertest');
const setup = require('../data/setup');

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
});
