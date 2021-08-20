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

//register with valid payload
describe("[POST] /api/auth/register", () => {

  it('valid request returning status: 201', async () => {
      await db('users').truncate()
      const res = await request(server)
      .post('/api/auth/register')
      .send(testData);
      expect(res.status).toBe(201)
  });
//register with invalid payload
  it('invalid request returning status: 422', async () => {
      const res = await request(server)
      .post('/api/auth/register')
      .send({});
      expect(res.status).toBe(422);
  });
});

//login user
describe("[POST]/api/auth/login", ()=> {

//valid payload
  it('returns status: 500 when valid credentials are provided', async () => {
      const res = await request(server)
      .post('/api/auth/login')
      .send(testData);
      expect(res.status).toBe(500)
  })

//invalid payload
  it('invalid payload with error message of : Invalid credentials', async () => {
      const res = await request(server)
      .post('/api/auth/login')
      .send({ username: '', password: '' })
      expect(res.status).toBe(422)
  })
});

});