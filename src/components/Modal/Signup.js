import { useState } from "react";
import { Link } from "react-router-dom";

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
    modalAction("close");
  };

  const getSignupForm = () => {
    return (
      <div className="modal">
        <h2>Sign up</h2>
        <form className="form" onSubmit={handleSignup}>
          <label className="label" htmlFor="username">
            Username
          </label>
          <input
            className="input i-form"
            type="text"
            name="username"
            onChange={handleChange}
          />
          <label className="label" htmlFor="password">
            Password
          </label>
          <input
            className="input i-form"
            type="password"
            name="password"
            onChange={handleChange}
          />
          <div className="btns-container">
            <button className="button">Register new user</button>
          </div>
        </form>
        <div className="auth-info">
          <span>Do you have an account?</span>
          <span>
            Log in{" "}
            <Link className="link" onClick={() => modalAction("open", "login")}>
              here
            </Link>
          </span>
        </div>
      </div>
    );
  };

  return <div className="Signup">{getSignupForm()}</div>;
};

export default Signup;
