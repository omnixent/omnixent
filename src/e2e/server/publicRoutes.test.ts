import supertest from 'supertest';
import server from '../../lib/server';

const app = server();

describe('Testing public routes', () => {
  it('Should reply with a 200 status code on index', async () => {
    const res = await supertest(app).get('/');
    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
  });

  it('Should reply with a 200 status code on index', async () => {
    const res = await supertest(app).get('/v1/public?term=hello%20world');

    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body.cached).toBeFalsy();
    expect(res.body).toHaveProperty('result');
  });
});
