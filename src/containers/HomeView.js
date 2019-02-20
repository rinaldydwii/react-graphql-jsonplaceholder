import React, { Component } from "react";
import { Container, UsersSection, PostsSection, AlbumsSection, PhotosSection } from "../components";

class HomeView extends Component {
    render() {
        return (
            <Container>
                <UsersSection paginate={{to: "/users"}} />
                <PostsSection paginate={{to: "/posts"}} />
                <AlbumsSection paginate={{to: "/albums"}} />
                <PhotosSection paginate={{to: "/photos"}} />
            </Container>
        );
    }
}

export default HomeView;