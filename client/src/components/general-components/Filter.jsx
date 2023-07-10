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
        <aside class="col-lg-3" id="sidebar_fixed">
            <div class="filter_col">
                <div class="inner_bt"><a href="#" class="open_filters"><i class="bi bi-x"></i></a></div>
                <div class="filter_type">
                    <h4><a href="#filter_1" data-bs-toggle="collapse" class="opened" onClick={(e) => {
                        e.target.classList.toggle("closed")
                        e.target.classList.toggle("opened")
                    }}>Categories</a></h4>
                    <div class="collapse show" id="filter_1">
                        <ul>
                            {children[0]}
                        </ul>
                    </div>
                </div>
                <div class="filter_type">
                    <h4><a href="#filter_3" data-bs-toggle="collapse" class="opened" onClick={(e) => {
                        e.target.classList.toggle("opened")
                        e.target.classList.toggle("closed")
                    }}>Snapps</a></h4>
                   {children[1]}
                </div>
                {/* <div class="buttons">
                    <a href="#0" class="btn_1 full-width outline">Filter</a>
                </div> */}
            </div>
        </aside>
    )
}


export default Filter;