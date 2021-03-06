import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom"
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
    query userAlbums($id: ID!, $limit: Int, $page: Int) {
        albums: userAlbums(id: $id, limit: $limit, page: $page) {
            id
            title
        }
    }
`;

const LIMIT_ALBUMS = 20

class AlbumsSection extends React.Component {
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
                    <h2 className="text-center">Albums</h2>
                    <div className="section__button">
                        { create ? <Link to={`/users/${id}/albums/create`} className="button button__action">New Album</Link> : ""}
                    </div>
                </div>
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
                                        { typeof paginate.to !== "undefined" ?
                                            <ReadMoreButton to={paginate.to} /> :
                                            !(albums.length < LIMIT_ALBUMS) ? 
                                                <ReadMoreButton 
                                                    visible={this.state.readmore}
                                                    onClick={() => fetchMore({
                                                        variables: {
                                                            page: (albums.length / LIMIT_ALBUMS) + 1,
                                                            query: id ? GET_USER_ALBUMS : GET_ALBUMS
                                                        },
                                                        updateQuery: (prev, {fetchMoreResult}) => {
                                                            if (!fetchMoreResult) return prev;
                                                            if (fetchMoreResult.albums.length < LIMIT_ALBUMS) this.setState({readmore: false})
                                                            return Object.assign({}, prev, {
                                                                albums: [...prev.albums, ...fetchMoreResult.albums]
                                                            });
                                                        }
                                                    })} 
                                                /> : ""
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
    }
}

export default AlbumsSection;

AlbumsSection.propTypes = {
    id: PropTypes.string,
    paginate: PropTypes.object
}