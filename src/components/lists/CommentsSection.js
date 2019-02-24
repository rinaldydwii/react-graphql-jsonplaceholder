import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import CommentItem from "../items/CommentItem";
import CommentForm from "../comment/CommentForm";
import Loading from "../Loading";
import Container from "../Container";
import ReadMoreButton from "../ReadMoreButton";

const GET_POST_COMMENTS = gql`
    query postComments($id: ID!, $limit: Int, $page: Int) {
        comments: postComments(id: $id, limit: $limit, page: $page) {
            id
            name
            email
            body
        }
    }
`;

const LIMIT_COMMENTS = 5

class CommentsSection extends React.Component {
    constructor() {
        super()
        this.state = {
            readmore: true
        }
    }
    render() {
        const { id } = this.props
        return (
            <section>
                <div className="section__title">
                    <h2 className="text-center">Comments</h2>
                </div>
                <Query query={GET_POST_COMMENTS} variables={{id, limit: LIMIT_COMMENTS}}>
                    { ({loading, error, data: {comments}, updateQuery, fetchMore}) => {
                        return (
                            <Loading loading={loading} error={error} >
                                <Container small>
                                    { comments ? (
                                        <div className="list">
                                            { !(comments.length < LIMIT_COMMENTS) ? (
                                                <div className="text-center">
                                                    <ReadMoreButton
                                                        comment
                                                        visible={this.state.readmore}
                                                        onClick={() => fetchMore({
                                                            variables: {
                                                                page: (comments.length / LIMIT_COMMENTS) + 1,
                                                            },
                                                            updateQuery: (prev, {fetchMoreResult}) => {
                                                                if (!fetchMoreResult) return prev;
                                                                if (fetchMoreResult.comments.length < LIMIT_COMMENTS) this.setState({readmore: false})
                                                                return Object.assign({}, prev, {
                                                                    comments: [...fetchMoreResult.comments, ...prev.comments].reverse()
                                                                });
                                                            }
                                                        })}
                                                    />
                                                </div>
                                            ) : ""
                                            }
                                            
                                            { comments.reverse().map((comment, index) => (
                                                    <CommentItem comment={comment} key={comment.id} updateQuery={updateQuery} index={index} />
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
    }
}
export default CommentsSection;