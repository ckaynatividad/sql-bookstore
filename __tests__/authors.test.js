//get all
//get by id
//create

const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');

describe('cat routes', () => {
  beforeEach(() => {
    return setup(pool);
  });

  afterAll(() => {
    pool.end();
  });

  it('creates an author', async () => {
    const expected = {
      name: 'Shel Silverstein',
      dob: '9/25/1930',
      pob: 'Chicago, IL',
    };
    const res = await request(app).post('/api/v1/authors').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });
});
