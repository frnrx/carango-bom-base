import { getAllUsers, removeUser } from '..';

import { API_URL } from '../../../../../services/constants';
import buildAuthHeader from '../../../../../services/buildAuthHeader';

beforeAll(() => jest.spyOn(window, 'fetch'));

describe('Users services', () => {
  beforeEach(() => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
  });
  describe('getAllUsers', () => {
    it('should call the fetch function with the correct url', () => {
      const mockedUserJWT = '1234';
      getAllUsers(mockedUserJWT);

      expect(window.fetch).toHaveBeenCalledWith(`${API_URL}/usuario`, {
        method: 'GET',
        headers: {
          Authorization: 'Bearer 1234',
        },
      });
    });
  });

  describe('removeUser', () => {
    it('should call the fetch function with the correct url', () => {
      const mockedUserId = 123;
      const mockedJWT = 'fakeuserjwt';
      removeUser(mockedUserId, mockedJWT);

      expect(window.fetch).toHaveBeenCalledWith(`${API_URL}/usuario/${mockedUserId}`, {
        method: 'DELETE',
        headers: buildAuthHeader(mockedJWT),
      });
    });
  });
});
