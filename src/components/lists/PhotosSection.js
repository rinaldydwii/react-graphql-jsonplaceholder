import React from "react";
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
    query albumPhotos($id: ID!) {
        photos: albumPhotos(id: $id) {
            id
            title
            thumbnailUrl
        }
    }
`;

const LIMIT_PHOTOS = 8

const PhotosSection = ({id = null, paginate = {}}) => (
    <section>
        <h2 className="text-center">Photos</h2>
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
                                { !(photos.length < LIMIT_PHOTOS) ? 
                                    typeof paginate.to !== "undefined" ?
                                        <ReadMoreButton to={paginate.to} /> :
                                        <ReadMoreButton 
                                            onClick={() => fetchMore({
                                                variables: {
                                                    page: (photos.length / LIMIT_PHOTOS) + 1
                                                },
                                                updateQuery: (prev, {fetchMoreResult}) => {
                                                    if (!fetchMoreResult) return prev;
                                                    return Object.assign({}, prev, {
                                                        photos: [...prev.photos, ...fetchMoreResult.photos]
                                                    });
                                                }
                                            })} 
                                        />
                                    : ""
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
export default PhotosSection;