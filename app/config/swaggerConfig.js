const swaggerAutogen = require("swagger-autogen")({ openapi: "3.0.0" });

const doc = {
  info: {
    title: "Voosh",
    description: "Voosh assignment api documentation",
  },
  servers: [
    {
      url: "https://voosh-assignment.vercel.app",
      description: "Deployed vercel server",
    },
    {
      url: "http://localhost:5000",
      description: "Local server",
    },
  ],
  tags: [
    {
      name: "User Authentication",
      description:
        "Admins and users can register and login/authenticate their account",
    },
    {
      name: "Profile details",
      description:
        "Admins and users can check their and other users profile details",
    },
    {
      name: "Update Profile",
      description: "Admins and users can update their profile details.",
    },
  ],
  components: {
    schemas: {
      User: {
        $userName: "John Doe",
        $email: "john.doe@voosh.com",
        $password: "John@voosh",
        $phone: 7354441234,
        $bio: "This is a short description about myself",
        $photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ngU1GxK9VdwXCRVuxzISotU9_hBfHaLDYA9wevgXtuSqbhWiWRlrLE733g&s",
        $isAdmin: false,
        $loginType: "voosh",
        $isAccountPrivate: true,
      },
      userRegistered: {
        message: "new user registered successfuly.",
        user: {
          userName: "John Doe",
          email: "john.doe@voosh.com",
          phone: 7354441234,
          bio: "This is a short description about myself",
          photo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ngU1GxK9VdwXCRVuxzISotU9_hBfHaLDYA9wevgXtuSqbhWiWRlrLE733g&s",
          isAdmin: false,
          loginType: "voosh",
          isAccountPrivate: false,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQHZvb3NoLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTU3NjYzMzAsImV4cCI6MTcxNjM3MTEzMH0.qRCCXMjUCQfMSAE93djjJI7j6XM9O0fex3P5uTsbIO4",
          id: "6644843a735b795f7c929e95",
        },
      },
      alreadyRegistered: {
        message: "User already registered.",
        error: true,
      },
      userDetails: {
        userName: "John Doe",
        email: "john.doe@voosh.com",
        phone: 7354441234,
        bio: "This is a short description about myself",
        photo:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ngU1GxK9VdwXCRVuxzISotU9_hBfHaLDYA9wevgXtuSqbhWiWRlrLE733g&s",
        isAdmin: false,
        loginType: "voosh",
        isAccountPrivate: false,
        token:
          "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQHZvb3NoLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTU3NjYzMzAsImV4cCI6MTcxNjM3MTEzMH0.qRCCXMjUCQfMSAE93djjJI7j6XM9O0fex3P5uTsbIO4",
        id: "6644843a735b795f7c929e95",
      },
      userLogin: { $email: "john.doe@voosh.com", $password: "John@voosh" },
      loginSuccess: {
        message: "login successful.",
        user: {
          userName: "John Doe",
          email: "john.doe@voosh.com",
          phone: 7354441234,
          bio: "This is a short description about myself",
          photo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ngU1GxK9VdwXCRVuxzISotU9_hBfHaLDYA9wevgXtuSqbhWiWRlrLE733g&s",
          isAdmin: false,
          loginType: "voosh",
          isAccountPrivate: false,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQHZvb3NoLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTU3NjYzMzAsImV4cCI6MTcxNjM3MTEzMH0.qRCCXMjUCQfMSAE93djjJI7j6XM9O0fex3P5uTsbIO4",
          id: "6644843a735b795f7c929e95",
        },
      },
      invalidCredentials: {
        message: "Invalid user credentials.",
        error: true,
      },
      logout: { message: "You have been signed out successfully." },
      profileUpdateSuccess: {
        message: "profile details updated successfully.",
        user: {
          userName: "John Doe",
          email: "john.doe@voosh.com",
          phone: 7354441234,
          bio: "This is a short description about myself",
          photo:
            "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8ngU1GxK9VdwXCRVuxzISotU9_hBfHaLDYA9wevgXtuSqbhWiWRlrLE733g&s",
          isAdmin: false,
          loginType: "voosh",
          isAccountPrivate: false,
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImpvaG4uZG9lQHZvb3NoLmNvbSIsImlzQWRtaW4iOmZhbHNlLCJpYXQiOjE3MTU3NjYzMzAsImV4cCI6MTcxNjM3MTEzMH0.qRCCXMjUCQfMSAE93djjJI7j6XM9O0fex3P5uTsbIO4",
          id: "6644843a735b795f7c929e95",
        },
      },
    },
  },
};

const outputFile = "../../swaggerSpec.json";
const routes = ["index.js"];

swaggerAutogen(outputFile, routes, doc);
