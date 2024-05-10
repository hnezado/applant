import { useState, useEffect } from "react";
import "./Login.scss";

import { Link } from "react-router-dom";

const Login = ({ authAction, modalAction, onLogin, newUsername }) => {
  const [user, setUser] = useState({
    username: newUsername,
    password: "",
  });

  useEffect(
    () => setUser({ username: newUsername, password: "" }),
    [newUsername]
  );

  const login = async (event) => {
    event.preventDefault();
    const result = await authAction(user, "login");
    if (result.data && result.data.successLogin) {
      onLogin();
      modalAction("close");
    }
  };

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const redirectToSignup = () => {
    modalAction("open", "signup");
  };

  const getLoginForm = () => {
    return (
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={login}>
          <label className="label-form" htmlFor="username">
            Username
          </label>
          <input
            className="input-form"
            type="text"
            name="username"
            onChange={handleInput}
            value={user.username}
          />
          <label className="label-form" htmlFor="password">
            Password
          </label>
          <input
            className="input-form"
            type="password"
            name="password"
            onChange={handleInput}
          />
          <button className="button">Log in</button>
        </form>
        <span>Don't you have an account yet?</span>
        <span>
          Register by clicking{" "}
          <Link className="link" onClick={redirectToSignup}>
            here
          </Link>
        </span>
      </div>
    );
  };

  return <div className="Login">{getLoginForm()}</div>;
};

export default Login;
