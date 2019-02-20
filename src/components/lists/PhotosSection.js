import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PhotoItem from "../items/PhotoItem";
import Loading from "../Loading";
// import ReadMoreButton from "../ReadMoreButton";

const GET_PHOTOS = gql`
    query {
        photos {
            id
            title
            thumbnailUrl
        }
    }
`;

const PhotosSection = () => (
    <section>
        <h2 className="text-center">Photos</h2>
        <Query query={GET_PHOTOS}>
            { ({loading, error, data: {photos}}) => (
                <Loading loading={loading} error={error}>
                    { photos ? (
                        <div className="grid grid-4">
                            { photos.map(photo => (
                                <PhotoItem photo={photo} key={photo.id} />
                            )) }
                        </div>
                    ) : <div>Photos not found!</div>
                    }
                    {/* { paginateToPage ? <ReadMoreButton to="/photos" /> : "" }
                    { paginate ? <ReadMoreButton onClick={onLoadPhotos} /> : ""} */}
                </Loading>
                )
            }
        </Query>
    </section>
)
export default PhotosSection;