import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from "../Loading";
import UserItem from "../items/UserItem";
import ReadMoreButton from "../ReadMoreButton";

const GET_USERS = gql`
    query {
        users {
            id
            name
            username
        }
    }
`;

const UsersSection = ({paginate = false}) => (
    <section>
        <h2 className="text-center">Users</h2>
        <Query query={GET_USERS}>
            { ({loading, error, data: {users}}) => (
                    <Loading loading={loading} error={error}>
                        { users ? (
                            <div className="grid grid-4">
                                { users.map(user => (
                                        <UserItem user={user} key={user.id} />
                                    )) 
                                }
                            </div>
                        ) : <div>Empty user!</div>
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
export default UsersSection;