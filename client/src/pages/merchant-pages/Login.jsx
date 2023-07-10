import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch-merchant";
import { merchantProfile } from "../../redux/actions/merchantAction";
import { useDispatch } from "react-redux";
import PreLoader from "../../components/merchant-components/utils/PreLoader";
import FullpageLoader from "../../components/general-components/FullpageLoader";

const Login = () => {
  const navigate = useNavigate();
  const [fetchData, { loading }] = useFetch();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = { url: `/auth/login`, method: "post", data: formData };
    fetchData(config)
      .then((data) => {
        localStorage.setItem("token", data.token);
        localStorage.setItem("verify", true);
        dispatch(merchantProfile(data.user));
        navigate("/merchant-verify", {
          state: { id: data.id, email: data.email },
        });
      })
      .catch((error) => {
        // Handle the error here, e.g., log the error or display an error message
        console.error("Error fetching tasks:", error);
      });
  };

  return (
    <>
      <FullpageLoader />
      <div id="login_bg" className="bg-login">
        {loading ? (
          <PreLoader />
        ) : (
          <div id="login">
            <aside>
              <figure>
                <a href="/" className="logo_account">
                  <img
                    src="assets/img/logo.svg"
                    alt=""
                    width="140"
                    height="35"
                    className="dark"
                  />
                </a>
              </figure>
              <form>
                <div className="access_social">
                  <a href="#0" className="social_bt facebook">
                    Login with Facebook
                  </a>
                  <a href="#0" className="social_bt google">
                    Login with Google
                  </a>
                </div>
                <div className="divider">
                  <span>Or</span>
                </div>
                <div className="form-group mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="Email"
                  />
                </div>
                <div className="form-group">
                  <input
                    type="password"
                    className="form-control"
                    name="password"
                    id="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="Password"
                    autoComplete="on"
                  />
                </div>
                <div className="clearfix add_bottom_30">
                  <div className="checkboxes float-start">
                    <label className="container_check">
                      Remember me
                      <input type="checkbox" />
                      <span className="checkmark"></span>
                    </label>
                  </div>
                  <div className="float-end">
                    <Link id="forgot" to="#">
                      Forgot Password?
                    </Link>
                  </div>
                </div>
                <a
                  href="user-dashboard.html"
                  className="btn_1 full-width"
                  onClick={handleSubmit}
                >
                  Login
                </a>
                <div className="text-center add_top_10">
                  New to <a href="/">SnappCoins?</a>{" "}
                  <strong>
                    <Link to="/merchant-signup">Sign up!</Link>
                  </strong>
                </div>
              </form>
              <div className="copy">© 2023 Snappcoins</div>
            </aside>
          </div>
        )}
      </div>
    </>
  );
};

export default Login;
