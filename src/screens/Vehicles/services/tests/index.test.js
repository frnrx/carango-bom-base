import { getAllVehicles, removeVehicle, registerVehicle, updateVehicle } from '..';

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
    it('should call the fetch function with the correct url and options', () => {
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

  describe('registerVehicle', () => {
    it('should call the fetch function with the correct url and options', () => {
      const mockedJWT = 'fakeuserjwt';
      const mockedBrand = { id: 1, name: 'Fake Brand' };
      const mockedModel = 'Fake vehicle model';
      const mockedYear = 1999;
      const mockedValue = 20000;
      registerVehicle(mockedJWT, mockedBrand, mockedModel, mockedYear, mockedValue);

      const expectedBody = {
        marca: {
          id: mockedBrand.id,
          nome: mockedBrand.name,
        },
        modelo: mockedModel,
        ano: mockedYear,
        preco: mockedValue,
        isVendido: false,
      };
      expect(window.fetch).toHaveBeenCalledWith(
        `${API_URL}/veiculo`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            ...buildAuthHeader(mockedJWT),
          },
          body: JSON.stringify(expectedBody),
        },
      );
    });
  });

  describe('updateVehicle', () => {
    it('should call the fetch function with the correct url and options', () => {
      const mockedJWT = 'fakeuserjwt';
      const mockedVehicleId = 99;
      const mockedBrand = { id: 1, name: 'Fake Brand' };
      const mockedModel = 'Fake vehicle model';
      const mockedYear = 1999;
      const mockedValue = 20000;
      updateVehicle(mockedJWT, mockedVehicleId, mockedBrand, mockedModel, mockedYear, mockedValue);

      const expectedBody = {
        marca: {
          id: mockedBrand.id,
          nome: mockedBrand.name,
        },
        modelo: mockedModel,
        ano: mockedYear,
        preco: mockedValue,
        isVendido: false,
      };
      expect(window.fetch).toHaveBeenCalledWith(
        `${API_URL}/veiculo/${mockedVehicleId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            ...buildAuthHeader(mockedJWT),
          },
          body: JSON.stringify(expectedBody),
        },
      );
    });
  });
});
