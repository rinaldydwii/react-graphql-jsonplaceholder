import UsersView from "../containers/User/UsersView";
import UserView from "../containers/User/UserView";
import PostsView from "../containers/Post/PostsView";
import PostView from "../containers/Post/PostView";
import AlbumsView from "../containers/Album/AlbumsView";
import AlbumView from "../containers/Album/AlbumView";
import PhotosView from "../containers/Photo/PhotosView";
import PhotoView from "../containers/Photo/PhotoView";
import HomeView from "../containers/HomeView";
import CreatePostView from "../containers/Post/CreatePostView";
import CreateAlbumView from "../containers/Album/CreateAlbumView";
import CreatePhotoView from "../containers/Photo/CreatePhotoView";

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
        path: "/users/:id/posts/create",
        component: CreatePostView
    },
    {
        exact: true,
        path: "/users/:id/albums/create",
        component: CreateAlbumView
    },
    {
        exact: true,
        path: "/posts",
        component: PostsView
    },
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
        path: "/albums/:id/photos/create",
        component: CreatePhotoView
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
]