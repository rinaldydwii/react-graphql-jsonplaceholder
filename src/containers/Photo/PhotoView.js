import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { View, Loading } from "../../components";
import { redirect } from "../../history";

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

const DELETE_PHOTO = gql`
    mutation deletePhoto($id: ID!) {
        deletePhoto(id: $id) {
            id
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
                                                <div className="header__action">
                                                    <Link to={`/photos/${id}/edit`} className="button button__small button__action">Edit</Link>
                                                    <Mutation 
                                                        mutation={DELETE_PHOTO}
                                                        onCompleted={() => redirect(`/photos`)}
                                                    > 
                                                        { (deletePhoto) => (
                                                                <button className="button button__small button__action"
                                                                    onClick={() => {
                                                                        const del = window.confirm("Are you sure want to delete this post?")
                                                                        if (del)
                                                                            deletePhoto({
                                                                                variables: {id}
                                                                            })
                                                                    }}
                                                                >Delete</button>
                                                            )
                                                        }
                                                    </Mutation>
                                                </div>
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