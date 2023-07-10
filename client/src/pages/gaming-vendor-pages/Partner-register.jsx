import React, { useState } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/general-components/Header.jsx";
import Footer from "../../components/general-components/Footer.jsx";
import LoginForm from "../../components/gaming-vendor-components/LoginForm.jsx";
import FullpageLoader from "../../components/general-components/FullpageLoader.jsx";
import Hero from "../../components/gaming-vendor-components/Hero.jsx";

const Register = () => {
  const [companyName, setCompanyName] = useState("");
  const [country, setCountry] = useState("U.S.A");
  const [description, setDescription] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [agreeTerms, setAgreeTerms] = useState(true);

  const handleRegister = () => {
    // Make API call with the captured data
    const data = {
      companyName,
      country,
      description,
      email,
      phoneNumber,
      agreeTerms,
    };

    console.log(data);

    // // Example API call using fetch:
    // fetch("http://localhost:3002/gaming-vendor-auth/register-user", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(data),
    // })
    //   .then((response) => response.json())
    //   .then((result) => {
    //     // Handle the API response here
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     // Handle any errors here
    //     console.error(error);
    //   });
  };

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
        <Hero />
        <div className="container margin_30_40">
          <div className="row">
            <div className="col-lg-9 ps-lg-5">
              <div className="main_title version_2">
                <span>
                  <em />
                </span>
                <h2>Register as a Game Owner</h2>
              </div>
              <div className="row">
                <div className="col-md-8">
                  <div className="form-group">
                    <label>Company Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Full Company Name"
                      value={companyName}
                      onChange={(e) => setCompanyName(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="form-group">
                    <label>Country of Business Registration</label>
                    <div className="custom_select">
                      <select
                        className="nice-select wide"
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                      >
                        <option value="U.S.A">U.S.A</option>
                        <option value="India">India</option>
                        <option value="Singapore">Singapore</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="form-group">
                    <label>Brief Description of your company</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter a short description here..."
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Email</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                </div>
                <div className="col-md-6">
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder=""
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              {/* /row */}
              <hr className="mt-3 mb-5" />
              <div className="row">
                <div className="col-md-12">
                  <div className="form-group switch_wrapper">
                    <label>Terms and Conditions</label>
                    <p className="mb-0">I agree to the terms and conditions</p>
                    <div className="form-check form-switch">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        role="switch"
                        checked={agreeTerms}
                        onChange={(e) => setAgreeTerms(e.target.checked)}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* /row */}
              <button
                className="btn_1"
                style={{ marginLeft: "50.4rem" }}
                onClick={handleRegister}
              >
                Register Me!
              </button>
            </div>
            <div className="col-lg-3">
              <div className="main_profile edit_section">
                <h1>Useful Links</h1>
                <ul>
                  <li>
                    <a href="#">
                      <i className="bi bi-gear" />
                      FAQ's
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-gear" />
                      How it Works
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <i className="bi bi-gear" />
                      Terms &amp; Conditions
                    </a>
                  </li>
                  <li>
                    <a href="#" className="">
                      <i className="bi bi-gear" />
                      Privacy Policy
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          {/* /row */}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Register;
