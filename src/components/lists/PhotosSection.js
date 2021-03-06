import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PhotoItem from "../items/PhotoItem";
import Loading from "../Loading";
import ReadMoreButton from "../ReadMoreButton";

const GET_PHOTOS = gql`
    query photos($limit: Int, $page: Int) {
        photos(limit: $limit, page: $page) {
            id
            title
            thumbnailUrl
        }
    }
`;

const GET_ALBUM_PHOTOS = gql`
    query albumPhotos($id: ID!, $limit: Int, $page: Int) {
        photos: albumPhotos(id: $id, limit: $limit, page: $page) {
            id
            title
            thumbnailUrl
        }
    }
`;

const LIMIT_PHOTOS = 8

class PhotosSection extends React.Component {
    constructor() {
        super()
        this.state = {
            readmore: true
        }
    }
    render() {
        const {id = null, paginate = {}, create = false} = this.props 
        return (
            <section>
                <div className="section__title">
                    <div className="section__button">

                    </div>
                    <h2 className="text-center">Photos</h2>
                    <div className="section__button">
                        { create ? <Link to={`/albums/${id}/photos/create`} className="button button__action">New Photo</Link> : ""}
                    </div>
                </div>
                <Query query={id ? GET_ALBUM_PHOTOS : GET_PHOTOS} variables={id ? {id} : null}>
                    { ({loading, error, data: {photos}, fetchMore}) => (
                            <Loading loading={loading} error={error}>
                                { photos ? (
                                    <React.Fragment>
                                        <div className="grid grid-4">
                                            { photos.map((photo, index) => {
                                                if (typeof paginate.to !== "undefined") {
                                                    if (index < LIMIT_PHOTOS)
                                                        return (
                                                            <PhotoItem photo={photo} key={photo.id} />
                                                        )
                                                    else return null
                                                }
                                                return (
                                                    <PhotoItem photo={photo} key={photo.id} />
                                                )}
                                            ) }
                                        </div>
                                        { typeof paginate.to !== "undefined" ?
                                            <ReadMoreButton to={paginate.to} />
                                            : !(photos.length < LIMIT_PHOTOS) ? 
                                                <ReadMoreButton 
                                                    visible={this.state.readmore}
                                                    onClick={() => fetchMore({
                                                        variables: {
                                                            page: (photos.length / LIMIT_PHOTOS) + 1,
                                                            query: id ? GET_ALBUM_PHOTOS : GET_PHOTOS
                                                        },
                                                        updateQuery: (prev, {fetchMoreResult}) => {
                                                            if (!fetchMoreResult) return prev;
                                                            if (fetchMoreResult.photos.length < LIMIT_PHOTOS) this.setState({readmore: false})
                                                            return Object.assign({}, prev, {
                                                                photos: [...prev.photos, ...fetchMoreResult.photos]
                                                            });
                                                        }
                                                    })} 
                                                /> : ""
                                        }
                                    </React.Fragment>
                                ) : <div>Photos not found!</div>
                                }
                            </Loading>
                        )
                    }
                </Query>
            </section>
        )
    }
}

export default PhotosSection;

PhotosSection.propTypes = {
    id: PropTypes.string,
    paginate: PropTypes.object
}