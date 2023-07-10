import React, { useState, useEffect, useCallback } from "react";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import Loader from "./utils/Loader";
import useFetch from "../../hooks/useFetch-gamer";
import { Link } from "react-router-dom";

export default function Recommended(props) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState("");
  const [modal, setModal] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const [user, setUser] = useState();

  const token = localStorage.getItem("token");
  const [fetchData, { loading }] = useFetch();

  useEffect(() => {
    // Assuming you receive the image URL from props
    setImageSrc(
      props.img
        ? `${process.env.REACT_APP_GAMER_MODULE_URL}/api/merchant/img/${props.img}`
        : "default-prod.png"
    );
    setImageLoaded(false);
  }, [props.img]);

  const toggleModal = () => {
    setModal((prevState) => !prevState);
    setShowModal((prevState) => !prevState);
  };

  const displayData = {
    title: props.title,
    desc: props.desc,
    brand: props.brand,
    price: props.price,
  };

  const fetchUser = useCallback(() => {
    const config = {
      url: "/profile",
      method: "get",
      headers: { Authorization: token },
    };
    fetchData(config, { showSuccessToast: false })
      .then((data) => {
        setUser(data.user);
        console.log("data is: ", data);
        // dispatch(gamerProfile(data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  return (
    <div className="strip" style={{ padding: "0px", margin: "0px" }}>
      <Modal size="small" isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal}>
          <b style={{ color: "black" }}>Snap Now!</b>
        </ModalHeader>
        <ModalBody>
          <form method="POST">
            <div className="modal-body">
              <p style={{ color: "black" }}>
                You are about to purchase <b>{props.title}</b> <b>#304</b> from{" "}
                <b>George Lucas</b>
              </p>
              <p>
                <b
                  style={{ margin: "0px", color: "black", paddingLeft: "16px" }}
                >
                  Redeem with
                </b>
              </p>
              <input
                type="text"
                className="form-control"
                placeholder="3.5 snapps"
                style={{
                  width: "100%",
                  color: "black",
                  marginTop: "-20px",
                  marginBottom: "1rem",
                }}
                value={`${props.price}`}
              />
              <ul style={{ listStyle: "none", color: "black" }}>
                <li>
                  Your balance{" "}
                  <span style={{ marginLeft: "14rem" }}>
                    {user && user.walletMoney} snapps
                  </span>
                </li>
                <li>
                  Service fee 1.5%
                  <span style={{ marginLeft: "13rem" }}>0.125 snapps</span>
                </li>
              </ul>
            </div>
            <div className="modal-footer justify-content-center">
              <Link
                to="/details-page"
                state={{ displayData, imageSrc }}
                style={{ width: "100%" }}
              >
                <button
                  type="button"
                  className="btn"
                  style={{
                    width: "100%",
                    background: "#ff0071",
                    color: "white",
                  }}
                >
                  Snap It!
                </button>
              </Link>
              <button
                type="button"
                className="btn"
                data-bs-dismiss="modal"
                style={{ width: "100%", background: "black", color: "white" }}
                onClick={toggleModal}
              >
                Cancel
              </button>
            </div>
          </form>
        </ModalBody>
      </Modal>
      <figure>
        <a
          href="#modal-dialog"
          className="btn_1 modal_popup"
          onClick={toggleModal}
        >
          Snapp Now!
        </a>
        {!imageLoaded && (
          <div>
            <Loader />
          </div>
        )}
        <img
          src={imageSrc}
          style={{ width: "533", height: "400" }}
          data-src="img/items/item-4.jpg"
          className={`lazy ${imageLoaded ? "" : "hidden"}`}
          alt=""
          height="50px"
          width="100%"
          onLoad={() => setImageLoaded(true)}
          onError={() => setImageLoaded(false)}
        />
        <a href="detail-page.html" className="strip_info">
          <div className="item_title">
            <span className="badge bg-primary">{props.price} snapps</span>
          </div>
        </a>
      </figure>
      <ul>
        <li>
          <a href="author.html" className="author">
            <div className="author_thumb veryfied">
              <i className="bi bi-check"></i>
              <figure>
                <img
                  src="avatar1.jpg"
                  data-src="img/avatar2.jpg"
                  alt=""
                  className="lazy loaded"
                  width="100"
                  height="100"
                  data-was-processed="true"
                />
              </figure>
            </div>
            <h6>{props.title}</h6>
          </a>
        </li>
        <li>
          <a href="#0" className="wish_bt">
            <i className="bi bi-heart-fill"></i>
          </a>{" "}
          50
        </li>
      </ul>
    </div>
  );
}
