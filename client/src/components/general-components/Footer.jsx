import React from "react";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <>
      <footer>
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-6 col-sm-6">
              <h3>Quick Links</h3>
              <div className="links">
                <ul>
                  <li>
                    <Link to="/catalog">Explore</Link>
                  </li>
                  <li>
                    <Link to="#">Login</Link>
                  </li>
                  <li>
                    <Link to="#">Register</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <h3>Snappcoins</h3>
              <div className="links">
                <ul>
                  <li>
                    <Link to="/connect">Connect Wallet</Link>
                  </li>
                  <li>
                    <Link to="#">Faq</Link>
                  </li>
                  <li>
                    <Link to="/gaming-vendor-login">Become a Partner</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <h3>Resources</h3>
              <div className="links">
                <ul>
                  <li>
                    <Link to="#">Community</Link>
                  </li>
                  <li>
                    <Link to="#">How it Works</Link>
                  </li>
                  <li>
                    <Link to="#">Latest Products</Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6">
              <h3>Keep in touch</h3>
              <div id="newsletter">
                <div id="message-newsletter"></div>
                <form method="post" name="newsletter_form" id="newsletter_form">
                  <div className="form-group">
                    <input
                      type="email"
                      name="email_newsletter"
                      id="email_newsletter"
                      className="form-control"
                      placeholder="Your email"
                    />
                    <button type="submit" id="submit-newsletter">
                      <i className="bi bi-chevron-right"></i>
                    </button>
                  </div>
                </form>
              </div>
              <div className="follow_us">
                <ul>
                  <li>
                    <Link to="#0">
                      <img
                        src="assets/img/twitter_icon.svg"
                        alt=""
                        className="lazy"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="#0">
                      <img
                        src="assets/img/facebook_icon.svg"
                        alt=""
                        className="lazy"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="#0">
                      <img
                        src="assets/img/instagram_icon.svg"
                        alt=""
                        className="lazy"
                      />
                    </Link>
                  </li>
                  <li>
                    <Link to="#0">
                      <img
                        src="assets/img/youtube_icon.svg"
                        alt=""
                        className="lazy"
                      />
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <hr />
          <div className="row add_bottom_25">
            <div className="col-md-6">
              <ul className="footer-selector clearfix">
                <li>
                  <div className="styled-select lang-selector">
                    <select defaultValue="English">
                      <option value="English">English</option>
                      <option value="French">French</option>
                      <option value="Spanish">Spanish</option>
                      <option value="Russian">Russian</option>
                    </select>
                  </div>
                </li>
              </ul>
            </div>
            <div className="col-md-6">
              <ul className="additional_links">
                <li>
                  <a to="#">Terms and conditions</a>
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
}

export default Footer;
