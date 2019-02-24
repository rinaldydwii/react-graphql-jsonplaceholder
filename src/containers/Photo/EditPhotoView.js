import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { View, Loading } from "../../components";
import { redirect } from "../../history";
import { getValidationError, isFormValid } from "../../validations";

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
        this.handleChangeTitle.bind(this)
        this.handleChangeUrl.bind(this)
        this.handleChangeThumbnailUrl.bind(this)
        this.input = {}
    }
    handleChangeTitle = (e, prev) => {
        return Object.assign({}, prev, {
            photo: {
                ...prev.photo, 
                title: e.target.value
            }
        });
    }
    handleChangeUrl = (e, prev) => {
        return Object.assign({}, prev, {
            photo: {
                ...prev.photo, 
                url: e.target.value
            }
        });
    }
    handleChangeThumbnailUrl = (e, prev) => {
        return Object.assign({}, prev, {
            photo: {
                ...prev.photo, 
                thumbnailUrl: e.target.value
            }
        });
    }
    render() {
        const id = this.props.match.params.id
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
                                                    if (isFormValid(e, this.input))
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
                                                <div className={`form__row ${getValidationError('title', photo.title).className}`}>
                                                    <label htmlFor="title">Title</label>
                                                    <div className="form__group">
                                                        <input 
                                                            placeholder="Title" 
                                                            name="title" 
                                                            value={photo.title}
                                                            onChange={(e) => updateQuery((prev) => this.handleChangeTitle(e, prev))}
                                                            type="text" 
                                                            ref={input => this.input["title"] = input}
                                                        />
                                                        {getValidationError('title', photo.title).dom}
                                                    </div>
                                                </div>
                                                <div className={`form__row ${getValidationError('url', photo.url).className}`}>
                                                    <label htmlFor="url">Url</label>
                                                    <div className="form__group">
                                                        <input 
                                                            placeholder="Url" 
                                                            name="url" 
                                                            value={photo.url}
                                                            onChange={(e) => updateQuery((prev) => this.handleChangeUrl(e, prev))}
                                                            type="text" 
                                                            ref={input => this.input["url"] = input}
                                                        />
                                                        {getValidationError('url', photo.url).dom}
                                                    </div>
                                                </div>
                                                <div className={`form__row ${getValidationError('thumbnailUrl', photo.thumbnailUrl).className}`}>
                                                    <label htmlFor="thumbnailUrl">Thumbnail Url</label>
                                                    <div className="form__group">
                                                        <input 
                                                            placeholder="Thumbnail Url" 
                                                            name="thumbnailUrl" 
                                                            value={photo.thumbnailUrl}
                                                            onChange={(e) => updateQuery((prev) => this.handleChangeThumbnailUrl(e, prev))}
                                                            type="text" 
                                                            ref={input => this.input["thumbnailUrl"] = input}
                                                        />
                                                        {getValidationError('thumbnailUrl', photo.thumbnailUrl).dom}
                                                    </div>
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