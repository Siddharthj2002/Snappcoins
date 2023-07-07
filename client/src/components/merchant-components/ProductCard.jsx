import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { updateMerchandise } from "../../redux/actions/merchantAction";
import Loader from "./utils/Loader";

function ProductCard(props) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState("");

    useEffect(() => {
        setImageSrc(
          props.img
            ? `${process.env.REACT_APP_URL}/api/merchandise/img/${props.img}`
            : "default-prod.png"
        );
      }, [props.img]);

      const dispatch = useDispatch()
      
    const handleUpdate = () =>{
        dispatch(updateMerchandise(props.merchandise))
    }

    return (
        <>
            <div className="col-xl-4 col-lg-6 col-md-6 col-sm-6">
                <div className="strip">
                    <figure>
                        {!imageLoaded && <div> <Loader /> </div>}
                        <img
                        src={imageSrc}
                        data-src="img/items/item-4.jpg"
                        className={`lazy ${imageLoaded ? "" : "hidden"}`}
                        alt=""
                        height="50px"
                        onLoad={() => setImageLoaded(true)}
                        onError={() => setImageLoaded(false)}
                        />
                    </figure>
                    <div className="card-body lh-1 text-white">
                        <h5 className="card-title text-left">{props.title}</h5>
                        <hr className="bg-white"/>
                        <p className="card-text">{props.description}</p>
                        <p className="card-text">Brand : {props.brand}</p>
                        <p className="card-text">Category : {(props.category).map((category,index)=>` ${category} `)}</p>
                        <p className="card-text">In stock : {props.count}</p>
                        <p className="card-text">Price : {props.price}</p>
                        <div className="d-flex justify-content-around">
                        <button className="btn btn-primary btn-sm mx-1 w-25" data-bs-toggle="modal" data-bs-target="#editPro" onClick={handleUpdate} ><i className="fa-solid fa-pen-to-square"></i></button>
                        <button className="btn btn-danger btn-sm mx-1 w-25" onClick={props.onDeleteMerchandise}><i className="fa-solid fa-trash-can"></i></button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}


export default ProductCard;