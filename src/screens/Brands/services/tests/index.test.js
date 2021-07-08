import { getAllBrands, removeBrand, registerBrand, updateBrand, getBrand } from '..';

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

  describe('getAllBrands', () => {
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

  describe('registerBrand', () => {
    it('should call the fetch function with the correct url and options', () => {
      const mockedJWT = 'fakeuserjwt';
      const mockedBrand = 'Fake Brand';
      registerBrand(mockedJWT, mockedBrand);

      const expectedBody = { nome: mockedBrand };
      expect(window.fetch).toHaveBeenCalledWith(
        `${API_URL}/marcas`,
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

  describe('updateBrand', () => {
    it('should call the fetch function with the correct url and options', () => {
      const mockedJWT = 'fakeuserjwt';
      const mockedBrandId = 99;
      const mockedBrand = 'Fake Brand';
      updateBrand(mockedJWT, mockedBrandId, mockedBrand);

      const expectedBody = { nome: mockedBrand };
      expect(window.fetch).toHaveBeenCalledWith(
        `${API_URL}/marcas/${mockedBrandId}`,
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

  describe('getBrand', () => {
    it('should call the fetch function with the correct url and options', () => {
      const mockedBrandId = 123;
      const mockedJWT = 'fakeuserjwt';
      getBrand(mockedBrandId, mockedJWT);
  
      expect(window.fetch).toHaveBeenCalledWith(
        `${API_URL}/marcas/${mockedBrandId}`,
        { method: 'GET', headers: buildAuthHeader(mockedJWT) },
      );
    });
  });
});
