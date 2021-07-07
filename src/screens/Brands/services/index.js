import { API_URL } from "../../../services/constants";
import buildAuthHeader from "../../../services/buildAuthHeader";
import fetchResponseHandler from "../../../services/fetchResponseHandler";

export const getAllBrands = async () => fetch(`${API_URL}/marcas`).then(fetchResponseHandler);

export const removeBrand = async (brandId, userJWT) => {
  const requestOptions = {
    method: 'DELETE',
    headers: buildAuthHeader(userJWT),
  };

  return fetch(`${API_URL}/marcas/${brandId}`, requestOptions).then(fetchResponseHandler);
};

export const registerBrand = (userJWT, brand) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...buildAuthHeader(userJWT),
    },
    body: JSON.stringify({ nome: brand }),
  };

  return fetch(`${API_URL}/marca`, requestOptions).then(fetchResponseHandler);
};

export const updateBrand = (userJWT, brandId, brand) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...buildAuthHeader(userJWT),
    },
    body: JSON.stringify({ nome: brand }),
  };

  return fetch(`${API_URL}/marca/${brandId}`, requestOptions).then(fetchResponseHandler);
};

export const getBrand = (brandId, userJWT) => {
  const requestOptions = { method: 'GET', headers: buildAuthHeader(userJWT) };

  return fetch(`${API_URL}/marca/${brandId}`, requestOptions).then(fetchResponseHandler);
};
