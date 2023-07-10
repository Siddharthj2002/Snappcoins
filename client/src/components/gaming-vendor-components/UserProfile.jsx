import React from "react";
import { useNavigate } from "react-router-dom";

const UserProfile = (props) => {
  const navigate = useNavigate();

  const handleLogOut = () => {
    try {
      fetch("http://localhost:3001/gaming-vendor-auth/logout", {
        credentials: "include",
      })
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          if (data.success) {
            navigate("/gaming-vendor-login");
          } else {
            throw new Error("Log out unsuccessful");
          }
        });
    } catch (error) {
      console.log(error);
      return;
    }
  };

  const handleSettings = () => {
    navigate("/gaming-vendor-settings");
  };

  const handleDashboard = () => {
    navigate("/gaming-vendor-dashboard");
  };

  return (
    <div className="col-lg-3">
      <div className="main_profile edit_section">
        <div className="author">
          <div className="author_thumb veryfied">
            <i className="bi bi-check" />
            <figure>
              <img
                src="assets/img/avatar1.jpg"
                alt=""
                className="lazy"
                width={100}
                height={100}
              />
            </figure>
          </div>
        </div>
        <h1 id="vendor_name">{props.name}</h1>
        <ul>
          <li>
            <a
              href="#"
              onClick={handleDashboard}
              className={props.page === "dashboard" ? "active" : ""}
            >
              <i className="bi bi-file-earmark-arrow-up" />
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              id="account-settings"
              onClick={handleSettings}
              className={props.page === "settings" ? "active" : ""}
            >
              <i className="bi bi-gear" />
              Account settings
            </a>
          </li>
          <li>
            <a href="#" onClick={handleLogOut}>
              <i className="bi bi-box-arrow-right" />
              Log out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default UserProfile;
