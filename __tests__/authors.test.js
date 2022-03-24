const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Author = require('../lib/models/Author');

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
      dob: '1/1/1234',
      pob: 'Chicago, IL',
    };
    const res = await request(app).post('/api/v1/authors').send(expected);

    expect(res.body).toEqual({ id: expect.any(String), ...expected });
  });

  it('gets a list of authors', async () => {
    const expected = [
      {
        name: 'Pinky Agnew',
        id: '1',
      },
    ];
    const res = await request(app).get('/api/v1/authors');
    console.log('res.body', res.body);

    expect(res.body).toEqual(expected);
  });

  it('gets an author by id', async () => {
    const expected = {
      id: '1',
      name: 'Pinky Agnew',
      dob: '1/1/1234',
      pob: 'New Zealand',
      books: [
        {
          id: '1',
          title: 'Heartsongs: Readings for Weddings',
          released: 2004,
        },
      ],
    };
    const res = await request(app).get(`/api/v1/authors/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });
});
