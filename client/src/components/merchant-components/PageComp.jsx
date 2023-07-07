import React from "react";
import {Link} from "react-router-dom"

function PageComp(props) {

    return(
            <Link className={ props.isActive.toString() && "active"} to="#" onClick={(e) => { return props.handleClick(e)}}>{props.pagenum}</Link>
    )
}

export default PageComp;