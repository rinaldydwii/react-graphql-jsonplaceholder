import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { View, Loading } from "../../components";
import { redirect } from "../../history";
import { getValidationError, isFormValid } from "../../validations";

const GET_ALBUM = gql`
    query album($id: ID!) {
        album(id: $id) {
            id
            title
        }
    }
`;

const UPDATE_ALBUM = gql `
    mutation UpdateAlbum($id: ID!, $album: AlbumInput!) {
        album: updateAlbum(id: $id, album: $album) {
            id
        }
    }
`;

class EditAlbumView extends Component {
    constructor() {
        super()
        this.state = {
            albumId: null,
        }
        this.handleChangeTitle.bind(this)
        this.input = {}
    }
    componentDidMount() {
        this.setState({albumId: this.props.match.params.id})
    }
    handleChangeTitle = (e, prev) => {
        return Object.assign({}, prev, {
            album: {
                ...prev.album, 
                title: e.target.value
            }
        });
    }
    render() {
        const id = this.state.albumId
        return (
            <View smallContainer>
                <section>
                    <div className="section__title">
                        <h2 className="text-center">Edit Album</h2>
                    </div>
                    <Query query={GET_ALBUM} variables={{id}}>
                        { ({loading, error, data, updateQuery}) => {
                            let album = data.album ? data.album : null
                            return (
                                <Loading loading={loading} error={error} >
                                    { album ? (
                                        <Mutation 
                                            mutation={UPDATE_ALBUM}
                                            onCompleted={() => redirect(`/albums/${album.id}`) }
                                        >
                                            { (updateAlbum) => (
                                                <form className="form"
                                                    onSubmit={async (e) => {
                                                        e.preventDefault()
                                                        if (isFormValid(e, this.input))
                                                            await updateAlbum({
                                                                variables: {
                                                                    id: id,
                                                                    album: {
                                                                        userId: album.id,
                                                                        title: e.target.title.value,
                                                                    }
                                                                }
                                                            })
                                                    }}
                                                >
                                                    <div className={`form__row ${getValidationError('title', album.title).className}`}>
                                                        <label htmlFor="title">Title</label>
                                                        <div className="form__group">
                                                            <input 
                                                                placeholder="Title" 
                                                                name="title" 
                                                                value={album.title} 
                                                                onChange={(e) => updateQuery((prev) => this.handleChangeTitle(e, prev))}
                                                                ref={input => this.input["title"] = input}
                                                                type="text" 
                                                            />
                                                            {getValidationError('body', album.title).dom}
                                                        </div>
                                                    </div>
                                                    <div className="form__row">
                                                        <div className="form__space"></div>
                                                        <button className="button button__small">Edit Album</button>
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

export default EditAlbumView;