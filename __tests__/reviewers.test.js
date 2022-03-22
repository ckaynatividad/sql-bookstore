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

  it('should be able create a review', async () => {
    const res = await request(app)
      .post('/api/v1/reviewers')
      .send({ name: 'chase', company: 'thiscompany' });
  });
});
