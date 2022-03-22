const setup = require('../data/setup');
const app = require('../lib/app');
const request = require('supertest');
const pool = require('../lib/utils/pool');

describe('sql-bookstore routes', () => {
    beforeEach(() => {
      return setup(pool);
    });
  
    afterAll(() => {
      pool.end();
    }); 

    it('should be able to create a publisher', async () => {
        const res = await request(app).post('/api/v1/publishers').send({name: 'Random House', city: 'New York City', state: 'New York', country: 'USA'})
        expect(res.body).toEqual({
            id: expect.any(String),
            name: 'Random House', 
            city: 'New York City', 
            state: 'New York', 
            country: 'USA',
        })
    })
});