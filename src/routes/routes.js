import UsersView from "../containers/UsersView";
import UserView from "../containers/UserView";
import PostsView from "../containers/PostsView";
import PostView from "../containers/PostView";
import AlbumsView from "../containers/AlbumsView";
import AlbumView from "../containers/AlbumView";
import PhotosView from "../containers/PhotosView";
import PhotoView from "../containers/PhotoView";
import HomeView from "../containers/HomeView";
// import Error404View from "../containers/Error404View";
// import EditPostView from "../containers/EditPostView";
// import AddPostView from "../containers/AddPostView";

export const routes = [
    {
        exact: true,
        path: "/",
        component: HomeView,
    },
    {
        exact: true,
        path: "/users",
        component: UsersView
    },
    {
        exact: true,
        path: "/users/:id",
        component: UserView
    },
    {
        exact: true,
        path: "/posts",
        component: PostsView
    },
    // {
    //     exact: true,
    //     path: "/posts/add",
    //     component: AddPostView
    // },
    // {
    //     exact: true,
    //     path: "/posts/:id/edit",
    //     component: EditPostView
    // },
    {
        exact: true,
        path: "/posts/:id",
        component: PostView
    },
    {
        exact: true,
        path: "/albums",
        component: AlbumsView
    },
    {
        exact: true,
        path: "/albums/:id",
        component: AlbumView
    },
    {
        exact: true,
        path: "/photos",
        component: PhotosView
    },
    {
        exact: true,
        path: "/photos/:id",
        component: PhotoView
    },
    // {
    //     exact: false,
    //     path: "",
    //     component: Error404View
    // }
]