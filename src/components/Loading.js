import React from "react";
import Container from "./Container";

const Loading = ({loading, error, children}) => {
    return loading ? (
        <div className="text-center">
            <img src={require('../assets/loading.svg')} alt="loading" className="loading__image"/>
        </div>
    ) : (
        !error ?
        children : 
        (
            <Container>
                <p>{error}</p>
            </Container>
        )
    )
}

export default Loading;