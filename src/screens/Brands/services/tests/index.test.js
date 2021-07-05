import { getAllBrands } from '..';

import { API_URL } from '../../../../services/constants';

beforeAll(() => jest.spyOn(window, 'fetch'));

describe('Brands services', () => {
  beforeEach(() => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
  });
  describe('getAllVehicles', () => {
    it('should call the fetch function with the correct url', () => {
      getAllBrands();

      expect(window.fetch).toHaveBeenCalledWith(`${API_URL}/marcas`);
    });
  });
});
