import { getAllVehicles, removeVehicle } from '..';

import { API_URL } from '../../../../services/constants';
import buildAuthHeader from '../../../../services/buildAuthHeader';

beforeAll(() => jest.spyOn(window, 'fetch'));

describe('Vehicles services', () => {
  beforeEach(() => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
  });
  describe('getAllVehicles', () => {
    it('should call the fetch function with the correct url', () => {
      getAllVehicles();
  
      expect(window.fetch).toHaveBeenCalledWith(`${API_URL}/veiculo`);
    });
  });

  describe('removeVehicle', () => {
    it('should call the fetch function with the correct url', () => {
      const mockedVehicleId = 123;
      const mockedJWT = 'fakeuserjwt';
      removeVehicle(mockedVehicleId, mockedJWT);
  
      expect(window.fetch).toHaveBeenCalledWith(
        `${API_URL}/veiculo/${mockedVehicleId}`,
        {
          method: 'DELETE',
          headers: buildAuthHeader(mockedJWT),
        },
      );
    });
  });
});
