import React, { Component } from "react";
// import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Container, PhotosSection, Loading } from "../components";
// import { fetchAlbum } from "../actions/albumActions";
// import { fetchPhotosByAlbumId } from "../actions/photoActions";

const GET_ALBUM = gql`
    query album($id: ID!) {
        album(id: $id) {
            id
            title
        }
    }
`;

class AlbumView extends Component {
    // componentDidMount() {
    //     const albumId = this.props.match.params.id
    //     this.props.getAlbum(albumId)
    //     this.props.getPhotos(albumId)
    // }
    constructor() {
        super()
        this.state = {
            albumId: null
        }
    }
    componentDidMount() {
        this.setState({albumId: this.props.match.params.id})
    }
    render() {
        // const { album } = this.props
        const id = this.state.albumId
        return (
            <Container className="view">
                {
                    id ? (
                        <Query query={GET_ALBUM} variables={{id}}>
                            { ({loading, error, data}) => {
                                const album = data.album ? data.album : null
                                return (
                                    <Loading loading={loading} error={error} >
                                        { album ? (
                                                <h1 className="text-center">{album.title}</h1>
                                            ) : ""
                                        }
                                    </Loading>
                                )
                            } }
                        </Query>
                    ) : ""
                }
            </Container>
        );
    }
}

 {/* <PhotosSection
                                                    photos={this.props.photos} 
                                                    loading={this.props.loadingPhotos}
                                                    finish={this.props.finishPhotos}
                                                    error={this.props.errorPhotos}
                                                /> */}

// const mapStateToProps = state => ({
//     album: state.albumReducer.album,
//     loadingAlbum: state.albumReducer.loading,
//     finishAlbum: state.albumReducer.finish,
//     errorAlbum: state.albumReducer.error,
//     photos: state.photosReducer.photos,
//     loadingPhotos: state.photosReducer.loading,
//     finishPhotos: state.photosReducer.finish,
//     errorPhotos: state.photosReducer.error,
// })
  
// const mapDispatchToProps = (dispatch) => ({
//     getAlbum: (id) => dispatch(fetchAlbum(id)),
//     getPhotos: (id) => dispatch(fetchPhotosByAlbumId(id)),
// })
export default AlbumView;