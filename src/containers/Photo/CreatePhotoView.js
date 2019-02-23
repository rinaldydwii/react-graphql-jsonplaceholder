import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { View } from "../../components";
import { redirect } from "../../history";
import { getValidationError, isFormValid } from "../../validations";

const CREATE_PHOTO = gql `
    mutation CreatePhoto($photo: PhotoInput!) {
        photo: createPhoto(photo: $photo) {
            id
        }
    }
`

class CreatePhotoView extends Component {
    constructor() {
        super()
        this.state = {
            albumId: null,
            title: null,
            url: null,
            thumbnailUrl: null
        }
        this.handleChangeTitle.bind(this)
        this.handleChangeUrl.bind(this)
        this.handleChangeThumbnailUrl.bind(this)
        this.input = {}
    }
    componentDidMount() {
        this.setState({albumId: this.props.match.params.id})
    }
    handleChangeTitle = (e) => {
        const title = e.target.value
        this.setState({title})
    }
    handleChangeUrl = (e) => {
        const url = e.target.value
        this.setState({url})
    }
    handleChangeThumbnailUrl = (e) => {
        const thumbnailUrl = e.target.value
        this.setState({thumbnailUrl})
    }
    render() {
        const id = this.state.albumId
        return (
            <View smallContainer>
                <section>
                    <div className="section__title">
                        <h2 className="text-center">Create New Photo</h2>
                    </div>
                    <Mutation 
                        mutation={CREATE_PHOTO}
                        onCompleted={({photo}) => {if (typeof photo !== "undefined") redirect(`/photos/${photo.id}`)} }
                    >
                        {
                            (createPhoto) => (
                                <form className="form"
                                     onSubmit={async (e) => {
                                        e.preventDefault()
                                        if (isFormValid(e, this.input))
                                            await createPhoto({
                                                variables: {
                                                    photo: {
                                                        albumId: id,
                                                        title: e.target.title.value,
                                                        url: e.target.url.value,
                                                        thumbnailUrl: e.target.thumbnailUrl.value
                                                    }
                                                }
                                            })
                                    }}
                                >
                                    <div className={`form__row ${getValidationError('title', this.state.title).className}`}>
                                        <label htmlFor="title">Title</label>
                                        <div className="form__group">
                                            <input 
                                                placeholder="Title" 
                                                name="title" 
                                                onChange={this.handleChangeTitle}
                                                onFocus={this.handleChangeTitle}
                                                ref={input => this.input["title"] = input}
                                                type="text" 
                                            />
                                            {getValidationError('title', this.state.title).dom}
                                        </div>
                                    </div>
                                    <div className={`form__row ${getValidationError('url', this.state.url).className}`}>
                                        <label htmlFor="url">Url</label>
                                        <div className="form__group">
                                            <input 
                                                placeholder="Url" 
                                                name="url" 
                                                onChange={this.handleChangeUrl}
                                                onFocus={this.handleChangeUrl}
                                                ref={input => this.input["url"] = input}
                                                type="text" 
                                            />
                                            {getValidationError('url', this.state.url).dom}
                                        </div>
                                    </div>
                                    <div className={`form__row ${getValidationError('thumbnailUrl', this.state.thumbnailUrl).className}`}>
                                        <label htmlFor="thumbnailUrl">Thumbnail Url</label>
                                        <div className="form__group">
                                            <input 
                                                placeholder="Thumbnail Url" 
                                                name="thumbnailUrl" 
                                                onChange={this.handleChangeThumbnailUrl}
                                                onFocus={this.handleChangeThumbnailUrl}
                                                ref={input => this.input["thumbnailUrl"] = input}
                                                type="text" 
                                            />
                                            {getValidationError('thumbnailUrl', this.state.thumbnailUrl).dom}
                                        </div>
                                    </div>
                                    <div className="form__row">
                                        <div className="form__space"></div>
                                        <button className="button button__small">Create Photo</button>
                                    </div>
                                </form>
                            )
                        }
                    </Mutation>
                </section>
            </View>
        );
    }
}

export default CreatePhotoView;