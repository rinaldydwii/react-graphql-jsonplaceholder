import React from "react";
import { Link } from "react-router-dom"

const ReadMoreButton = ({to, onClick}) => (
    <div className="text-center">
        { to ? 
        ( <Link to={to} className="button button__read-more">See more</Link> ) : 
        ( <button className="button button__read-more" onClick={onClick}>See more</button> ) }
    </div>
)        
    
export default ReadMoreButton;