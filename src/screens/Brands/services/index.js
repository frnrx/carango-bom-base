import { API_URL } from "../../../services/constants";
import buildAuthHeader from "../../../services/buildAuthHeader";
import fetchResponseHandler from "../../../services/fetchResponseHandler";

const BrandService = {
  async register(brand) {
    return fetch('https://carango-bom-api.herokuapp.com/marcas', {
      method: 'POST',
      body: JSON.stringify(brand),
    }).then((r) => r.json());
  },

  async update(brand) {
    return fetch(`https://carango-bom-api.herokuapp.com/marcas/${brand.id}`, {
      method: 'PUT',
      body: JSON.stringify(brand),
    }).then((r) => r.json());
  },

  async get(id) {
    return fetch(`https://carango-bom-api.herokuapp.com/marcas/${id}`).then((r) => r.json());
  },
};

export const getAllBrands = async () => fetch(`${API_URL}/marcas`).then(fetchResponseHandler);

export const removeBrand = async (brandId, userJWT) => {
  const requestOptions = {
    method: 'DELETE',
    headers: buildAuthHeader(userJWT),
  };

  return fetch(`${API_URL}/marcas/${brandId}`, requestOptions).then(fetchResponseHandler);
};

export default BrandService;
