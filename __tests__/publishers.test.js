const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Publisher = require('../lib/models/Publisher');
const { createPublisher } = require('../lib/models/Publisher');

describe('sql-bookstore routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('should be able to create a publisher', async () => {
    const res = await request(app).post('/api/v1/publishers').send({
      name: 'Random House',
      city: 'New York City',
      state: 'New York',
      country: 'USA',
    });
    expect(res.body).toEqual({
      id: expect.any(String),
      name: 'Random House',
      city: 'New York City',
      state: 'New York',
      country: 'USA',
    });
  });

  it('should be able to get all publishers', async () => {
    const expected = await Publisher.findAllPublisher();
    const res = await request(app).get('/api/v1/publishers');

    expect(res.body).toEqual(expected);
  });

  it('should be able to get the publishers id', async () => {
    const publisher = await createPublisher({
      id: expect.any(String),
      name: 'Random House',
      city: 'New York City',
      state: 'New York',
      country: 'USA',
    });
    const res = await request(app).get(`/api/v1/publishers/${publisher.id}`);
    expect(res.body).toEqual(publisher);
  });

  it('should be able to update the publisher', async () => {
    const expected = {
      id: expect.any(String),
      name: 'Penguin Publishers',
      city: 'New York',
      state: 'New York',
      country: 'USA',
    };

    const res = await request(app)
      .patch('/api/v1/publishers/1')
      .send({ city: 'New York' });
    expect(res.body).toEqual(expected);
  });
});
