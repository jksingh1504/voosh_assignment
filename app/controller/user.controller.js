const userServices = require("../services/user.services.js");

exports.register = (req, res, next) => {
  // #swagger.tags = ['User Authentication']
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/User"
                    }  
                }
            }
        } 
  */
  /*
        #swagger.responses[201] = {
            description:"User created",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userRegistered"
                    }  
                }
            }
        } 
    */
  /*
        #swagger.responses[400] = {
            description:"User already exist",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/alreadyRegistered"
                    }  
                }
            }
        } 
  */
  const { body: userDetails } = req;
  userServices
    .register(userDetails)
    .then((data) => res.status(201).json(data))
    .catch((err) => next(err));
};

exports.authenticate = (req, res, next) => {
  // #swagger.tags = ['User Authentication']
  /*  #swagger.requestBody = {
            required: true,
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/userLogin"
                    }  
                }
            }
        } 
  */
  /*
        #swagger.responses[200] = {
            description:"Login successful.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/loginSuccess"
                    }  
                }
            }
        } 
    */
  /*
        #swagger.responses[400] = {
            description:"Invalid Credentials.",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/invalidCredentials"
                    }  
                }
            }
        } 
  */
  const { body: userDetails } = req;
  userServices
    .authenticate(userDetails)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};

exports.OAuth = (req, res, next) => {
  userServices
    .OAuth()
    .then((data) => res.redirect(data))
    .catch((err) => next(err));
};

exports.signOut = (req, res, next) => {
  // #swagger.tags = ['User Authentication']
  /*
        #swagger.responses[200] = {
            description:"Successful sign out",
            content: {
                "application/json": {
                    schema: {
                        $ref: "#/components/schemas/logout"
                    }  
                }
            }
        }
  */
  userServices
    .signOut(req.auth)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};

exports.getProfileDetails = (req, res, next) => {
  userServices
    .getProfileDetails(req.auth)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};

exports.updateProfile = (req, res, next) => {
  const { body, auth } = req;
  userServices
    .updateProfile(body, auth)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};

exports.getUsers = (req, res, next) => {
  userServices
    .getUsers(req.auth)
    .then((data) => res.status(200).json(data))
    .catch((err) => next(err));
};
