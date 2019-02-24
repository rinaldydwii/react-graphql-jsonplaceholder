import React from "react";
import gql from "graphql-tag";
import { Mutation, Query } from "react-apollo";
import { getValidationError, isFormValid } from "../../validations";
import Loading from "../Loading";

const GET_COMMENT = gql`
    query comment($id: ID!) {
        comment(id: $id) {
            postId
            id
            name
            email
            body
        }
    }
`;


const UPDATE_COMMENT = gql `
    mutation updateComment($id: ID!, $comment: CommentInput!) {
        comment: updateComment(id: $id, comment: $comment) {
            postId
            id
            name
            email
            body
        }
    }
`;

class EditCommentForm extends React.Component {
    constructor() {
        super()
        this.handleChangeName.bind(this)
        this.handleChangeEmail.bind(this)
        this.handleChangeBody.bind(this)
        this.input = {}
    }
    handleChangeName = (e, prev) => {
        return Object.assign({}, prev, {
            comment: {
                ...prev.comment, 
                name: e.target.value
            }
        });
    }
    handleChangeEmail = (e, prev) => {
        return Object.assign({}, prev, {
            comment: {
                ...prev.comment, 
                email: e.target.value
            }
        });
    }
    handleChangeBody = (e, prev) => {
        return Object.assign({}, prev, {
            comment: {
                ...prev.comment, 
                body: e.target.value
            }
        });
    }
    render() {
        const id = this.props.id
        return (
            <Query query={GET_COMMENT} variables={{id}}>
                { ({loading, error, data: {comment}, updateQuery}) => (
                        <Loading loading={loading} error={error} >
                            <Mutation 
                                mutation={UPDATE_COMMENT}
                                onCompleted={({comment}) => {
                                    this.props.updateQuery((prev) => {
                                        prev.comments.map(prevComment => {
                                            if (comment.id === prevComment.id)
                                                return comment
                                            return prevComment
                                        })
                                        return Object.assign({}, prev, {
                                            comments: prev.comments
                                        });
                                    })
                                    this.props.handleEdit()
                                } }
                            >
                                { (updateComment, {loading: loadingMutation, error: errorMutation}) => (
                                    <Loading loading={loadingMutation} error={errorMutation}>
                                        <form className="form form__edit-comment text-center"
                                            onSubmit={async (e) => {
                                                e.preventDefault()
                                                if (isFormValid(e, this.input))
                                                    await updateComment({
                                                        variables: {
                                                            id,
                                                            comment: {
                                                                postId: id,
                                                                name: e.target.name.value,
                                                                email: e.target.email.value,
                                                                body: e.target.body.value
                                                            }
                                                        }
                                                    })
                                            }}
                                        >
                                            <div className={`form__row ${getValidationError('name', comment.name).className}`}>
                                                <div className="form__group">
                                                    <input 
                                                        placeholder="Name" 
                                                        name="name" 
                                                        value={comment.name}
                                                        onChange={(e) => updateQuery((prev) => this.handleChangeName(e, prev))}
                                                        ref={input => this.input["name"] = input}
                                                        type="text" 
                                                    />
                                                    {getValidationError('name', comment.name).dom}
                                                </div>
                                            </div>
                                            <div className={`form__row ${getValidationError('email', comment.email).className}`}>
                                                <div className="form__group">
                                                    <input 
                                                        placeholder="Email" 
                                                        name="email" 
                                                        value={comment.email}
                                                        onChange={(e) => updateQuery((prev) => this.handleChangeEmail(e, prev))}
                                                        ref={input => this.input["email"] = input}
                                                        type="email" 
                                                    />
                                                    {getValidationError('email', comment.email).dom}
                                                </div>
                                            </div>
                                            <div className={`form__row ${getValidationError('body', comment.body).className}`}>
                                                <div className="form__group">
                                                    <textarea 
                                                        placeholder="Type comment here..." 
                                                        name="body"
                                                        value={comment.body}
                                                        onChange={(e) => updateQuery((prev) => this.handleChangeBody(e, prev))}
                                                        ref={input => this.input["body"] = input}
                                                    ></textarea>
                                                    {getValidationError('body', comment.body).dom}
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <button className="button button__small">Edit Comment</button>
                                            </div>
                                        </form>
                                    </Loading>
                                ) }
                            </Mutation>
                        </Loading>
                    )
                }
            </Query>
        )
    }
} 

export default EditCommentForm;