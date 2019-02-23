import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { View } from "../../components";
import { redirect } from "../../history";
import { getValidationError, isFormValid } from "../../validations";

const CREATE_POST = gql `
    mutation CreatePost($post: PostInput!) {
        post: createPost(post: $post) {
            id
        }
    }
`

class CreatePostView extends Component {
    constructor() {
        super()
        this.state = {
            userId: null,
            title: null,
            body: null
        }
        this.handleChangeTitle.bind(this)
        this.handleChangeBody.bind(this)
        this.input = {}
    }
    componentDidMount() {
        this.setState({userId: this.props.match.params.id})
    }
    handleChangeTitle = (e) => {
        const title = e.target.value
        this.setState({title})
    }
    handleChangeBody = (e) => {
        const body = e.target.value
        this.setState({body})
    }
    render() {
        const id = this.state.userId
        return (
            <View smallContainer>
                <section>
                    <div className="section__title">
                        <h2 className="text-center">Create New Post</h2>
                    </div>
                    <Mutation 
                        mutation={CREATE_POST} 
                        onCompleted={({post}) => {if (typeof post !== "undefined") redirect(`/posts/${post.id}`)} }
                    >
                        {
                            (createPost) => (
                                <form className="form"
                                    onSubmit={async (e) => {
                                        e.preventDefault()
                                        if (isFormValid(e, this.input))
                                            await createPost({
                                                variables: {
                                                    post: {
                                                        userId: id,
                                                        title: e.target.title.value,
                                                        body: e.target.body.value
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
                                    <div className={`form__row ${getValidationError('body', this.state.body).className}`}>
                                        <label htmlFor="body">Body</label>
                                        <div className="form__group">
                                            <textarea 
                                                className={getValidationError('body', this.state.body).className}
                                                placeholder="Body" 
                                                name="body" 
                                                ref={input => this.input["body"] = input}
                                                onChange={this.handleChangeBody}
                                                onFocus={this.handleChangeBody}
                                            />
                                            {getValidationError('body', this.state.body).dom}
                                        </div>
                                    </div>
                                    <div className="form__row">
                                        <div className="form__space"></div>
                                        <button className="button button__small">Create Post</button>
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

export default CreatePostView;