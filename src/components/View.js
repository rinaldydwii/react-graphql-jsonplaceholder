import React from 'react';
import Container from './Container'
import Navbar from './Navbar'
import Footer from './Footer'

const View = ({children, containerClassName, smallContainer = false}) => (
    <React.Fragment>
        <Navbar />
        <Container className={containerClassName} small={smallContainer}>
            {children}
        </Container>
        <Footer />
    </React.Fragment>
)

export default View;
