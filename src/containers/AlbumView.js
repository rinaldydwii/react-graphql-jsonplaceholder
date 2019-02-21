import React, { Component } from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { View, PhotosSection, Loading } from "../components";

const GET_ALBUM = gql`
    query album($id: ID!) {
        album(id: $id) {
            id
            title
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
            <View containerClassName="view">
                {
                    id ? (
                        <Query query={GET_ALBUM} variables={{id}}>
                            { ({loading, error, data}) => {
                                const album = data.album ? data.album : null
                                return (
                                    <Loading loading={loading} error={error} >
                                        { album ? (
                                                <React.Fragment>
                                                    <h1 className="text-center">{album.title}</h1>
                                                    <PhotosSection id={id} paginate={{to: "/photos"}} />
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