import React, { Component } from "react";
import { Link } from "react-router-dom";
import gql from 'graphql-tag';
import { Query, Mutation } from 'react-apollo';
import { View, Container, CommentsSection, Loading } from "../../components";
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

const DELETE_POST = gql`
    mutation deletePost($id: ID!) {
        deletePost(id: $id) {
            id
        }
    }
`;

class PostView extends Component {
    constructor() {
        super()
        this.state = {
            postId: null
        }
    }
    componentDidMount() {
        this.setState({postId: this.props.match.params.id})
    }
    render() {
        const id = this.state.postId
        return (
            <View containerClassName="view">
                {
                    id ? (
                        <Query query={GET_POST} variables={{id}}>
                            { ({loading, error, data}) => {
                                    const post = data.post ? data.post : null
                                    return (
                                        <Loading loading={loading} error={error} >
                                            { post ? (
                                                    <div className="post">
                                                        <header>
                                                            <div className="header__action">
                                                                <Link to={`/posts/${id}/edit`} className="button button__small button__action">Edit</Link>
                                                                <Mutation 
                                                                    mutation={DELETE_POST}
                                                                    onCompleted={() => redirect(`/posts`)}
                                                                > 
                                                                    { (deletePost) => (
                                                                            <button className="button button__small button__action"
                                                                                onClick={() => {
                                                                                    const del = window.confirm("Are you sure want to delete this post?")
                                                                                    if (del)
                                                                                        deletePost({
                                                                                            variables: {id}
                                                                                        })
                                                                                }}
                                                                            >Delete</button>
                                                                        )
                                                                    }
                                                                </Mutation>
                                                            </div>
                                                            <h1 className="text-center">{post.title}</h1>
                                                        </header>
                                                        <article>
                                                            <Container small>
                                                                <p>{post.body}</p>
                                                            </Container>
                                                        </article>
                                                        <CommentsSection id={id} />
                                                    </div>
                                                ) : ""
                                            }
                                           
                                        </Loading>
                                    )
                                }
                            }
                        </Query>
                    ) : ""
                }
            </View>
        );
    }
}

export default PostView;