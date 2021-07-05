import { API_URL } from "../../../services/constants";
import fetchResponseHandler from "../../../services/fetchResponseHandler";
import buildAuthHeader from '../../../services/buildAuthHeader'

export const getAllVehicles = async () => fetch(`${API_URL}/veiculo`).then(fetchResponseHandler);

export const removeVehicle = async (vehicleId, userJWT) => {
  const requestOptions = {
    method: 'DELETE',
    headers: buildAuthHeader(userJWT),
  };

  return fetch(`${API_URL}/veiculo/${vehicleId}`, requestOptions).then(fetchResponseHandler);
};

export const registerVehicle = (userJWT, brand, model, year, value) => {
  const requestBody = {
    marca: {
      id: brand.id,
      nome: brand.name,
    },
    modelo: model,
    ano: year,
    preco: value,
  };
  const requestOptions = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...buildAuthHeader(userJWT),
    },
    body: JSON.stringify(requestBody),
  };

  return fetch(`${API_URL}/veiculo`, requestOptions).then(fetchResponseHandler);
};
