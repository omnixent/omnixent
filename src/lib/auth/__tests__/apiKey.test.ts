import isAuthorized from '../apiKey';

describe('Testing api key authorization', () => {

  it('Should return true as the API key is valid', () => {
    expect(isAuthorized('MXwGgX1qR9Nrn3gFAvMGg6EYZfLtJC')).toBeTruthy();
  })

  it('Should return false as the API key is not valid', () => {
    expect(isAuthorized('c8a9ioTLRZRcweYB0ynoLgmvwcm6K')).toBeFalsy();
  })

});