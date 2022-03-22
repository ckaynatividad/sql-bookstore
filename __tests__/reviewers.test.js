const pool = require('../lib/utils/pool');
const app = require('../lib/app');
const request = require('supertest');
const setup = require('../data/setup');
const Reviewer = require('../lib/models/Reviewer');

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

  it('should be able to list all reviewers', async () => {
    const expected = await Reviewer.insert({
      name: 'chase',
      company: 'thiscompany',
    });
    const res = await request(app).get('/api/v1/reviewers');

    expect(res.body).toEqual([
      {
        id: expect.any(String),
        name: 'Amazon Customer',
        company: 'Amazon',
      },
      {
        id: expect.any(String),
        name: 'chase',
        company: 'thiscompany',
      },
    ]);
  });

  it('should be able to list reviews by id', async () => {
    const reviewers = {
      id: '1',
      name: 'Amazon Customer',
      company: 'Amazon',
    };
    const res = await request(app).get(`/api/v1/reviewers/${reviewers.id}`);

    expect(res.body).toEqual(reviewers);
  });

  it('should be able to update a review', async () => {
    const reviewers = { id: '1', name: 'Amazon Customer', company: 'Amazon' };
    const res = await request(app)
      .patch(`/api/v1/reviewers/${reviewers.id}`)
      .send({ name: 'Amazon Customer 2' });

    const expected = {
      id: '1',
      name: 'Amazon Customer 2',
      company: 'Amazon',
    };

    expect(res.body).toEqual(expected);
    expect(await Reviewer.getById(reviewers.id)).toEqual(expected);
  });

  it('should be able to delete a review', async () => {
    const reviewers = await Reviewer.insert({
      id: expect.any(String),
      name: 'chase',
      company: 'thiscompany',
    });
    const res = await request(app).delete(`/api/v1/reviewers/${reviewers.id}`);

    expect(res.body).toEqual(reviewers);
    expect(await Reviewer.getById(reviewers.id)).toBeNull();
  });
});
