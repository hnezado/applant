import "./Navbar.scss";
import { Link, useNavigate } from "react-router-dom";
import { TiShoppingCart } from "react-icons/ti";

const Navbar = ({ authAction, userInfo, modalAction }) => {
  const navigate = useNavigate();

  const logout = () => {
    authAction(null, "logout");
    navigate("/");
  };

  const AdminLink = () => {
    return (
      <Link className="nav-btn" to="/admin">
        Admin
      </Link>
    );
  };

  const ProfileLink = () => {
    <Link className="nav-btn" to="/profile">
      Profile
    </Link>;
  };

  const CartLink = () => {
    return (
      <Link className="nav-btn" to="/shopping-cart">
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

  const getNavbar = (logged, admin) => {
    return (
      <div className="navbar-child">
        <div className="nav-left">
          <Link to="/">
            <img
              className="applant-logo"
              // src="../../../public/applant-logo.svg"
              // src="../../../public/applant-logo.png"
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
          {/* {logged ? ( */}
          {userInfo ? (
            <>
              {userInfo.admin && <AdminLink />}
              {/* {admin && <AdminLink />} */}
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

  return <nav className="Navbar">{getNavbar(false, false)}</nav>;
};

export default Navbar;
