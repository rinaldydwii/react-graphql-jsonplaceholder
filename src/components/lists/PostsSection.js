import React from "react";
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

const PostsSection = ({id = null, paginate = {}}) => {
    return (
        <section>
            <h2 className="text-center">Posts</h2>
            <Query query={id ? GET_USER_POSTS : GET_POSTS} variables={id ? {id, limit: LIMIT_POSTS, page: 1} : null}>
                { ({loading, error, data: {posts}, fetchMore}) => (
                        <Loading loading={loading} error={error}>
                            { posts ? (
                                <React.Fragment>
                                    <div className="grid grid-4">
                                        { posts.map(post => (
                                            <PostItem post={post} key={post.id} />
                                        )) }
                                    </div>
                                    { !(posts.length < LIMIT_POSTS) ? 
                                        typeof paginate.to !== "undefined" ?
                                            <ReadMoreButton to={paginate.to} /> :
                                            <ReadMoreButton 
                                                onClick={() => fetchMore({
                                                    variables: {
                                                        page: (posts.length / LIMIT_POSTS) + 1
                                                    },
                                                    updateQuery: (prev, {fetchMoreResult}) => {
                                                        if (!fetchMoreResult) return prev;
                                                        return Object.assign({}, prev, {
                                                            posts: [...prev.posts, ...fetchMoreResult.posts]
                                                        });
                                                    }
                                                })}
                                            />
                                        : ""
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
export default PostsSection;