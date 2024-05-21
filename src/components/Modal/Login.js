import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

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
      <div className="modal">
        <h2>Login</h2>
        <form className="form" onSubmit={handleLogin}>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className="input i-form"
            type="text"
            name="username"
            onChange={handleInput}
            value={user.username}
          />
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input i-form"
            type="password"
            name="password"
            onChange={handleInput}
          />
          <div className="btns-container">
            <button className="button">Log in</button>
          </div>
        </form>
        <div className="auth-info">
          <span>Don't you have an account yet?</span>
          <span>
            Register by clicking{" "}
            <Link
              className="link"
              onClick={() => modalAction("open", "signup")}
            >
              here
            </Link>
          </span>
        </div>
      </div>
    );
  };

  return <div className="Login">{getLoginForm()}</div>;
};

export default Login;
