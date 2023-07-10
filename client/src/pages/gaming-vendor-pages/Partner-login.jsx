import React from "react";
import { Link } from "react-router-dom";
import Header from "../../components/general-components/Header.jsx";
import Footer from "../../components/general-components/Footer.jsx";
import LoginForm from "../../components/gaming-vendor-components/LoginForm.jsx";
import FullpageLoader from "../../components/general-components/FullpageLoader.jsx";

const Login = () => {
  return (
    <>
      <meta charSet="utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content="Snappcoins - Ready , Steady, Snapp!" />
      <meta name="author" content="Snappcoins" />
      <title>Snappcoins - Ready , Steady, Snapp!</title>

      <FullpageLoader />
      <Header />

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
            </div>
          </div>
          <div className="wave hero"></div>
        </div>

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
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Login;
