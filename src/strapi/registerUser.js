// register user
import React from "react";
import axios from "axios";
import url from "../utils/URL";
async function registerUser({ username, email, password }) {
  const response = await axios
    .post(`${url}/auth/local/register`, { username, email, password })
    .catch((err) => console.log(err));

  return response;
}

export default registerUser;
