import supertest from 'supertest';
import jwt from 'jsonwebtoken';
import server from '../../lib/server';

const app = server();

describe('Testing private routes', () => {
  it('Should reply with a 401 status when not authorized', async () => {
    const res = await supertest(app).get('/v1/private?term=hello%20world');

    expect(res.status).toBe(401);
    expect(res.body.success).toBeFalsy();
    expect(res.body).toHaveProperty('reason');
  });

  it('Should reply with a 401 status when api key is not defined in env', async () => {
    const res = await supertest(app)
      .get('/v1/private?term=hello%20world')
      .set('x-omnixent-auth', 'wrong-api-key-or-jwt');

    expect(res.status).toBe(401);
    expect(res.body.success).toBeFalsy();
    expect(res.body).toHaveProperty('reason');
  });

  it('Should reply with a 401 status code with a correct JWT set as auth header, but with disabled queries', async () => {
    const { key } = JSON.parse(process.env.OMNIXENT_JWT_SECRET!);
    const testJWTEnabled = jwt.sign({ 'omx-enable-query': false }, key);

    const res = await supertest(app)
      .get('/v1/private?term=hello%20world&service=bing&language=en&country=us')
      .set('x-omnixent-auth', testJWTEnabled);

    expect(res.status).toBe(401);
    expect(res.body.success).toBeFalsy();
    expect(res.body).toHaveProperty('reason');
  });

  it('Should reply with a 200 status code with a correct API key set as auth header', async () => {
    const res = await supertest(app)
      .get('/v1/private?term=hello%20world&service=bing&language=en&country=us')
      .set('x-omnixent-auth', 'JHgjQporKoi9rCD1wqkNNAirVBzRod');

    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body).toHaveProperty('result');
    expect(res.body).toHaveProperty('cached');
  });

  it('Should reply with a 200 status code with a correct JWT set as auth header', async () => {
    const { key } = JSON.parse(process.env.OMNIXENT_JWT_SECRET!);
    const testJWTEnabled = jwt.sign({ 'omx-enable-query': true }, key);

    const res = await supertest(app)
      .get('/v1/private?term=hello%20world&service=bing&language=en&country=us')
      .set('x-omnixent-auth', testJWTEnabled);

    expect(res.status).toBe(200);
    expect(res.body.success).toBeTruthy();
    expect(res.body).toHaveProperty('result');
    expect(res.body).toHaveProperty('cached');
  });
});
