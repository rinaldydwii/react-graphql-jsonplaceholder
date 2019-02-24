import React from "react";
import gql from 'graphql-tag';
import { Mutation } from 'react-apollo';
import EditCommentForm from "../comment/EditCommentForm";

const DELETE_COMMENT = gql`
    mutation deleteComment($id: ID!) {
        deleteComment(id: $id) {
            id
        }
    }
`;

class CommentItem extends React.Component {
    constructor() {
        super()
        this.state = {
            edit: false
        }
    }
    handleEdit = () => {
        this.setState({edit: !this.state.edit})
    }
    render() {
        const {comment, updateQuery, index} = this.props
        return (
            <div className="list__item">
                {
                    this.state.edit ? (
                        <EditCommentForm id={comment.id} updateQuery={updateQuery} handleEdit={this.handleEdit} />
                    ) : (
                        <React.Fragment>
                            <div className="header__action">
                                <button className="button button__small button__action-comment"
                                    onClick={this.handleEdit}
                                >Edit</button>
                                <Mutation 
                                    mutation={DELETE_COMMENT}
                                    onCompleted={() => updateQuery(prev => {
                                        prev.comments.splice(index, 1)
                                        return Object.assign({}, prev, {
                                            comments: prev.comments
                                        });
                                    })}
                                > 
                                    { (deleteComment) => (
                                            <button className="button button__small button__action-comment"
                                                onClick={() => {
                                                    const del = window.confirm("Are you sure want to delete this comment?")
                                                    if (del)
                                                        deleteComment({
                                                            variables: {id: comment.id}
                                                        })
                                                }}
                                            >Delete</button>
                                        )
                                    }
                                </Mutation>
                            </div>
                            <div className="list__title">{comment.name}</div>
                            <div className="list__subtitle">{comment.email}</div>
                            <div className="list__content"><p>{comment.body}</p></div>
                        </React.Fragment>
                    )
                }
                
            </div>
        )
    }
}


export default CommentItem;