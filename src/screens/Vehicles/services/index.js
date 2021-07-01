import { API_URL } from "../../../services/constants";
import fetchResponseHandler from "../../../services/fetchResponseHandler";

export const getAllVehicles = async () =>
  fetch(`${API_URL}/veiculo`).then(fetchResponseHandler);

export const removeVehicle = () => true;
