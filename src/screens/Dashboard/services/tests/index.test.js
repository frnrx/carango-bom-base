import { getDashboard } from '..';

import { API_URL } from '../../../../services/constants';
import buildAuthHeader from '../../../../services/buildAuthHeader';

beforeAll(() => jest.spyOn(window, 'fetch'));

describe('Dashboard services', () => {
  beforeEach(() => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
  });
  it('should call the fetch function with the correct url and options', async () => {
    const mockedUserJWT = 'fakeuserjwt';
    getDashboard(mockedUserJWT);

    expect(window.fetch).toHaveBeenCalledWith(`${API_URL}/marcas/dashboard`, {
      method: 'GET',
      headers: buildAuthHeader(mockedUserJWT),
    });
  });
});
