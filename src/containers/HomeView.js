import React, { Component } from "react";
import { Container, UsersSection, PostsSection, AlbumsSection, PhotosSection } from "../components";

class HomeView extends Component {
    render() {
        return (
            <Container>
                <UsersSection />
                <PostsSection />
                <AlbumsSection />
                <PhotosSection />
            </Container>
        );
    }
}

export default HomeView;