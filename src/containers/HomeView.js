import React, { Component } from "react";
import { View, UsersSection, PostsSection, AlbumsSection, PhotosSection } from "../components";

class HomeView extends Component {
    render() {
        return (
            <View>
                <UsersSection paginate={{to: "/users"}} />
                <PostsSection paginate={{to: "/posts"}} />
                <AlbumsSection paginate={{to: "/albums"}} />
                <PhotosSection paginate={{to: "/photos"}} />
            </View>
        );
    }
}

export default HomeView;