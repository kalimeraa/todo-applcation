const expect = require('chai').expect;
const request = require('supertest');
const app = require('../../../app');
const { connectDB, disconnectDB } = require('../../../config/db');

describe('POST /api/todos/create', () => {
  before(async () => {
    try {
      await connectDB();
    } catch (err) {
      console.log(err);
    }
  });

  after(async () => {
    try {
      await disconnectDB();
    } catch (err) {
      console.log(err);
    }
  });

  it('It should add new todo', async () => {
      const res = await request(app)
        .post('/api/todos/create')
        .send({ todo: 'buy milk' });
      const body = res.body;
      console.log('body',body)
      expect(body).to.contain.property('_id');
      expect(body).to.contain.property('todo');
  });

  it('It should return required field error', async () => {
    try {
      const res = await request(app).post('/api/todos/create').send({});

      const body = res.body;

      expect(body).to.contain.property('errors');
    } catch (err) {
      console.log(err);
    }
  });
});
