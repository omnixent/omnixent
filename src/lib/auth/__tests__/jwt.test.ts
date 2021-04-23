import jwt from 'jsonwebtoken';
import isAuthorized from '../jwt';

const { key } = JSON.parse(process.env.OMNIXENT_JWT_SECRET!);

const testJWTEnabled = jwt.sign({ 'omx-enable-query': true }, key);

const testJWTDisabled = jwt.sign({ 'omx-enable-query': false }, key);

const testJWTWrongKey = jwt.sign({ 'omx-enable-query': false }, 'D6AMbpUGcDWrkUVc8jD41u2vbanKp');


describe('Testing JWT authorization', () => {
it('Should correctly validate a properly configured and generated JWT', () => {
    expect(isAuthorized(testJWTEnabled)).toBeTruthy();
  });

  it('Should refuse JWT with disabled query', () => {
    expect(isAuthorized(testJWTDisabled)).toBeFalsy();
  });

  it('Should throw an error because of wrong key configuration', () => {
    expect(() => isAuthorized(testJWTWrongKey)).toThrowErrorMatchingSnapshot();
  })
});
