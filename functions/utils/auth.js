require("dotenv").config();
const jwt = require("jsonwebtoken");
const jwks = require("jwks-rsa");
const { promisify } = require("util");

// for validateAccessToken helper
const jwksClient = jwks({
  jwksUri: `https://${process.env.AUTH0_DOMAIN}/.well-known/jwks.json`,
  audience: process.env.AUTH0_AUDIENCE,
});

// parses the access token from the auth header
const getAccessTokenFromHeaders = (headers) => {
  const rawAuthorization = headers.authorization;
  // console.log(headers);
  // console.log(`authorization is ${rawAuthorization}`);
  if (!rawAuthorization) {
    return null;
  }
  const authorizationParts = rawAuthorization.split(" ");
  if (authorizationParts[0] !== "Bearer" || authorizationParts.length !== 2) {
    return null;
  }
  const accessToken = authorizationParts[1];
  return accessToken;
};

// validates the access token from the given header
const validateAccessToken = async (token) => {
  try {
    const decodedToken = jwt.decode(token, { complete: true }); // setting complete to true will parse both the header and body to obtain key id (kid)
    const kid = decodedToken.header.kid;
    const alg = decodedToken.header.alg;

    const getSigningKey = promisify(jwksClient.getSigningKey);
    const key = await getSigningKey(kid);
    const signingKey = key.publicKey;

    const options = { algorithms: "RS256" };
    jwt.verify(token, signingKey, options);

    return decodedToken.payload;
  } catch (err) {
    // console.log(err);
    return null;
  }
};

module.exports = {
  getAccessTokenFromHeaders,
  validateAccessToken,
};
