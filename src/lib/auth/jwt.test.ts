import jwt from 'jsonwebtoken';
import isAuthorized from './jwt';

const originalEnv = process.env;

process.env.OMNIXENT_JWT_SECRET = '{"type":"HS256","key":"D8CcNcPvNftvyPS6fKAgT6TQ5CXRN5xVP5"}';

const { key } = JSON.parse(process.env.OMNIXENT_JWT_SECRET);

const testJWTEnabled = jwt.sign({ 'omx-enable-query': true }, key);

const testJWTDisabled = jwt.sign({ 'omx-enable-query': false }, key);

const header = (jwt: string) => `Bearer ${jwt}`;

describe('Testing "isAuthorized" function', () => {
  afterAll(() => {
    process.env = originalEnv;
  });
  it('Should correctly validate a properly configured and generated JWT', () => {
    expect(isAuthorized(header(testJWTEnabled))).toBeTruthy();
  });

  it('Should refuse JWT with disabled query', () => {
    expect(isAuthorized(header(testJWTDisabled))).toBeFalsy();
  });
});
