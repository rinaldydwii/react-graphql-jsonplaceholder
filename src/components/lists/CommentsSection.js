import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CommentItem from "../items/CommentItem";
// import CommentForm from "../CommentForm";
import Loading from "../Loading";
import Container from "../Container";

const GET_COMMENTS = gql`
    query {
        comments {
            id
            name
            body
        }
    }
`;

const CommentsSection = () => (
    <section>
        <h2 className="text-center">Comments</h2>
        <Query query={GET_COMMENTS}>
            { ({loading, error, data: {comments}}) => (
                    <Loading
                        loading={loading}
                        error={error}
                    >
                        <Container small>
                            { comments ? (
                                <div className="list">
                                    { comments.map((comment, index) => (
                                            <CommentItem comment={comment} key={comment.id} index={index} 
                                                // postId={postId} 
                                            />
                                        ))
                                    }
                                </div>
                            ) : <div>Comments not found!</div>}
                            {/* <CommentForm onSubmitComment={onSubmitComment} /> */}
                        </Container>
                    </Loading>
                )
            }
        </Query>
    </section>
)
export default CommentsSection;