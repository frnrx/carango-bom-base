import { getAllUsers } from '..';

import { API_URL } from '../../../../../services/constants';

beforeAll(() => jest.spyOn(window, 'fetch'));

describe('Vehicles services', () => {
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
});
