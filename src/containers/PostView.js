import React, { Component } from "react";
// import { connect } from 'react-redux';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Link } from "react-router-dom"
import { View, Container, CommentsSection, Loading } from "../components";
// import { fetchPost, deletePost } from "../actions/postActions";
// import { fetchCommentsById, createComment } from "../actions/commentActions";

const GET_POST = gql`
    query post($id: ID!) {
        post(id: $id) {
            id
            title
            body
        }
    }
`;

class PostView extends Component {
    // createComment = (e) => {
    //     e.preventDefault()
    //     e.persist()
    //     this.props.createComment({
    //         name: e.target.name.value,
    //         email: e.target.email.value,
    //         body: e.target.body.value,
    //         postId: this.props.post.id
    //     })
    //     e.target.reset()
    // }
    // deletePost = () => {
    //     this.props.deletePost(this.props.post.id)
    //     this.props.history.goBack()
    // }
    // componentDidMount() {
    //     const postId = this.props.match.params.id
    //     this.props.getPost(postId)
    //     this.props.getComments(postId)
    // }
    constructor() {
        super()
        this.state = {
            postId: null
        }
    }
    componentDidMount() {
        this.setState({userId: this.props.match.params.id})
    }
    render() {
        // const { post } = this.props
        const id = this.state.userId
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
                                                            <h1 className="text-center">{post.title}</h1>
                                                            {/* <div className="text-center">
                                                                <button className="button button__action" ><Link to={`/posts/${post.id}/edit`}>Edit</Link></button>
                                                                <button className="button button__action" onClick={this.deletePost}>Delete</button>
                                                            </div> */}
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



// const mapStateToProps = state => ({
//     post: state.postReducer.post,
//     loadingPost: state.postReducer.loading,
//     finishPost: state.postReducer.finish,
//     errorPost: state.postReducer.error,
//     comments: state.commentsReducer.comments,
//     loadingComments: state.commentsReducer.loading,
//     finishComments: state.commentsReducer.finish,
//     errorComments: state.commentsReducer.error,
//     finishPosts: state.postsReducer.finish
// })
  
// const mapDispatchToProps = (dispatch) => ({
//     getPost: (id) => dispatch(fetchPost(id)),
//     deletePost: (id) => dispatch(deletePost(id)),
//     getComments: (id) => dispatch(fetchCommentsById(id)),
//     createComment: (data) => dispatch(createComment(data))
// })
export default PostView;