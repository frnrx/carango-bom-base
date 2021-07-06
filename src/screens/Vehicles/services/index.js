import { API_URL } from "../../../services/constants";
import fetchResponseHandler from "../../../services/fetchResponseHandler";
import buildAuthHeader from '../../../services/buildAuthHeader'

const buildRequestBody = (brand, model, year, value) => ({
  marca: {
    id: brand.id,
    nome: brand.name,
  },
  modelo: model,
  ano: year,
  preco: value,
  isVendido: false,
});

export const getAllVehicles = async () => fetch(`${API_URL}/veiculo`).then(fetchResponseHandler);

export const getVehicle = async (vehicleId, userJWT) => {
  const requestOptions = { method: 'GET', headers: buildAuthHeader(userJWT) };

  return fetch(`${API_URL}/veiculo/${vehicleId}`, requestOptions).then(fetchResponseHandler);
};

export const removeVehicle = async (vehicleId, userJWT) => {
  const requestOptions = {
    method: 'DELETE',
    headers: buildAuthHeader(userJWT),
  };

  return fetch(`${API_URL}/veiculo/${vehicleId}`, requestOptions).then(fetchResponseHandler);
};

export const registerVehicle = (userJWT, brand, model, year, value) => {
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...buildAuthHeader(userJWT),
    },
    body: JSON.stringify(buildRequestBody(brand, model, year, value)),
  };

  return fetch(`${API_URL}/veiculo`, requestOptions).then(fetchResponseHandler);
};

export const updateVehicle = (userJWT, vehicleId, brand, model, year, value) => {
  const requestOptions = {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
      ...buildAuthHeader(userJWT),
    },
    body: JSON.stringify(buildRequestBody(brand, model, year, value)),
  };

  return fetch(`${API_URL}/veiculo/${vehicleId}`, requestOptions).then(fetchResponseHandler);
};
