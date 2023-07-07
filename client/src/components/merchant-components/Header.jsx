import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../../redux/actions/merchantAction";
import Loader from "./utils/Loader";

const Header = () => {
  const merchantState = useSelector((state) => state.merchantReducer);
  const merchant = merchantState.merchant;
  const dispatch = useDispatch();

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setImageSrc(
      merchant.image
        ? `${process.env.REACT_APP_URL}/api/profile/img/${merchant.image}`
        : "assets/img/avatar-user.jpg"
    );
  }, [merchant.image]);

  const handleLogoutClick = () => {
    dispatch(logout());
  };

  const toggleDropdown = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <header className="header_in clearfix element_to_stick">
      <div className="layer"></div>
      {merchant && (
        <div className="container">
          <div className="logo">
            <Link to="/" className="logo_menu">
              <img
                src="assets/img/logo.svg"
                alt=""
                width="170"
                height="35"
                className="dark"
              />
              <img
                src="assets/img/logo-light-mode.svg"
                alt=""
                width="170"
                height="35"
                className="light"
              />
            </Link>
          </div>
          <ul className="top_menu drop_user">
            <li>
              <span className="color_mode_bt">
                <input id="theme_toggle" type="checkbox" name="theme_toggle" />
                <label htmlFor="theme_toggle"></label>
              </span>
            </li>
            <li>
              <div className={`dropdown user clearfix ${isOpen ? "show" : ""}`}>
                <Link
                  to="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded={isOpen}
                  onClick={toggleDropdown}
                >
                  <figure>
                    {/* <!-- Profile picture image--> */}
                    {!imageLoaded && (
                      <div className="loading-spinner">
                        {" "}
                        <Loader />{" "}
                      </div>
                    )}
                    <img
                      className={`img-account rounded-circle mb-4 ${
                        imageLoaded ? "" : "hidden"
                      }`}
                      src={imageSrc}
                      alt=""
                      height="54.375rem"
                      width="54.375rem"
                      onLoad={() => setImageLoaded(true)}
                      onError={() => setImageLoaded(false)}
                    />
                  </figure>
                  <div className="balance">
                    <h6 className="mb-0">Balance</h6>
                    <span>{merchant.walletMoney} snapps</span>
                  </div>
                </Link>
                <div
                  className={`dropdown-menu dropdown-menu-end animate ${
                    isOpen ? "fadeIn show" : ""
                  }`}
                >
                  <div className="dropdown-menu-content">
                    <figure>
                      <img
                        src="assets/img/cover_small.jpg"
                        alt=""
                        width="300"
                        height="138"
                      />
                    </figure>
                    <h4>@{merchant.firstName + merchant.lastName}</h4>
                    <p className="author_number">
                      Ox465d53...9df5{" "}
                      <a href="#0">
                        <i className="bi bi-clipboard"></i>
                      </a>
                    </p>
                    <div className="balance">
                      <h4>Balance</h4>
                      <span>{merchant.walletMoney} snapps</span>
                    </div>
                    <ul>
                      <li>
                        <Link to="#">
                          <i className="bi bi-person"></i>My profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/merchant-profile">
                          <i className="bi bi-pen"></i>Edit profile
                        </Link>
                      </li>
                      <li>
                        <Link to="#">
                          <i className="bi bi-gear"></i>Account
                        </Link>
                      </li>
                      <li>
                        <Link to="/merchant-dashboard">
                          <i className="bi bi-image"></i>Dashboard
                        </Link>
                      </li>
                      <li onClick={handleLogoutClick}>
                        <Link to="/merchant-login">
                          <i className="bi bi-box-arrow-right"></i>Log out
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </li>
          </ul>

          <a href="#0" className="open_close">
            <i className="bi bi-list"></i>
            <span>Menu</span>
          </a>
          <nav className="main-menu">
            <div id="header_menu">
              <a href="#0" className="open_close">
                <i className="bi bi-x"></i>
              </a>
              <a href="/" className="logo_menu">
                <img
                  src="assets/img/logo.svg"
                  alt=""
                  width="120"
                  height="30"
                  className="dark lazy"
                />
                <img
                  src="assets/img/logo-light-mode.svg"
                  alt=""
                  width="120"
                  height="30"
                  className="light lazy"
                />
              </a>
            </div>
            <ul>
              <li className="submenu">
                <Link to="/merchant-dashboard" className="show-submenu">
                  Home
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
