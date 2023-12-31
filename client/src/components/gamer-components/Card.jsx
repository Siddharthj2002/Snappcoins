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
        : "assets/img/avatar-user.jpg"
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
              height="78.375rem"
              width="83.375rem"
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
      <hr />

      <ul>
        <li>
          Redeemed <span className="badge bg-success"></span>
        </li>
        <li>
          Pending Orders <span className="badge bg-warning">{props.pending}</span>
        </li>
      </ul>

      <small>Member since {localDate}</small>
    </div>
  );
};

export default Card;