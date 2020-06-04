//login user
import axios from "axios";
import url from "../utils/URL";
async function loginUser({ email, password }) {
  const response = await axios
    .post(`${url}/auth/local`, {
      identifier: email,
      password,
    })
    .catch((err) => console.log(err));
  return response;
}

export default loginUser;
