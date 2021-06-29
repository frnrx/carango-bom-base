import fetchResponseHandler from '../fetchResponseHandler';

describe('fetchResponseHandler', () => {
  it('should return the json response when the response is ok', () => {
    const mockedJson = jest.fn().mockImplementation(() => true);
    const mockedResponse = {
      ok: true,
      json: mockedJson,
    };
    expect(fetchResponseHandler(mockedResponse)).toBeTruthy();
  });

  it('should return the response as an error when the response is not ok', async () => {
    const mockedResponse = {
      ok: false,
    };
    try {
      await fetchResponseHandler(mockedResponse);
    } catch (error) {
      expect(error).toEqual(mockedResponse);
    }
  });
});