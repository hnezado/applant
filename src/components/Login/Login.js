import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Login.scss";

const Login = ({ newUsername, modalAction, login }) => {
  const [user, setUser] = useState({
    username: newUsername,
    password: "",
  });

  useEffect(
    () => setUser({ username: newUsername, password: "" }),
    [newUsername]
  );

  const handleInput = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleLogin = (event) => {
    event.preventDefault();
    login(user);
  };

  const getLoginForm = () => {
    return (
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
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
          <Link className="link" onClick={() => modalAction("open", "signup")}>
            here
          </Link>
        </span>
      </div>
    );
  };

  return <div className="Login">{getLoginForm()}</div>;
};

export default Login;
