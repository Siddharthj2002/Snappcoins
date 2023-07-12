import React from "react";
import {Link} from "react-router-dom";

function HeaderCat() {
    return (
        <header className="header_in clearfix">
            <div className="layer"></div>
            <div className="container">
                <div className="logo">
                    <Link to="/">
                        <img src="assets/img/logo.svg" alt="" width="170" height="35" className="dark" />
                        <img src="assets/img/logo-light-mode.svg" alt="" width="170" height="35" className="light" />
                    </Link>
                </div>
                <ul className="top_menu">
                    <li>
                        <span className="color_mode_bt">
                            <input id="theme_toggle" type="checkbox" name="theme_toggle" />
                            <label for="theme_toggle"></label>
                        </span>
                    </li>
                    <li><Link to="/login" className="btn_access">Log In</Link></li>  <li><Link to="/connect" className="btn_access">Connect Snappcoins</Link></li>
                </ul>
                <Link to="#0" className="open_close">
                    <i className="bi bi-list"></i><span>Menu</span>
                </Link>
                <nav className="main-menu">
                    <div id="header_menu">
                        <Link to="#0" className="open_close">
                            <i className="bi bi-x"></i>
                        </Link>
                        <Link to="/" className="logo_menu">
                            <img src="assets/img/logo-placeholder.png" data-src="img/logo.svg" alt="" width="120" height="30" className="dark lazy" />
                            <img src="assets/img/logo-placeholder.png" data-src="img/logo-light-mode.svg" alt="" width="120" height="30" className="light lazy" />
                        </Link>
                    </div>
                    <ul>
                        <li className="submenu">
                            <Link to="/" className="show-submenu">Home</Link></li>
                        <li className="submenu"><Link to="/catalog" className="show-submenu">Explore</Link></li>
                    </ul>
                </nav>
            </div>
        </header>
    )
}


export default HeaderCat;