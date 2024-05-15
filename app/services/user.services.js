const { default: axios } = require("axios");
const userModel = require("../models/user.model.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { SECRET_KEY } = process.env;

//register new user
async function register(userDetails) {
  try {
    // hashing password for security
    userDetails.password = bcrypt.hashSync(userDetails.password, 8);
    userDetails.token = jwt.sign(
      { email: userDetails.email, isAdmin: userDetails.isAdmin },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    const newUser = new userModel(userDetails);
    await newUser.save();
    return {
      message: "new user registered successfuly.",
      user: newUser,
    };
  } catch (error) {
    console.log(error);
    if (
      error.errorResponse &&
      error.errorResponse.code === 11000 &&
      error.errorResponse.keyPattern.email
    ) {
      throw "User already registered.";
    }
    throw error;
  }
}

// authenticate or login user
async function authenticate(userParams) {
  try {
    const { email, password } = userParams;
    const userDetails = await userModel.findOne({ email });
    if (
      !userDetails ||
      !bcrypt.compareSync(
        password /*password by user*/,
        userDetails.password /*password from database*/
      )
    )
      throw "Invalid user credentials.";
    const token = jwt.sign(
      { email, isAdmin: userDetails.isAdmin },
      SECRET_KEY,
      {
        expiresIn: "7d",
      }
    );
    await userModel.updateOne({ email }, { token });
    const updatedUser = await userModel.findOne({ email });
    return { message: "login successful.", user: updatedUser };
  } catch (error) {
    throw error;
  }
}

async function OAuth() {
  try {
    const { CLIENT_ID, OAUTH_REDIRECT_URL } = process.env;
    const res = await axios.post(
      `https://accounts.google.com/o/oauth2/v2/auth`,
      {
        redirect_uri: OAUTH_REDIRECT_URL,
        client_id: CLIENT_ID,
        response_type: "code",
        prompt: "consent",
        scope: [
          "https://www.googleapis.com/auth/userinfo.profile",
          "https://www.googleapis.com/auth/userinfo.email",
        ],
      }
    );
    return res.data;
  } catch (error) {
    throw error;
  }
}

// sign out the user
async function signOut({ email }) {
  try {
    //delete token to sign out the user and user will be restricted through the middleware
    await userModel.updateOne({ email }, { $unset: { token: "" } });
    return { message: "You have been signed out successfully." };
  } catch (error) {
    throw error;
  }
}

// get user profile details
async function getProfileDetails({ email }) {
  try {
    return await userModel.findOne({ email });
  } catch (error) {
    throw error;
  }
}

// update user profile
async function updateProfile(
  updateParams,
  { email: tokenEmail, isAdmin: tokenIsAdmin }
) {
  try {
    const { password, email: paramEmail, isAdmin: paramIsAdmin } = updateParams;
    // hashing the password if available
    if (password) {
      updateParams.password = bcrypt.hashSync(password, 8);
    }
    // token contains following details so update the token
    if (paramEmail || paramIsAdmin) {
      updateParams.token = jwt.sign(
        {
          email: paramEmail || tokenEmail, //consider user entered email/email from jwt token
          isAdmin: paramIsAdmin || tokenIsAdmin, //consider user entered isAdmin flag or jwt isAdmin flag
        },
        SECRET_KEY,
        {
          expiresIn: "7d",
        }
      );
    }
    await userModel.updateOne({ email: tokenEmail }, updateParams);
    //find by email either from updated param or if not mentioned then token email
    const userDetails = await userModel.findOne({
      email: paramEmail || tokenEmail,
    });
    return {
      message: "profile details updated successfully.",
      user: userDetails,
    };
  } catch (error) {
    throw error;
  }
}

// get list of public and private user accounts based on user admin status true/false
async function getUsers({ email, isAdmin }) {
  try {
    //show all public and private accounts to admin
    if (isAdmin) return await userModel.find();
    //show only public accounts to normal user
    return await userModel.find({ isAccountPrivate: false });
  } catch (error) {
    throw error;
  }
}

module.exports = {
  register,
  authenticate,
  signOut,
  getProfileDetails,
  updateProfile,
  getUsers,
  OAuth,
};
