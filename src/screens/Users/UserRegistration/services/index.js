import { API_URL } from '../../../../services/constants';
import fetchResponseHandler from '../../../../services/fetchResponseHandler';
import buildAuthHeader from '../../../../services/buildAuthHeader';

export const userRegistrationService = async (name, email, password, userJWT) => {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...buildAuthHeader(userJWT) },
    body: JSON.stringify({ name, email, password }),
  };
  return fetch(`${API_URL}/usuario`, requestOptions).then(fetchResponseHandler);
};
