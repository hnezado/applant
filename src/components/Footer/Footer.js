// imports
import "./Footer.scss";
import React from "react";
import { Link } from "react-router-dom";
import { VscGithub } from "react-icons/vsc";
import { GrLinkedin } from "react-icons/gr";

const Footer = ({ modalAction, addMsg }) => {
  const unavailable = () => {
    addMsg("Option unavailable");
  };
  return (
    <div className="Footer">
      <div>
        <h5>Contact</h5>
        <div className="Contact">
          <table>
            <tbody>
              <tr>
                <td>
                  <em>Hector Martinez</em>
                </td>
                <td>
                  <Link
                    title="Visit Hector's Github"
                    to="https://github.com/hnezado"
                    target="_blank"
                    className="icons"
                  >
                    <VscGithub />
                  </Link>
                </td>
                <td>
                  <Link
                    title="Visit Hector's LinkedIn"
                    to="https://www.linkedin.com/in/hector-md/"
                    target="_blank"
                    className="icons"
                  >
                    <GrLinkedin />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <em>Raquel Rodriguez</em>
                </td>
                <td>
                  <Link
                    title="Visit Raquel's Github"
                    to="https://github.com/srtamaciel"
                    target="_blank"
                    className="icons"
                  >
                    <VscGithub />
                  </Link>
                </td>
                <td>
                  <Link
                    title="Visit Raquel's LinkedIn"
                    to="https://www.linkedin.com/in/raquel-rodriguez-diaz/"
                    target="_blank"
                    className="icons"
                  >
                    <GrLinkedin />
                  </Link>
                </td>
              </tr>
              <tr>
                <td>
                  <em>German Delgado</em>
                </td>
                <td>
                  <Link
                    title="Visit German's Github"
                    to="https://github.com/GermanDG6"
                    target="_blank"
                    className="icons"
                  >
                    <VscGithub />
                  </Link>
                </td>
                <td>
                  <Link
                    title="Visit German's LinkedIn"
                    to="https://www.linkedin.com/in/germandelgadogarcia/"
                    target="_blank"
                    className="icons"
                  >
                    <GrLinkedin />
                  </Link>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div>
        <h5>Join us</h5>
        <div className="Join">
          <Link className="link" onClick={() => modalAction("open", "login")}>
            Login
          </Link>
          <Link className="link" onClick={() => modalAction("open", "signup")}>
            Sign up
          </Link>
        </div>
      </div>
      <div>
        <h5>About</h5>
        <div className="About">
          <Link className="link" onClick={unavailable} to="#">
            FAQ
          </Link>
          <Link className="link" onClick={unavailable} to="#">
            Terms of Service
          </Link>
          <Link className="link" onClick={unavailable} to="#">
            Privacy Policy
          </Link>
          <Link className="link" onClick={unavailable} to="#">
            Returns and Delivery
          </Link>
          <Link className="link" onClick={unavailable} to="#">
            Cookies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
