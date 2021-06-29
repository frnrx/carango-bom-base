const buildAuthHeader = (userJWT) => {
  if (userJWT) {
    return { 'Authorization': `Bearer ${userJWT}` };
  }
  return {};
};

export default buildAuthHeader;
