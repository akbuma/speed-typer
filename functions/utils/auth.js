const getAccessTokenFromHeaders = (headers) => {
  const rawAuthorization = headers.rawAuthorization;
  if (!rawAuthorization) {
    return null;
  }
  const authorizationParts = rawAAuthorization.split(" ");
  if (authorizationParts[0] !== "Bearer" || authorizationParts.length !== 2) {
    return null;
  }

  const accessToken = authorizationParts[1];
  return accessToken;
};

module.exports = {
  getAccessTokenFromHeaders,
};
