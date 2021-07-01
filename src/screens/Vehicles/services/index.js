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
