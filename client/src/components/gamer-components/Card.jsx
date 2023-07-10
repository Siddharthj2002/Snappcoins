import React, { useEffect, useState } from "react";
import Loader from "./utils/Loader";
import { useSelector } from "react-redux";

const Card = (props) => {
  const gaming = useSelector((state) => state.gamerReducer);
  const profile = gaming.gamer;

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    setImageSrc(
      profile.image
        ? `${process.env.REACT_APP_GAMER_MODULE_URL}/api/profile/img/${profile.image}`
        : "assets/img/default-prod.png"
    );
  }, [profile.image]);

  const dateString = props.memberSince;
  const date = new Date(dateString);
  const options = { year: "numeric", month: "2-digit", day: "2-digit" };
  const localDate = date.toLocaleDateString(undefined, options);

  return (
    <div className="main_profile">
      <div className="author">
        <div className="author_thumb veryfied">
          <i className="bi bi-check"></i>
          <figure className="h-100">
            {!imageLoaded && (
              <div className="loading-spinner">
                <Loader />
              </div>
            )}
            <img
              className={`img-account  mb-4 ${imageLoaded ? "" : "hidden"}`}
              src={imageSrc}
              alt=""
              height="74.375rem"
              width="84.375rem"
              onLoad={() => setImageLoaded(true)}
              onError={() => setImageLoaded(false)}
            />
          </figure>
        </div>
      </div>
      <h1>@{props.gamerName}</h1>
      <p className="author_number">
        Ox465d53...9df5{" "}
        <a href="#0">
          <i className="bi bi-clipboard"></i>
        </a>
      </p>
      <h3 className="content-h2">
        <span className="badge d-block">
          {props.walletMoney}
          <small> snapps</small>
        </span>
      </h3>
      <p>Member since {localDate}</p>
      {/* <!-- <p>
            <a href="#0" className="btn_1 full-width mb-2">Follow</a>
            <a href="#0" className="btn_1 full-width outline">Send a message</a>
        </p>--> */}
      <hr />

      <ul>
        <li>
          Redeemed <span className="badge bg-success">120</span>
        </li>
        <li>
          Pending Orders <span className="badge bg-warning">56</span>
        </li>
      </ul>

      <small>Member since {localDate}</small>
      {/* <!--  <div className="follow_buttons">
            <ul>
                <li><a href="#0"><i className="bi bi-instagram"></i></a></li>
                <li><a href="#0"><i className="bi bi-facebook"></i></a></li>
                <li><a href="#0"><i className="bi bi-twitter"></i></a></li>
                <li><a href="#0"><i className="bi bi-youtube"></i></a></li>
            </ul>
        </div>--> */}
    </div>
  );
};

export default Card;
