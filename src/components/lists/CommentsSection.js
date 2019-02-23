import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CommentItem from "../items/CommentItem";
import CommentForm from "../CommentForm";
import Loading from "../Loading";
import Container from "../Container";

const GET_POST_COMMENTS = gql`
    query postComments($id: ID!) {
        comments: postComments(id: $id) {
            id
            name
            body
        }
    }
`;

const CommentsSection = ({id}) => (
    <section>
        <h2 className="text-center">Comments</h2>
        <Query query={GET_POST_COMMENTS} variables={{id}}>
            { ({loading, error, data: {comments}, updateQuery}) => {
                return (
                    <Loading loading={loading} error={error} >
                        <Container small>
                            { comments ? (
                                <div className="list">
                                    { comments.reverse().map(comment => (
                                            <CommentItem comment={comment} key={comment.id} />
                                        ))
                                    }
                                </div>
                            ) : <div>Comments is empty!</div>}
                            <CommentForm id={id} updateQuery={updateQuery} />
                        </Container>
                    </Loading>
                )}
            }
        </Query>
    </section>
)
export default CommentsSection;