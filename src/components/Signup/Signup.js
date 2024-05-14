import { useState } from "react";
import { Link } from "react-router-dom";
import "./Signup.scss";

const Signup = ({ modalAction, signup }) => {
  const [user, setUser] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({
      ...user,
      [name]: value,
    });
  };

  const handleSignup = (event) => {
    event.preventDefault();
    signup(user);
  };

  const getSignupForm = () => {
    return (
      <div className="form-container">
        <h2>Sign up</h2>
        <form onSubmit={handleSignup}>
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
          <Link className="link" onClick={() => modalAction("open", "login")}>
            here
          </Link>
        </span>
      </div>
    );
  };

  return <div className="Signup">{getSignupForm()}</div>;
};

export default Signup;
