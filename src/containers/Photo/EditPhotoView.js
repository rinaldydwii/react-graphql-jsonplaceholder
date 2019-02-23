import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
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

const UPDATE_PHOTO = gql `
    mutation UpdatePhoto($id: ID!, $photo: PhotoInput!) {
        photo: updatePhoto(id: $id, photo: $photo) {
            id
        }
    }
`;

class EditPhotoView extends Component {
    constructor() {
        super()
        this.state = {
            photoId: null,
        }
    }
    componentDidMount() {
        this.setState({photoId: this.props.match.params.id})
    }
    render() {
        const id = this.state.photoId
        return (
            <View smallContainer>
                <section>
                    <div className="section__title">
                        <h2 className="text-center">Edit Photo</h2>
                    </div>
                    <Query query={GET_PHOTO} variables={{id}}>
                        { ({loading, error, data, updateQuery}) => {
                            let photo = data.photo ? data.photo : null
                            return (
                                <Loading loading={loading} error={error} >
                                    { photo ? (
                                        <Mutation 
                                            mutation={UPDATE_PHOTO}
                                            onCompleted={() => redirect(`/photos/${photo.id}`) }
                                        >
                                        { (updatePhoto) => (
                                            <form className="form"
                                                onSubmit={async (e) => {
                                                    e.preventDefault()
                                                    await updatePhoto({
                                                        variables: {
                                                            id: id,
                                                            photo: {
                                                                albumId: photo.id,
                                                                title: e.target.title.value,
                                                                url: e.target.url.value,
                                                                thumbnailUrl: e.target.thumbnailUrl.value
                                                            }
                                                        }
                                                    })
                                                }}
                                            >
                                                <div className="form__row">
                                                    <label htmlFor="title">Title</label>
                                                    <input 
                                                        placeholder="Title" 
                                                        name="title" 
                                                        value={photo.title}
                                                        onChange={(e) => updateQuery((prev) => {
                                                            return Object.assign({}, prev, {
                                                                    photo: {
                                                                        ...prev.photo, 
                                                                        title: e.target.value
                                                                    }
                                                                });
                                                        })}
                                                        type="text" 
                                                    />
                                                </div>
                                                <div className="form__row">
                                                    <label htmlFor="url">Url</label>
                                                    <input 
                                                        placeholder="Url" 
                                                        name="url" 
                                                        value={photo.url}
                                                        onChange={(e) => updateQuery((prev) => {
                                                            return Object.assign({}, prev, {
                                                                    photo: {
                                                                        ...prev.photo, 
                                                                        url: e.target.value
                                                                    }
                                                                });
                                                        })}
                                                        type="text" 
                                                    />
                                                </div>
                                                <div className="form__row">
                                                    <label htmlFor="thumbnailUrl">Thumbnail Url</label>
                                                    <input 
                                                        placeholder="Thumbnail Url" 
                                                        name="thumbnailUrl" 
                                                        value={photo.thumbnailUrl}
                                                        onChange={(e) => updateQuery((prev) => {
                                                            return Object.assign({}, prev, {
                                                                    photo: {
                                                                        ...prev.photo, 
                                                                        thumbnailUrl: e.target.value
                                                                    }
                                                                });
                                                        })}
                                                        type="text" 
                                                    />
                                                </div>
                                                <div className="form__row">
                                                    <div className="form__space"></div>
                                                    <button className="button button__small">Edit Photo</button>
                                                </div>
                                            </form>
                                        )}
                                        </Mutation>
                                    ) : ""
                                    }
                                </Loading>
                            )
                        }
                        }
                    </Query>
                </section>
            </View>
        );
    }
}

export default EditPhotoView;