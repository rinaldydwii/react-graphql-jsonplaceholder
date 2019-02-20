import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import AlbumItem from "../items/AlbumItem";
import Loading from "../Loading";
import ReadMoreButton from "../ReadMoreButton";

const GET_ALBUMS = gql`
    query {
        albums {
            id
            title
        }
    }
`;

const AlbumsSection = ({paginate = false}) => (
    <section>
        <h2 className="text-center">Albums</h2>
        <Query query={GET_ALBUMS}>
            { ({loading, error, data: {albums}}) => (
                    <Loading loading={loading} error={error}>
                        { albums ? (
                            <div className="grid grid-4">
                                { albums.map(album => (
                                    <AlbumItem album={album} key={album.id} />
                                )) }
                            </div>
                        ) : <div>Empty album!</div>
                        }
                        { paginate ? 
                            typeof paginate.to !== "undefined" ?
                                <ReadMoreButton to={paginate.to} /> :
                                <ReadMoreButton onClick={paginate.onClick} />
                            : ""
                        }
                    </Loading>
                )
            }
        </Query>
    </section>
)
export default AlbumsSection;