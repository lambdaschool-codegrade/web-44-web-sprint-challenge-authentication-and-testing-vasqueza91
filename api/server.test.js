// Write your tests here
const request = require('supertest')
const server = require('./server')
const db = require('../data/dbConfig')

const testData = { username: 'AlexV', password: 'VAlex'}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})



test('sanity', () => {
  expect(true).toBe(true)
})

describe('server.js', () => {

  describe('[GET] /api/jokes', () => {

      it('should return 401', async () => {
          const res = await request(server).get('/api/jokes')
      expect(res.status).toBe(401);
      });
      
      it('should return json', async() => {
          const res = await request(server).get('/api/jokes');
          expect(res.type).toBe('application/json')
      });
  });

});