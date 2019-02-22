import React, { Component } from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { View, Container, CommentsSection, Loading } from "../../components";

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

export default PostView;