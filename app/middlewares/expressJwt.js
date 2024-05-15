const { expressjwt: jwt } = require("express-jwt");

function applyJWT() {
  return jwt({
    secret: process.env.SECRET_KEY,
    algorithms: ["HS256"],
    getToken: function fromHeaderString(req) {
      if (
        req.headers.authorization &&
        req.headers.authorization.split(" ")[0] === "Bearer"
      ) {
        return req.headers.authorization.split(" ")[1];
      }
      console.log(req.headers.authorization)
      throw "Your session has been timed out, please login again.";
    },
  }).unless({
    path: ["/api/user/register", "/api/user/oauth", "/api/user/authenticate"],
  });
}

module.exports = { applyJWT };
