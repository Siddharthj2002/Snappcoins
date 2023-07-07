import React from "react";
import { Link } from "react-router-dom";
import "../../styles/custom.css";
import Footer from "../../components/gaming-vendor-components/Footer.jsx";
import LoginForm from "../../components/gaming-vendor-components/LoginForm.jsx";

const Login = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Snappcoins - Ready , Steady, Snapp!" />
      <meta name="author" content="Snappcoins" />
      <title>Snappcoins - Ready , Steady, Snapp!</title>

      {/* <div id="preloader">
        <div data-loader="circle-side" />
      </div> */}

      <header className="header clearfix element_to_stick">
        <div className="layer" />

        <div className="container">
          <div className="logo">
            <Link to="/">
              <img
                src="assets/img/logo.svg"
                alt=""
                width={170}
                height={35}
                className="dark"
              />
              <img
                src="assets/img/logo-light-mode.svg"
                alt=""
                width={170}
                height={35}
                className="light"
              />
            </Link>
          </div>
          <ul className="top_menu">
            <li>
              <span className="color_mode_bt">
                <input id="theme_toggle" type="checkbox" name="theme_toggle" />
                <label htmlFor="theme_toggle" />
              </span>
            </li>
            <li>
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
                    <Link to="/merchant-signup">Merchant</Link>
                  </li>
                  <li className="option">
                    <Link>Gamer</Link>
                  </li>
                </ul>
              </div>
            </li>
          </ul>
          {/* /top_menu */}
          <a href="#0" className="open_close">
            <i className="bi bi-list" />
            <span>Menu</span>
          </a>
          <nav className="main-menu">
            <div id="header_menu">
              <a href="#0" className="open_close">
                <i className="bi bi-x" />
              </a>
              <a href="index.html">
                <img
                  src="assets/img/logo-placeholder.png"
                  data-src="assets/img/logo.svg"
                  width={120}
                  height={30}
                  alt=""
                  className="lazy"
                />
              </a>
            </div>
            <ul>
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
        </div>
      </header>
      {/* /header */}
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
                  <h1 className="slide-animated one">Become a Partner</h1>
                  <p className="slide-animated two">
                    Build your Gaming Tribe. Now!
                  </p>
                </div>
              </div>
              {/* /row */}
            </div>
          </div>
          <div className="wave hero"></div>
        </div>

        {/* /hero_single */}
        <div className="container margin_60_90">
          <div className="main_title center">
            <span>
              <em />
            </span>
            <h2>Join Snappcoins</h2>
            <p>Cum doctus civibus efficiantur in imperdiet deterruisset.</p>
          </div>
          <div className="row">
            <div className="col-lg-4">
              <div className="box_why">
                <figure>
                  <img
                    src="assets/img/why_1.svg"
                    alt=""
                    width={200}
                    height={200}
                    className="img-fluid"
                  />
                </figure>
                <h3>Boost your Revenue</h3>
                <p className="lead">
                  {" "}
                  Illum suavitate ad has, inani salutatus sit et, error
                  reprehendunt id eam.
                </p>
                <p>
                  Eu quem patrioque delicatissimi est. Eos delectus perpetua
                  posidonium ei. Ad debitis accusamus eam. Nec ea esse nulla
                  aperiam, pri at decore numquam, no detracto cotidieque his.
                  Invenire facilisis ex ius.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box_why">
                <figure>
                  <img
                    src="assets/img/why_2.svg"
                    alt=""
                    width={200}
                    height={200}
                    className="img-fluid"
                  />
                </figure>
                <h3>Manage snapps</h3>
                <p className="lead">
                  Est falli invenire interpretaris id, magna libris sensibus mel
                  id.
                </p>
                <p>
                  Per eu nostrud feugiat. Et quo molestiae persecuti
                  neglegentur. At zril definitionem mei, vel ei choro volumus.
                  An tota nulla soluta has, ei nec essent audiam, te nisl
                  dignissim vel. Ex velit audire perfecto pro, ei mei doming
                  vivendo legendos.
                </p>
              </div>
            </div>
            <div className="col-lg-4">
              <div className="box_why">
                <figure>
                  <img
                    src="assets/img/why_3.svg"
                    alt=""
                    width={200}
                    height={200}
                    className="img-fluid"
                  />
                </figure>
                <h3>Reach New Gamers</h3>
                <p className="lead">
                  Laoreet inimicus vulputate est. Sea in voluptatibus
                  comprehensam.
                </p>
                <p>
                  Movet iriure dolores nec ea, per ei dicat audire
                  signiferumque. Illum porro gubergren vis in, affert graecis an
                  eos, qui quem facilis vulputate cu. Ei commodo prompta eum, et
                  eum vide appareat euripidis.
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* /container */}
        <div className="bg_gray" id="submit">
          <div className="container margin_120_90">
            <div className="row justify-content-center">
              <div className="col-lg-5">
                <div className="main_title center">
                  <span>
                    <em />
                  </span>
                  <h2>Please fill the form below</h2>
                  <p>
                    Id persius indoctum sed, audiam verear his in, te eum quot
                    comprehensam.
                  </p>
                </div>
                <div id="message-register" />

                <LoginForm />

                <div id="error-message" className="error-message" />
                <div id="toast" className="center">
                  <div className="checkicon">
                    <i className="fas fa-check-square" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* /container */}
        </div>
      </main>
      {/* /main */}
      <Footer />
      <div id="toTop" />
    </>
  );
};

export default Login;
