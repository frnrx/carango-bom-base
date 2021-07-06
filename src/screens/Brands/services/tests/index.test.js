import { getAllBrands, removeBrand } from '..';

import { API_URL } from '../../../../services/constants';
import buildAuthHeader from '../../../../services/buildAuthHeader';

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

  describe('removeBrand', () => {
    it('should call the fetch function with the correct url and options', () => {
      const mockedBrandId = 123;
      const mockedJWT = 'fakeuserjwt';
      removeBrand(mockedBrandId, mockedJWT);
  
      expect(window.fetch).toHaveBeenCalledWith(
        `${API_URL}/marcas/${mockedBrandId}`,
        {
          method: 'DELETE',
          headers: buildAuthHeader(mockedJWT),
        },
      );
    });
  });
});
