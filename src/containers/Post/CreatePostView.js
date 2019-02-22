import React, { Component } from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { View } from "../../components";
import { redirect } from "../../history"

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
                                        <label htmlFor="body">Body</label>
                                        <textarea 
                                            placeholder="Body" 
                                            name="body" 
                                            // value={value ? value.name : ""} 
                                            // onChange={onChange ? onChange.name : null} 
                                        />
                                        
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