import React, { useEffect, useState } from 'react'
import Loader from './utils/Loader';

const ProfileCard = (props) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        setImageSrc(
            props.image
            ? `${process.env.REACT_APP_MERCHANT_MODULE_URL}/api/profile/img/${props.image}`
            : "default-prod.png"
        );
        }, [props.image]);

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const options = {
            year: '2-digit',
            month: '2-digit',
            day: '2-digit',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true
        };
        return date.toLocaleString('en-US', options);
    }

  return (
    <div className="main_profile">
        <div className="author">
            <div className="author_thumb veryfied">
                <i className="bi bi-check"></i>
                <figure className='h-100'>
                    {!imageLoaded && <div className="loading-spinner"><Loader /></div>}
                    <img
                        src={imageSrc}
                        className={`lazy ${imageLoaded ? "" : "hidden"}`}
                        alt=""
                        width="100px"
                        style={{ width : "100px" , height : "100px" , borderRadius : "50%" }}
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(false)}
                    />
                </figure>
            </div>
        </div>
        <h1>@{props.merchantName}</h1>
        <p className="author_number">Ox465d53...9df5 <a href="#0"><i className="bi bi-clipboard"></i></a></p>
        <h2 className="content-h2">
            <span className="badge d-block">
            {props.walletMoney}
            <br /> <small> snapps</small>
        </span>
        </h2>
        <p>Member since {formatDate(props.memberSince)}</p>
        {/* <!-- <p>
            <a href="#0" className="btn_1 full-width mb-2">Follow</a>
            <a href="#0" className="btn_1 full-width outline">Send a message</a>
        </p>--> */}
        <hr/>
        
        <ul>
            <li>Redeemed <span className="badge bg-success">{props.redeemed}</span></li>
            {/* <li>Pending Orders <span className="badge bg-warning">56</span></li> */}
            </ul>
        
        <small>Member since {formatDate(props.memberSince)}</small>
        {/* <!--  <div className="follow_buttons">
            <ul>
                <li><a href="#0"><i className="bi bi-instagram"></i></a></li>
                <li><a href="#0"><i className="bi bi-facebook"></i></a></li>
                <li><a href="#0"><i className="bi bi-twitter"></i></a></li>
                <li><a href="#0"><i className="bi bi-youtube"></i></a></li>
            </ul>
        </div>--> */}
    </div>
                
  )
}

export default ProfileCard
