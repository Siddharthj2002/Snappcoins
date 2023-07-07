import React from "react";
import FullpageLoader from "../../components/general-components/FullpageLoader";
import { Link } from "react-router-dom";

const Connect = () => {
  return (
    <>
      {/* <FullpageLoader /> */}

      <header class="header clearfix element_to_stick">
        <div class="layer"></div>
        <div class="container">
          <div class="logo">
            <Link to="/">
              <img
                src="assets/img/logo.svg"
                alt=""
                width="170"
                height="35"
                class="dark"
              />
              <img
                src="assets/img/logo-light-mode.svg"
                alt=""
                width="170"
                height="35"
                class="light"
              />
            </Link>
          </div>
          <ul class="top_menu">
            <li>
              <span class="color_mode_bt">
                <input id="theme_toggle" type="checkbox" name="theme_toggle" />
                <label for="theme_toggle"></label>
              </span>
            </li>
            <li>
              <Link to="/connect" class="btn_access">
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
                    <Link to="/merchant-signup">Merchant</Link>
                  </li>
                  <li className="option">
                    <Link>Gamer</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>

          <a href="#0" class="open_close">
            <i class="bi bi-list"></i>
            <span>Menu</span>
          </a>
          <nav class="main-menu">
            <div id="header_menu">
              <a href="#0" class="open_close">
                <i class="bi bi-x"></i>
              </a>
              <a href="index.html">
                <img
                  src="assets/img/logo-placeholder.png"
                  data-src="assets/img/logo.svg"
                  width="120"
                  height="30"
                  alt=""
                  class="lazy"
                />
              </a>
            </div>
            <ul>
              <li class="submenu">
                <Link to="/" class="show-submenu">
                  Home
                </Link>
              </li>
              <li class="submenu">
                <Link to="/catalog" class="show-submenu">
                  Explore
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main>
        <div
          className="hero_single inner_pages"
          style={{ backgroundImage: `url('assets/img/hero_general.jpg')` }}
        >
          <div
            className="opacity-mask"
            style={{ backgroundColor: "rgba(0, 0, 0, 0.5)" }}
          >
            <div className="container">
              <div className="row justify-content-center">
                <div className="col-xl-8 col-lg-10 col-md-8">
                  <h1 className="slide-animated one">Connect your Wallet</h1>
                  <p className="slide-animated two">
                    Vim te audiam impetus interpretaris impedit
                  </p>
                </div>
              </div>
              {/* /row */}
            </div>
          </div>
          <div className="wave hero"></div>
        </div>

        <div class="container margin_90_60">
          <div class="row justify-content-center">
            <div class="col-lg-4">
              <a href="#0" class="box_general wallet_connect">
                <div class="ribbon_top">
                  <span class="top_selling">Popular</span>
                </div>
                <figure>
                  <img
                    src="assets/img/meta_mask_logo.svg"
                    alt=""
                    width="80"
                    height="80"
                  />
                </figure>
                <h3>A23 Rummy</h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque.
                </p>
              </a>
            </div>
            <div class="col-lg-4">
              <a href="#0" class="box_general wallet_connect">
                <figure>
                  <img
                    src="assets/img/wallet_connect.svg"
                    alt=""
                    width="80"
                    height="80"
                  />
                </figure>
                <h3>Call Break</h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque.
                </p>
              </a>
            </div>
            <div class="col-lg-4">
              <a href="#0" class="box_general wallet_connect">
                <figure>
                  <img
                    src="assets/img/fortmatic.svg"
                    alt=""
                    width="80"
                    height="80"
                  />
                </figure>
                <h3>Ludo King</h3>
                <p>
                  Sed ut perspiciatis unde omnis iste natus error sit voluptatem
                  accusantium doloremque.
                </p>
              </a>
            </div>
          </div>
        </div>
      </main>

      <footer>
        <div class="container">
          <div class="row">
            <div class="col-lg-3 col-md-6 col-sm-6">
              <h3>Quick Links</h3>
              <div class="links">
                <ul>
                  <li>
                    <a href="catalog.html">Explore</a>
                  </li>
                  <li>
                    <a href="login.html">Login</a>
                  </li>
                  <li>
                    <a href="register.html">Register</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <h3>Snappcoins</h3>
              <div class="links">
                <ul>
                  <li>
                    <a href="connect-wallet.html">Connect Wallet</a>
                  </li>
                  <li>
                    <a href="help.html">Faq</a>
                  </li>
                  <li>
                    <a href="become-partner.html">Become a Partner</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <h3>Resources</h3>
              <div class="links">
                <ul>
                  <li>
                    <a href="#">Community</a>
                  </li>
                  <li>
                    <a href="#">How it Works</a>
                  </li>
                  <li>
                    <a href="#">Latest Products</a>
                  </li>
                </ul>
              </div>
            </div>
            <div class="col-lg-3 col-md-6 col-sm-6">
              <h3>Keep in touch</h3>
              <div id="newsletter">
                <div id="message-newsletter"></div>
                <form method="post" name="newsletter_form" id="newsletter_form">
                  <div class="form-group">
                    <input
                      type="email"
                      name="email_newsletter"
                      id="email_newsletter"
                      class="form-control"
                      placeholder="Your email"
                    />
                    <button type="submit" id="submit-newsletter">
                      <i class="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div class="follow_us">
                <ul>
                  <li>
                    <a href="#0">
                      <img
                        src="assets/img/twitter_icon.svg"
                        alt=""
                        class="lazy"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <img
                        src="assets/img/facebook_icon.svg"
                        alt=""
                        class="lazy"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <img
                        src="assets/img/instagram_icon.svg"
                        alt=""
                        class="lazy"
                      />
                    </a>
                  </li>
                  <li>
                    <a href="#0">
                      <img
                        src="assets/img/youtube_icon.svg"
                        alt=""
                        class="lazy"
                      />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <hr />
          <div class="row add_bottom_25">
            <div class="col-md-6">
              <ul class="footer-selector clearfix">
                <li>
                  <div class="styled-select lang-selector">
                    <select>
                      <option value="English" selected>
                        English
                      </option>
                      <option value="French">French</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Russian">Russian</option>
                    </select>
                  </div>
                </li>
              </ul>
            </div>
            <div class="col-md-6">
              <ul class="additional_links">
                <li>
                  <a href="#">Terms and conditions</a>
                </li>
                <li>© 2023 Snappcoins</li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
      <div id="toTop"></div>
    </>
  );
};
export default Connect;
