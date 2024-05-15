const userModel = require("../models/user.model.js");

async function checkAuthenticatedUser(req, res, next) {
  try {
    const byPassURL = [
      "/api/user/register",
      "/api/user/oauth",
      "/api/user/authenticate",
    ];
    if (byPassURL.includes(req.url)) return next();
    const { email } = req.auth;
    const token = req.headers.authorization.split(" ")[1];
    const userDetails = await userModel.findOne({ email, token });
    if (!userDetails)
      throw "You have been signed out, please login again to user our services.";
    return next();
  } catch (error) {
    next(error);
  }
}
module.exports = { checkAuthenticatedUser };
