import React, { useState, useEffect, useCallback }   from "react";

function MyItems(props) {
  console.log("myitems props are:", props);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");

  useEffect(() => {
    // Assuming you receive the image URL from props
    setImageSrc(
      props.img
        ? `${process.env.REACT_APP_GAMER_MODULE_URL}/api/merchant/img/${props.img}`
        : "assets/img/avatar1.jpg"
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
    <div
      classNameName="col-lg-4 col-md-6"
      data-cue="slideInUp"
      data-show={true}
      style={{
        animationName: "slideInUp",
        animationDuration: "300ms",
        animationTimingFunction: "ease",
        animationDelay: "0ms",
        animationDirection: "normal",
        animationFillMode: "both",
      }}
    >
      <a href="#" className="history">
        <div
          className="history_thumb veryfied col-lg-6 col-md-8"
          style={{ margin: "1rem" }}
        >
          <figure>
          <img src={imageSrc} alt="" 
            data-src="img/items/item-4.jpg"
            className={`lazy ${imageLoaded ? "" : "hidden"}`}
            height="90px"
            width="100%"
            onLoad={() => setImageLoaded(true)}
            onError={() => setImageLoaded(false)} />
          </figure>
        </div>
        <div>
          <h6>Ludo King</h6>
          <span className="badge bg-primary">2300 snapps</span>
          <br />
          <small>
            <strong>Transaction ID:</strong>
            {props.tId}{" "}
          </small>
          <div className="clearfix"></div>
          <small>
            <strong>Date:</strong>
            {formatDate(props.tdate)}
          </small>
        </div>
      </a>
    </div>
  );
}

export default MyItems;