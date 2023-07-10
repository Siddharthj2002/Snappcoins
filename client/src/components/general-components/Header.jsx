import React from "react";
import {Link} from "react-router-dom";

function Header() {
  return (
    <header className="header clearfix element_to_stick">
      <div className="layer"></div>
      <div className="container">
        <div className="logo" style={{ paddingTop: "5px" }}>
          <Link to="/">
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

        <ul className="top_menu">
          <li style={{ paddingTop: "5px" }}>
            <span className="color_mode_bt">
              <input id="theme_toggle" type="checkbox" name="theme_toggle" />
              <label
                htmlFor="theme_toggle"
                style={{ fontSize: "16px", fontWeight: "bold" }}
              ></label>
            </span>
          </li>
          <li style={{ paddingTop: "5px" }}>
            <Link to="/connect" className="btn_access">
              Connect Snappcoins
            </Link>
          </li>
          <li>
            <div className="nice-select">
              <div className="btn_access">
                <span className="current">Login</span>
              </div>
              <ul className="list">
                <li className="option">
                  <Link to="/gaming-vendor-login">Gaming Vendor</Link>
                </li>
                <li className="option">
                  <Link to="/merchant-login">Merchant</Link>
                </li>
                <li className="option">
                  <Link to="/gamer-login">Gamer</Link>
                </li>
                <li className="option">
                  <Link to="/admin-dashboard">Admin</Link>
                </li>
              </ul>
            </div>
          </li>
        </ul>
      </div>
      <nav className="main-menu">
        <ul style={{ paddingTop: "5px" }}>
          <li className="submenu">
            <Link to="/" className="show-submenu">
              Home
            </Link>
          </li>
          <li className="submenu">
            <Link to="/catalog" className="show-submenu">
              Explore
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
}


export default Header;