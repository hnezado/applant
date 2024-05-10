// imports
import "./Footer.scss";
import React from "react";
import { Link } from "react-router-dom";
import { VscGithub } from "react-icons/vsc";
import { GrLinkedin } from "react-icons/gr";

// component
const Footer = ({ modalAction }) => {
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
                    to="https://github.com/hnezado"
                    target="_blank"
                    className="icons"
                  >
                    <VscGithub />
                  </Link>
                </td>
                <td>
                  <Link
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
                    to="https://github.com/srtamaciel"
                    target="_blank"
                    className="icons"
                  >
                    <VscGithub />
                  </Link>
                </td>
                <td>
                  <Link
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
                    to="https://github.com/GermanDG6"
                    target="_blank"
                    className="icons"
                  >
                    <VscGithub />
                  </Link>
                </td>
                <td>
                  <Link
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
          <Link className="link" to="#">
            FAQ
          </Link>
          <Link className="link" to="#">
            Terms of Service
          </Link>
          <Link className="link" to="#">
            Privacy Policy
          </Link>
          <Link className="link" to="#">
            Returns and Delivery
          </Link>
          <Link className="link" to="#">
            Cookies
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Footer;
