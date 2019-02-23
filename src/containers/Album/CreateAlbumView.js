import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { View } from "../../components";
import { redirect } from "../../history";
import { getValidationError, isFormValid } from "../../validations";

const CREATE_ALBUM = gql `
    mutation CreateAlbum($album: AlbumInput!) {
        album: createAlbum(album: $album) {
            id
        }
    }
`

class CreateAlbumView extends Component {
    constructor() {
        super()
        this.state = {
            userId: null,
            title: null,
        }
        this.handleChangeTitle.bind(this)
        this.input = {}
    }
    componentDidMount() {
        this.setState({userId: this.props.match.params.id})
    }
    handleChangeTitle = (e) => {
        const title = e.target.value
        this.setState({title})
    }
    render() {
        const id = this.state.userId
        return (
            <View smallContainer>
                <section>
                    <div className="section__title">
                        <h2 className="text-center">Create New Album</h2>
                    </div>
                    <Mutation 
                        mutation={CREATE_ALBUM}
                        onCompleted={({album}) => {if (typeof album !== "undefined") redirect(`/albums/${album.id}`)} }
                    >
                        {
                            (createAlbum) => (
                                <form className="form"
                                    onSubmit={async (e) => {
                                        e.preventDefault()
                                        if (isFormValid(e, this.input))
                                            await createAlbum({
                                                variables: {
                                                    album: {
                                                        userId: id,
                                                        title: e.target.title.value,
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
                                    <div className="form__row">
                                        <div className="form__space"></div>
                                        <button className="button button__small">Create Album</button>
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

export default CreateAlbumView;