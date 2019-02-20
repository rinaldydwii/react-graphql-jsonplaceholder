import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
// import { Link } from "react-router-dom"
import PostItem from "../items/PostItem";
import Loading from "../Loading";
import ReadMoreButton from "../ReadMoreButton";

const GET_POSTS = gql`
    query {
        posts {
            id
            title
        }
    }
`;

const PostsSection = ({paginate = false}) => (
    <section>
        <h2 className="text-center">Posts</h2>
        {/* { addButton ? 
            (
                <div className="text-right" style={{marginBottom: 20}}>
                    <Link className="button" to="/posts/add">Add</Link>
                </div>
            ) : ""
        } */}
        <Query query={GET_POSTS}>
            { ({loading, error, data: {posts}}) => (
                    <Loading loading={loading} error={error}>
                        { posts ? (
                            <div className="grid grid-4">
                                { posts.map(post => (
                                    <PostItem post={post} key={post.id} />
                                )) }
                            </div>
                        ) : <div>Empty post!</div>
                        }
                        { paginate ? 
                            typeof paginate.to !== "undefined" ?
                                <ReadMoreButton to={paginate.to} /> :
                                <ReadMoreButton onClick={paginate.onClick} />
                            : ""
                        }
                    </Loading>
                )
            }
        </Query>
    </section>
)
export default PostsSection;