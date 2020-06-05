import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user";
import loginUser from "../strapi/loginUser";
import registerUser from "../strapi/registerUser";
export default function Login() {
  const history = useHistory();
  const { userLogin, alert, showAlert } = useContext(UserContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("default");
  const [isMember, setIsMember] = useState(true);

  let isEmpty = !email || !password || !username || alert.show;
  const toggleMember = () => {
    setIsMember((prevMember) => {
      let isMember = !prevMember;
      isMember ? setUsername("default") : setUsername("");
      return isMember;
    });
  };
  const handleSubmit = async (e) => {
    showAlert({ msg: "accessing user data, please wait." });
    e.preventDefault();
    let response;

    if (isMember) {
      response = await loginUser({ email, password });
    } else {
      response = await registerUser({ username, email, password });
    }
    if (response) {
      const {
        jwt: token,
        user: { username },
      } = response.data;
      const newUser = { token, username };
      userLogin(newUser);
      showAlert({ msg: `Welcome ${username}, you have now logged in` });
      history.push("/products");
    } else {
      showAlert({
        msg: "There was an error. Please try again...",
        type: "danger",
      });
    }
  };

  return (
    <section className="form section">
      <h2 className="section-title">{isMember ? "Sign in" : "Register"}</h2>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="form-control">
          <label htmlFor="email" value="email">
            Email
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          </label>
        </div>
        <div className="form-control">
          <label htmlFor="password" value="password">
            Password
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </label>
        </div>
        {!isMember && (
          <div className="form-control">
            <label htmlFor="username" value="username">
              Username
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              />
            </label>
          </div>
        )}
        {isEmpty && <p className="form-empty">Please complete all fields</p>}
        {!isEmpty && (
          <button
            type="submit"
            className="btn btn-block btn-primary"
            onClick={handleSubmit}
          >
            Submit
          </button>
        )}
        <p className="register-link">
          {isMember ? "need to register?" : "already a member?"}
          <button type="button" onClick={toggleMember}>
            click here
          </button>
        </p>
      </form>
    </section>
  );
}
