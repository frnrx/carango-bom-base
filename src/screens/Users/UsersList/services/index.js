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

export const removeUser = async (userId, userJWT) => {
  const requestOptions = {
    method: 'DELETE',
    headers: buildAuthHeader(userJWT),
  };

  return fetch(`${API_URL}/usuario/${userId}`, requestOptions).then(fetchResponseHandler);
};
