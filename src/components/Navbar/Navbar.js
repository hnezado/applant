import { Link } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";
import "./Navbar.scss";

const Navbar = ({ userInfo, modalAction, logout }) => {
  const AdminLink = () => {
    return (
      <Link className="nav-btn" to="/admin">
        Admin
      </Link>
    );
  };

  const ProfileLink = () => {
    return (
      <Link className="nav-btn" to="/profile">
        Profile
      </Link>
    );
  };

  const CartLink = () => {
    return (
      <Link
        title="Go to my shopping cart"
        className="nav-btn"
        to="/shopping-cart"
      >
        <TiShoppingCart />
      </Link>
    );
  };

  const LoginLink = () => {
    return (
      <Link className="nav-btn" onClick={() => modalAction("open", "login")}>
        Login
      </Link>
    );
  };

  const LogoutLink = () => {
    return (
      <Link className="nav-btn" onClick={() => logout()}>
        Logout
      </Link>
    );
  };

  const getNavbar = () => {
    return (
      <div className="navbar-child">
        <div className="nav-left">
          <Link to="/">
            <img
              title="Go to homepage"
              className="applant-logo"
              // src="applant-logo.svg"
              src="https://i.ibb.co/CKL8bY6/logo-applant.png"
              alt="home-logo"
            />
          </Link>
          <Link className="nav-btn" to="/blog">
            Blog
          </Link>
          <Link className="nav-btn" to="/store">
            Store
          </Link>
        </div>
        <div className="nav-right">
          {userInfo ? (
            <>
              {userInfo.admin && <AdminLink />}
              <ProfileLink />
              <LogoutLink />
              <CartLink />
            </>
          ) : (
            <LoginLink />
          )}
        </div>
      </div>
    );
  };

  return <nav className="Navbar">{getNavbar()}</nav>;
};

export default Navbar;
