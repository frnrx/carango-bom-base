import { getAllVehicles } from '..';

import { API_URL } from '../../../../services/constants';

beforeAll(() => jest.spyOn(window, 'fetch'));

describe('Vehicles services', () => {
  beforeEach(() => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
  });
  it('should call the fetch function with the correct url', async () => {
    getAllVehicles();

    expect(window.fetch).toHaveBeenCalledWith(`${API_URL}/veiculo`);
  });
});