import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { View, Loading } from "../../components";
import { redirect } from "../../history";

const GET_POST = gql`
    query post($id: ID!) {
        post(id: $id) {
            id
            title
            body
        }
    }
`;

const UPDATE_POST = gql `
    mutation UpdatePost($id: ID!, $post: PostInput!) {
        post: updatePost(id: $id, post: $post) {
            id
        }
    }
`;

class EditPostView extends Component {
    constructor() {
        super()
        this.state = {
            postId: null,
        }
    }
    componentDidMount() {
        this.setState({postId: this.props.match.params.id})
    }
    render() {
        const id = this.state.postId
        return (
            <View smallContainer>
                <section>
                    <div className="section__title">
                        <h2 className="text-center">Edit Post</h2>
                    </div>
                    <Query query={GET_POST} variables={{id}}>
                        { ({loading, error, data, updateQuery}) => {
                            let post = data.post ? data.post : null
                            return (
                                <Loading loading={loading} error={error} >
                                    { post ? (
                                        <Mutation 
                                            mutation={UPDATE_POST}
                                            onCompleted={() => redirect(`/posts/${post.id}`) }
                                        >
                                            { (updatePost) => (
                                                <form className="form"
                                                    onSubmit={async (e) => {
                                                        e.preventDefault()
                                                        await updatePost({
                                                            variables: {
                                                                id: id,
                                                                post: {
                                                                    userId: post.id,
                                                                    title: e.target.title.value,
                                                                    body: e.target.body.value
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
                                                            value={post.title}
                                                            onChange={(e) => updateQuery((prev) => {
                                                                return Object.assign({}, prev, {
                                                                        post: {
                                                                            ...prev.post, 
                                                                            title: e.target.value
                                                                        }
                                                                    });
                                                            })}
                                                            type="text" 
                                                        />
                                                    </div>
                                                    <div className="form__row">
                                                        <label htmlFor="body">Body</label>
                                                        <textarea 
                                                            placeholder="Body" 
                                                            name="body" 
                                                            value={post.body}
                                                            onChange={(e) => updateQuery((prev) => {
                                                                return Object.assign({}, prev, {
                                                                        post: {
                                                                            ...prev.post, 
                                                                            body: e.target.value
                                                                        }
                                                                    });
                                                            })}
                                                        />
                                                    </div>
                                                    <div className="form__row">
                                                        <div className="form__space"></div>
                                                        <button className="button button__small">Edit Post</button>
                                                    </div>
                                                </form>
                                            )}
                                        </Mutation>
                                        ) : "" 
                                    }
                                </Loading>
                            )
                        } }
                    </Query>
                </section>
            </View>
        );
    }
}

export default EditPostView;