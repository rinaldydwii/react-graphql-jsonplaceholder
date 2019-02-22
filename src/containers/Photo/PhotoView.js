import React, { Component } from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { View, Loading } from "../../components";

const GET_PHOTO = gql`
    query photo($id: ID!) {
        photo(id: $id) {
            id
            title
            url
            thumbnailUrl
        }
    }
`;

class PhotoView extends Component {
    constructor() {
        super()
        this.state = {
            photoId: null
        }
    }
    componentDidMount() {
        this.setState({photoId: this.props.match.params.id})
    }
    render() {
        const id = this.state.photoId
        return (
            <View containerClassName="view text-center">
                {
                    id ? (
                        <Query query={GET_PHOTO} variables={{id}}>
                            { ({loading, error, data}) => {
                                const photo = data.photo ? data.photo : null
                                return (
                                    <Loading loading={loading} error={error} >
                                        { photo ? (
                                            <React.Fragment>
                                                <div className="photo__image">
                                                    <img src={photo.url} alt={photo.title} />
                                                </div>
                                                <h1>{photo.title}</h1>
                                            </React.Fragment>
                                        ) : ""}
                                        
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

export default PhotoView;