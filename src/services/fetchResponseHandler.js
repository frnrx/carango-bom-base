const fetchResponseHandler = (response) => {
  if (response.ok) {
    return response.json();
  }

  throw response;
};

export default fetchResponseHandler;
