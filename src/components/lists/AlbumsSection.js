import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AlbumItem from "../items/AlbumItem";
import Loading from "../Loading";
import ReadMoreButton from "../ReadMoreButton";

const GET_ALBUMS = gql`
    query albums($limit: Int, $page: Int){
        albums(limit: $limit, page: $page) {
            id
            title
        }
    }
`;

const GET_USER_ALBUMS = gql`
    query userAlbums($id: ID!) {
        albums: userAlbums(id: $id) {
            id
            title
        }
    }
`;

const LIMIT_ALBUMS = 20

const AlbumsSection = ({id = null, paginate = {}}) => (
    <section>
        <h2 className="text-center">Albums</h2>
        <Query query={id ? GET_USER_ALBUMS : GET_ALBUMS} variables={id ? {id} : null}>
            { ({loading, error, data: {albums}, fetchMore}) => (
                    <Loading loading={loading} error={error}>
                        { albums ? (
                            <React.Fragment>
                                <div className="grid grid-4">
                                    { albums.map((album, index) => {
                                        if (typeof paginate.to !== "undefined") {
                                            if (index < LIMIT_ALBUMS)
                                                return (
                                                    <AlbumItem album={album} key={album.id} />
                                                )
                                            else return null
                                        }
                                        return(
                                            <AlbumItem album={album} key={album.id} />
                                        )}
                                    ) }
                                </div>
                                { !(albums.length < LIMIT_ALBUMS) ? 
                                    typeof paginate.to !== "undefined" ?
                                        <ReadMoreButton to={paginate.to} /> :
                                        <ReadMoreButton 
                                            onClick={() => fetchMore({
                                                variables: {
                                                    page: (albums.length / LIMIT_ALBUMS) + 1
                                                },
                                                updateQuery: (prev, {fetchMoreResult}) => {
                                                    if (!fetchMoreResult) return prev;
                                                    return Object.assign({}, prev, {
                                                        albums: [...prev.albums, ...fetchMoreResult.albums]
                                                    });
                                                }
                                            })} 
                                        />
                                    : ""
                                }
                            </React.Fragment>
                        ) : <div>Empty album!</div>
                        }
                    </Loading>
                )
            }
        </Query>
    </section>
)
export default AlbumsSection;