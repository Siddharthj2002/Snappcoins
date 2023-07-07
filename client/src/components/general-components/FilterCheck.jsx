import React from "react";

const FilterCheck = (props) => {
    return (<li>
        <label class="container_check">{props.name}<small>{props.count}</small>
            <input type="checkbox" onChange={(e) => props.handleCheck(e)} value={props.name} />
            <span class="checkmark"></span>
        </label>
    </li>)
}

export default FilterCheck;