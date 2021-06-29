import { API_URL } from "../../../services/constants";
import fetchResponseHandler from "../../../services/fetchResponseHandler";

export const loginService = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    body: JSON.stringify({ email, senha: password }),
  }
  return fetch(`${API_URL}/auth`, requestOptions).then(fetchResponseHandler);
};
