import { loginService } from '..';

import { API_URL } from '../../../../services/constants';

beforeAll(() => jest.spyOn(window, 'fetch'));

describe('Login services', () => {
  beforeEach(() => {
    window.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({success: true}),
    });
  });
  it('should call the fetch function with the correct url', async () => {
    const mockedEmail = 'a@a.com';
    const mockedPassword = '12345678';
    loginService(mockedEmail, mockedPassword);

    expect(window.fetch).toHaveBeenCalledWith(
      `${API_URL}/auth`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: mockedEmail, senha: mockedPassword }),
      },
    );
  });
});