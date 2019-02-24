import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { View, PhotosSection, Loading } from "../../components";
import { redirect } from "../../history";

const GET_ALBUM = gql`
    query album($id: ID!) {
        album(id: $id) {
            id
            title
        }
    }
`;

const DELETE_ALBUM = gql`
    mutation deleteAlbum($id: ID!) {
        deleteAlbum(id: $id) {
            id
        }
    }
`;

class AlbumView extends Component {
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
        const id = this.state.albumId
        return (
            <View>
                {
                    id ? (
                        <Query query={GET_ALBUM} variables={{id}}>
                            { ({loading, error, data}) => {
                                const album = data.album ? data.album : null
                                return (
                                    <Loading loading={loading} error={error} >
                                        { album ? (
                                                <React.Fragment>
                                                    <header>
                                                        <div className="header__action">
                                                            <Link to={`/albums/${id}/edit`} className="button button__small button__action">Edit</Link>
                                                            <Mutation 
                                                                mutation={DELETE_ALBUM}
                                                                onCompleted={() => redirect(`/albums`)}
                                                            > 
                                                                { (deletePost) => (
                                                                        <button className="button button__small button__action"
                                                                            onClick={() => {
                                                                                const del = window.confirm("Are you sure want to delete this post?")
                                                                                if (del)
                                                                                    deletePost({
                                                                                        variables: {id}
                                                                                    })
                                                                            }}
                                                                        >Delete</button>
                                                                    )
                                                                }
                                                            </Mutation>
                                                        </div>
                                                        <h1 className="text-center">{album.title}</h1>
                                                    </header>
                                                    <PhotosSection id={id} create />
                                                </React.Fragment>
                                            ) : ""
                                        }
                                    </Loading>
                                )
                            } }
                        </Query>
                    ) : ""
                }
            </View>
        );
    }
}

export default AlbumView;