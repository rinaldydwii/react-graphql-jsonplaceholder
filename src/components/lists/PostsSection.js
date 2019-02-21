import React from "react";
import PropTypes from "prop-types";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import PostItem from "../items/PostItem";
import Loading from "../Loading";
import ReadMoreButton from "../ReadMoreButton";

const GET_POSTS = gql`
    query posts($limit: Int, $page: Int) {
        posts(limit: $limit, page: $page) {
            id
            title
        }
    }
`;

const GET_USER_POSTS = gql`
    query userPosts($id: ID!, $limit: Int, $page: Int) {
        posts: userPosts(id: $id, limit: $limit, page: $page) {
            id
            title
        }
    }
`;

const LIMIT_POSTS = 20

class PostsSection extends React.Component {
    constructor() {
        super()
        this.state = {
            readmore: true
        }
    }
    render() {
        const {id = null, paginate = {}} = this.props 
        return (
            <section>
                <h2 className="text-center">Posts</h2>
                <Query query={id ? GET_USER_POSTS : GET_POSTS} variables={id ? {id, limit: LIMIT_POSTS, page: 1} : null}>
                    { ({loading, error, data: {posts}, fetchMore}) => (
                            <Loading loading={loading} error={error}>
                                { posts ? (
                                    <React.Fragment>
                                        <div className="grid grid-4">
                                            { posts.map((post, index) => {
                                                if (typeof paginate.to !== "undefined") {
                                                    if (index < LIMIT_POSTS)
                                                        return (
                                                            <PostItem post={post} key={post.id} />
                                                        )
                                                    else return null
                                                }
                                                return (
                                                    <PostItem post={post} key={post.id} />
                                                )}
                                            ) }
                                        </div>
                                        { typeof paginate.to !== "undefined" ?
                                            <ReadMoreButton to={paginate.to} /> 
                                            : !(posts.length < LIMIT_POSTS) ? 
                                                <ReadMoreButton 
                                                    visible={this.state.readmore}
                                                    onClick={() => fetchMore({
                                                        variables: {
                                                            page: (posts.length / LIMIT_POSTS) + 1
                                                        },
                                                        updateQuery: (prev, {fetchMoreResult}) => {
                                                            if (!fetchMoreResult) return prev;
                                                            if (fetchMoreResult.posts.length < LIMIT_POSTS) this.setState({readmore: false})
                                                            return Object.assign({}, prev, {
                                                                posts: [...prev.posts, ...fetchMoreResult.posts]
                                                            });
                                                        }
                                                    })}
                                                /> : ""
                                        }
                                    </React.Fragment>
                                ) : <div>Empty post!</div>
                                }
                            </Loading>
                        )
                    }
                </Query>
            </section>
        )
    }
}

export default PostsSection;

PostsSection.propTypes = {
    id: PropTypes.number,
    paginate: PropTypes.object
}