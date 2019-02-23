import React, { Component } from "react";
import gql from "graphql-tag";
import { Query, Mutation } from "react-apollo";
import { View, Loading } from "../../components";
import { redirect } from "../../history";
import { getValidationError, isFormValid } from "../../validations";

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
        this.handleChangeTitle.bind(this)
        this.handleChangeBody.bind(this)
        this.input = {}
    }
    componentDidMount() {
        this.setState({postId: this.props.match.params.id})
    }
    handleChangeTitle = (e, prev) => {
        return Object.assign({}, prev, {
            post: {
                ...prev.post, 
                title: e.target.value
            }
        });
    }
    handleChangeBody = (e, prev) => {
        return Object.assign({}, prev, {
            post: {
                ...prev.post, 
                body: e.target.value
            }
        });
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
                                                        if (isFormValid(e, this.input))
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
                                                    <div className={`form__row ${getValidationError('title', post.title).className}`}>
                                                        <label htmlFor="title">Title</label>
                                                        <div className="form__group">
                                                            <input 
                                                                placeholder="Title" 
                                                                name="title"
                                                                value={post.title}
                                                                onChange={(e) => updateQuery((prev) => this.handleChangeTitle(e, prev))}
                                                                ref={input => this.input["title"] = input}
                                                                type="text" 
                                                            />
                                                            {getValidationError('title', post.title).dom}
                                                        </div>
                                                    </div>
                                                    <div className={`form__row ${getValidationError('body', post.body).className}`}>
                                                        <label htmlFor="body">Body</label>
                                                        <div className="form__group">
                                                            <textarea 
                                                                placeholder="Body" 
                                                                name="body" 
                                                                value={post.body}
                                                                onChange={(e) => updateQuery((prev) => this.handleChangeBody(e, prev))}
                                                                ref={input => this.input["body"] = input}
                                                            />
                                                            {getValidationError('body', post.body).dom}
                                                        </div>
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