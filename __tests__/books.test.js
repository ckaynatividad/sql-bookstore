const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');

describe('sql - books routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should create a book', async () => {
    const expected = {
      title: 'Book Title',
      publisher: '1',
      released: 2022,
    };
    const res = await request(app).post('/api/v1/books').send(expected);
    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
