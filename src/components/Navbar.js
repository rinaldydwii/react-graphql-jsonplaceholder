import React, { Component } from "react";
import Container from "./Container";

class Navbar extends Component {
    constructor() {
        super()
        this.state = {
            stickyNav: false
        }
    }
    componentDidMount(){
        window.addEventListener('scroll', this.handleScroll);
    }
    componentWillUnmount() {
        window.removeEventListener('scroll', this.handleScroll);
    }
    handleScroll = () => {
        const nav = document.querySelector('nav').offsetTop;
        const scrollY = window.scrollY;
        if (scrollY > nav) {
            this.setState({stickyNav: true});
        } else if (scrollY < nav) {
            this.setState({stickyNav: false});
        }
    }
    render() {
        return (
            <div className={`nav ${this.state.stickyNav ? "sticky" : ""}`}>
                <Container>
                    <div className="nav__brand">
                        <a href="/">rinaldydwii</a>
                    </div>
                    <nav>
                        <ul>
                            <li className="nav__item"><a href="/">Home</a></li>
                            <li className="nav__item"><a href="/users">Users</a></li>
                            <li className="nav__item"><a href="/posts">Posts</a></li>
                            <li className="nav__item"><a href="/albums">Albums</a></li>
                            <li className="nav__item"><a href="/photos">Photos</a></li>
                        </ul>
                    </nav>
                </Container>
            </div>
        )
    }
} 
export default Navbar;