import React from "react";
import gql from "graphql-tag";
import { Mutation } from "react-apollo";
import { getValidationError, isFormValid } from "../validations";
import Loading from "./Loading";

const CREATE_COMMENT = gql `
    mutation createComment($comment: CommentInput!) {
        comment: createComment(comment: $comment) {
            id
            name
            email
            body
        }
    }
`

class CommentForm extends React.Component {
    constructor() {
        super()
        this.state = {
            postId: null,
            name: null,
            email: null,
            body: null
        }
        this.handleChangeName.bind(this)
        this.handleChangeEmail.bind(this)
        this.handleChangeBody.bind(this)
        this.input = {}
    }
    componentDidMount() {
        this.setState({postId: this.props.id})
    }
    handleChangeName = (e) => {
        const name = e.target.value
        this.setState({name})
    }
    handleChangeEmail = (e) => {
        const email = e.target.value
        this.setState({email})
    }
    handleChangeBody = (e) => {
        const body = e.target.value
        this.setState({body})
    }
    render() {
        const id = this.state.postId
        return (
            <Mutation 
                mutation={CREATE_COMMENT}
                onCompleted={({comment}) => this.props.updateQuery((prev) => {
                    return Object.assign({}, prev, {
                        comments: [comment, ...prev.comments]
                    });
                })}
            >
                { (createComment, {loading, error}) => (
                    <Loading loading={loading} error={error}>
                        <form className="form form__comment text-center"
                            onSubmit={async (e) => {
                                e.preventDefault()
                                if (isFormValid(e, this.input))
                                    await createComment({
                                        variables: {
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
                            <div className={`form__row ${getValidationError('name', this.state.name).className}`}>
                                <div className="form__group">
                                    <input 
                                        placeholder="Name" 
                                        name="name" 
                                        onChange={this.handleChangeName}
                                        onFocus={this.handleChangeName}
                                        ref={input => this.input["name"] = input}
                                        type="text" 
                                    />
                                    {getValidationError('name', this.state.name).dom}
                                </div>
                            </div>
                            <div className={`form__row ${getValidationError('email', this.state.email).className}`}>
                                <div className="form__group">
                                    <input 
                                        placeholder="Email" 
                                        name="email" 
                                        onChange={this.handleChangeEmail}
                                        onFocus={this.handleChangeEmail}
                                        ref={input => this.input["email"] = input}
                                        type="email" 
                                    />
                                    {getValidationError('email', this.state.email).dom}
                                </div>
                            </div>
                            <div className={`form__row ${getValidationError('body', this.state.body).className}`}>
                                <div className="form__group">
                                    <textarea 
                                        placeholder="Type comment here..." 
                                        name="body"
                                        onChange={this.handleChangeBody}
                                        onFocus={this.handleChangeBody}
                                        ref={input => this.input["body"] = input}
                                    ></textarea>
                                    {getValidationError('body', this.state.body).dom}
                                </div>
                            </div>
                            <button className="button button__small">Send Comment</button>
                        </form>
                    </Loading>
                ) }
            </Mutation>
        )
    }
} 

export default CommentForm