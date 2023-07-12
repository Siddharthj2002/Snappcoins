import React, { useState } from "react";
import { Link } from "react-router-dom";
import FilterCheck from "./FilterCheck";


function Filter({ children }) {
    const [isClicked, setClick] = useState(false)
    const handleCheck = function (e) {
        const filter_name = e.target.value;
        setClick(true);
    }

    return (
        <aside className="col-lg-3" id="sidebar_fixed">
            <div className="filter_col">
                <div className="inner_bt"><a href="#" className="open_filters"><i className="bi bi-x"></i></a></div>
                <div className="filter_type">
                    <h4><a href="#filter_1" data-bs-toggle="collapse" className="opened" onClick={(e) => {
                        e.target.classList.toggle("opened")
                        e.target.classList.toggle("closed")
                    }}>Categories</a></h4>
                    <div className="collapse show" id="filter_1">
                        <ul>
                            {children[0]}
                        </ul>
                    </div>
                </div>
                <div className="filter_type">
                    <h4><a href="#filter_3" data-bs-toggle="collapse" className="opened" onClick={(e) => {
                        e.target.classList.toggle("opened")
                        e.target.classList.toggle("closed")
                    }}>Snapps</a></h4>
                    {children[1]}
                </div>
                {/* <div className="buttons">
                    <a href="#0" className="btn_1 full-width outline">Filter</a>
                </div> */}
            </div>
        </aside>
    )
}


export default Filter;