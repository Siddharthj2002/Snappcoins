import React, { useState, useEffect,useCallback } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { Modal, ModalBody, ModalHeader } from 'reactstrap';
import Loader from './utils/Loader';
import useFetch from '../../hooks/useFetch-gamer';
import { Link } from 'react-router-dom';


export default function Recommended(props) {

  const [isLiked, setIsLiked] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageSrc, setImageSrc] = useState('');
  const [modal, setModal] = useState(false);
  const [showModal,setShowModal] = useState(false);
  

  const [user, setUser] = useState();

  console.log("user is: ",user)

  const token = localStorage.getItem('token');
  const [fetchData,{loading}] = useFetch();
  //const dispatch = useDispatch();

  const fetchUser = useCallback(() => {
    const config = { url: "/profile", method: "get", headers: { Authorization: token } };
    fetchData(config, { showSuccessToast: false })
      .then(data => {
        setUser(data.user);
        console.log("d is: ",data)
        //dispatch(gamerProfile(data.user));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [fetchData, token]);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  //console.log("ps: ".props.img)

  useEffect(() => {
    // Assuming you receive the image URL from props
    setImageSrc(
      props.img
        ? `${process.env.REACT_APP_URL}/api/merchant/img/${props.img}`
        : 'default-prod.png'
    );
    //setImage(props.img); // Set the image state variable
  }, [props.img]);

  const handleLikeClick = () => {
    setIsLiked(!isLiked);
  };

  const toggleModal = () => {
    setModal(!modal);
    setShowModal(!showModal);
  };

  const displayData = {

    title:props.title,
    desc:props.desc,
    brand:props.brand,
    price:props.price,
    
  }

  console.log("dd: ",displayData)
  
  return (
    <div className={`items-cont ${showModal ? 'blur-background' : ''}`} >

      <Modal size="small" isOpen={modal} toggle={toggleModal}>
        <ModalHeader toggle={toggleModal} >
          
          <b style={{color:"black"}}>Snap Now!</b></ModalHeader>
        <ModalBody>

            <form method="POST">
              <div className="modal-body">
                <p style={{color:"black"}}>You are about to purchase <b>{props.title}</b> <b>#304</b> from <b>George Lucas</b></p>
                <p><b style={{ margin: "0px",color:"black",paddingLeft:"16px"}}>Redeem with</b></p>
                <input type="text" className="form-control" placeholder="3.5 snapps" style={{ width: "100%", color: "black" ,marginTop:"-20px",marginBottom:"1rem"}} value={`${props.price}`}/> 
                <ul style={{listStyle:"none",color:"black"}}>
                   <li>
                      Your balance <span style={{marginLeft:"14rem"}}>{user && user.walletMoney} snapps</span>
                    </li>
                    <li>
                      Service fee 1.5%<span style={{marginLeft:"13rem"}}>0.125  snapps</span>
                    </li>
                              
                </ul>
              </div>
              <div className="modal-footer justify-content-center">

              <Link to='/details-page' state={{ displayData, imageSrc }} style={{ width: "100%" }}>
                <button type="button" className="btn" style={{ width: "100%", background: "#ff0071", color: "white" }}>
                  Snap It!
                </button>
              </Link>
                <button type="button" className="btn" data-bs-dismiss="modal" style={{ width: "100%",background:"black",color:"white" }} onClick={toggleModal}>Cancel</button>
              </div>
            </form>
        </ModalBody>
      </Modal>
      <div className="img-fluid">
        {/* item begins here */}
        <div className="item">
          <div className="card" style={{ zIndex: '2', padding: '0px' }}>
            <div
              className="image-container"
              style={{
                position: 'relative',
                height: '75%',
                backgroundImage: 'linear-gradient(to bottom, #e8e8e8, #d3d3d3)',
                overflow: 'hidden',
              }}
            >
              {!imageLoaded && <div > <Loader /> </div>}
              <img
                src={imageSrc}
                data-src="img/items/item-4.jpg"
                className={`lazy ${imageLoaded ? '' : 'hidden'}`}
                alt=""
                height="50px"
                width="100%"
                onLoad={() => setImageLoaded(true)}
                onError={() => setImageLoaded(false)}
              />

              <div className="badge">
                <span className="badge-text">{props.price} snaps</span>
              </div>
              <div
                style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  width: '100%',
                  height: '25%',
                  background: 'linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0))',
                  zIndex: 1,
                }}
              ></div>

              <button className="snap-button" onClick={toggleModal}>
                Snapp Now
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                height: '50px',
                padding: '20px',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <img
                  src="assets/img/icon.png"
                  alt="Icon"
                  style={{ width: '20px', height: '20px', marginRight: '5px' }}
                />
                <span>{props.title}</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  marginLeft: 'auto',
                }}
              >
                <FontAwesomeIcon
                  icon={faHeart}
                  style={{
                    color: isLiked ? '#D63384' : 'grey',
                    cursor: 'pointer',
                  }}
                  onClick={handleLikeClick}
                />
                <span style={{ marginLeft: '5px' }}>50</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
