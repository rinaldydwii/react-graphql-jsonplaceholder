import React from 'react';
import Container from './Container'
import Navbar from './Navbar'
import Footer from './Footer'

const View = ({children, containerClassName}) => (
    <React.Fragment>
        <Navbar />
        <Container className={containerClassName}>
            {children}
        </Container>
        <Footer />
    </React.Fragment>
)

export default View;
