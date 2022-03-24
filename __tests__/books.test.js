const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');
const Book = require('../lib/models/Book');

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

  it('gets list of books', async () => {
    const expected = [
      {
        title: 'Heartsongs: Readings for Weddings',
        id: '1',
        publisher: '1',
        released: 2004,
      },
    ];
    const res = await request(app).get('/api/v1/books');

    expect(res.body).toEqual(expected);
  });

  it('gets book by id', async () => {
    const expected = {
      id: '1',
      title: 'Heartsongs: Readings for Weddings',
      publisher: '1',
      released: 2004,
      publishers: [
        {
          id: '1',
          name: 'Penguin Publishers',
        },
      ],
      authors: [
        {
          id: '1',
          name: 'Pinky Agnew',
        },
      ],
      reviews: [
        {
          review_id: '1',
          rating: 5,
          review: 'Its impossible to read this book and not be moved. ',
          reviewer: {
            reviewer_id: '1',
            name: 'Amazon Customer',
          },
        },
      ],
    };
    const res = await request(app).get(`/api/v1/books/${expected.id}`);

    expect(res.body).toEqual({ ...expected });
  });
});
