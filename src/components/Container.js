import React from "react";

const Container = ({children, className = "", small}) => (
    <div className={`container ${className} ${small ? "container__small" : ""}`}>
        {children}
    </div>
)
export default Container;