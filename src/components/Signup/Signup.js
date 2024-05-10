import { useState } from "react";
import "./Signup.scss";

import { Link } from "react-router-dom";

const Signup = ({ authAction, modalAction, onSignup, updateState }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const signup = async (event) => {
    event.preventDefault();
    const result = await authAction(user, "signup");
    if (result.data && result.data.successSignup) {
      const newUsername = user.username;
      onSignup(newUsername);
      updateState("users");
      redirectToLogin();
    }
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const redirectToLogin = () => {
    modalAction("open", "login");
  };

  const getSignupForm = () => {
    return (
      <div className="form-container">
        <h2>Sign up</h2>
        <form onSubmit={signup}>
          <label className="label-form" htmlFor="username">
            Username
          </label>
          <input
            className="input-form"
            type="text"
            name="username"
            onChange={handleChange}
          />
          <label className="label-form" htmlFor="password">
            Password
          </label>
          <input
            className="input-form"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <button className="button">Register new user</button>
        </form>
        <span>Do you have an account?</span>
        <span>
          Log in{" "}
          <Link className="link" onClick={redirectToLogin}>
            here
          </Link>
        </span>
      </div>
    );
  };

  return <div className="Signup">{getSignupForm()}</div>;
};

export default Signup;
