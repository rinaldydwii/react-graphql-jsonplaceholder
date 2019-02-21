import React, { Component } from "react";
import { NavLink } from "react-router-dom"
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
                        <NavLink to="/">rinaldydwii</NavLink>
                    </div>
                    <nav>
                        <ul>
                            <li className="nav__item"><NavLink to="/">Home</NavLink></li>
                            <li className="nav__item"><NavLink to="/users">Users</NavLink></li>
                            <li className="nav__item"><NavLink to="/posts">Posts</NavLink></li>
                            <li className="nav__item"><NavLink to="/albums">Albums</NavLink></li>
                            <li className="nav__item"><NavLink to="/photos">Photos</NavLink></li>
                        </ul>
                    </nav>
                </Container>
            </div>
        )
    }
} 
export default Navbar;