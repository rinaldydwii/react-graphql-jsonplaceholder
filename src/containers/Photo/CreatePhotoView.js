import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { View } from "../../components";
import { redirect } from "../../history"

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
            albumId: null
        }
    }
    componentDidMount() {
        this.setState({albumId: this.props.match.params.id})
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
                                    <div className="form__row">
                                        <label htmlFor="title">Title</label>
                                        <input 
                                            placeholder="Title" 
                                            name="title" 
                                            // value={value ? value.name : ""} 
                                            // onChange={onChange ? onChange.name : null} 
                                            type="text" 
                                        />
                                    </div>
                                    <div className="form__row">
                                        <label htmlFor="url">Url</label>
                                        <input 
                                            placeholder="Url" 
                                            name="url" 
                                            // value={value ? value.name : ""} 
                                            // onChange={onChange ? onChange.name : null} 
                                            type="text" 
                                        />
                                    </div>
                                    <div className="form__row">
                                        <label htmlFor="thumbnailUrl">Thumbnail Url</label>
                                        <input 
                                            placeholder="Thumbnail Url" 
                                            name="thumbnailUrl" 
                                            // value={value ? value.name : ""} 
                                            // onChange={onChange ? onChange.name : null} 
                                            type="text" 
                                        />
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