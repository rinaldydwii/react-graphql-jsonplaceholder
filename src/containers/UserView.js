import React, { Component } from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { View, ProfileSection, PostsSection, AlbumsSection, Loading } from "../components";

const GET_USER = gql`
    query user($id: ID!) {
        user(id: $id) {
            id
            name
            username
            email
            website
            phone
            address {
                street
                suite
                city
                zipcode
            }
            company {
                name
            }
        }
    }
`;

class UserView extends Component {
    constructor() {
        super()
        this.state = {
            userId: null
        }
    }
    componentDidMount() {
        this.setState({userId: this.props.match.params.id})
    }
    render() {
        const id = this.state.userId
        return (
            <View>
                <div className="profile">
                    {
                        id ? (
                            <Query query={GET_USER} variables={{id}}>
                                { ({loading, error, data}) => {
                                    const user = data.user ? data.user : null
                                    return (
                                        <Loading loading={loading} error={error}>
                                            { user ? (
                                                    <React.Fragment>
                                                        <header>
                                                            <h1 className="text-center">{user.name}</h1>
                                                            <div className="profile__information text-center">
                                                                <p>{user.username}</p>
                                                                <p>{user.email}</p>
                                                            </div>
                                                        </header>
                                                        <ProfileSection user={user} />
                                                        <PostsSection id={id} create />
                                                        <AlbumsSection id={id} create />
                                                    </React.Fragment>
                                                )
                                                : <p>User not found!</p>
                                            }
                                        </Loading>
                                    ) 
                                }}
                            </Query>
                        ) : ""
                    }
                </div>
            </View>
        );
    }
}

export default UserView;