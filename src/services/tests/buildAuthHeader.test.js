import buildAuthHeader from '../buildAuthHeader';

describe('buildAuthHeader', () => {
  it('should return an object with the authorization bearer if the userJWT received exists', () => {
    const mockedUserJwt = 'fakeJWTCode';
    const expectedReturn = { 'Authorization': `Bearer ${mockedUserJwt}` };
    expect(buildAuthHeader(mockedUserJwt)).toEqual(expectedReturn);
  });

  it('should return an empty object when the userJWT is undefined', () => {
    const expectedReturn = {};
    expect(buildAuthHeader()).toEqual(expectedReturn);
  });
});