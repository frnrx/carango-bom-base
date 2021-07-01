import { API_URL } from "../../../services/constants";
import fetchResponseHandler from "../../../services/fetchResponseHandler";

export const loginService = async (email, password) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, senha: password }),
  };
  return fetch(`${API_URL}/auth`, requestOptions).then(fetchResponseHandler);
};
