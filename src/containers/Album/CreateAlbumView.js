import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { View } from "../../components";
import { redirect } from "../../history"

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
            userId: null
        }
    }
    componentDidMount() {
        this.setState({userId: this.props.match.params.id})
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