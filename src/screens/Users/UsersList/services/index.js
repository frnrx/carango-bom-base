import { API_URL } from '../../../../services/constants';
import buildAuthHeader from '../../../../services/buildAuthHeader';
import fetchResponseHandler from '../../../../services/fetchResponseHandler';

export const getAllUsers = async (userJWT) => {
  const requestOptions = {
    method: 'GET',
    headers: buildAuthHeader(userJWT),
  };
  return fetch(`${API_URL}/usuario`, requestOptions).then(fetchResponseHandler);
};
