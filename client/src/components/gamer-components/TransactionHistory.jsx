import React, { useState, useEffect, useCallback }  from "react";

export default function TransactionHistory(props) {

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Assuming you receive the image URL from props
    setImageSrc(
      props.img
        ? `${process.env.REACT_APP_GAMER_MODULE_URL}/api/merchant/img/${props.img}`
        : "assets/img/default-prod.png"
    );
    setImageLoaded(false);
  }, [props.img]);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    };
    return date.toLocaleString("en-US", options);
  };

  return (
    <ul class="comments-list">
      <li>
        <div class="alignleft">
          <a href="#0">
            <img src={imageSrc} alt="" 
            data-src="img/items/item-4.jpg"
            className={`lazy ${imageLoaded ? "" : "hidden"}`}
            
            height="50px"
            width="100%"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)} />
          </a>
        </div>
        <small>{formatDate(props.tdate)}</small>
        <h3>
          <a href="#" title="">
            {props.tId}
          </a>
        </h3>
        {props.status === "Delivered" && (
          <span className="badge bg-success text-light mx-1">Delivered</span>
        )}
        {props.status === "In transit" && (
          <span className="badge bg-warning text-light mx-1">In Transit</span>
        )}
        {props.status === "Cancelled" && (
          <span className="badge bg-danger text-light  mx-1">Cancelled</span>
        )}
      </li>
    </ul>
  );
}
