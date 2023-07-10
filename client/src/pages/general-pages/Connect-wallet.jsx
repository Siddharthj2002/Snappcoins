import React from "react";
import FullpageLoader from "../../components/general-components/FullpageLoader";
import Header from "../../components/general-components/Header";
import Footer from "../../components/general-components/Footer";

const Connect = () => {
  return (
    <>
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

      <Footer />
    </>
  );
};
export default Connect;
