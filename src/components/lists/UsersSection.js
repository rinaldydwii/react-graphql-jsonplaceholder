import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from "../Loading";
import UserItem from "../items/UserItem";
// import ReadMoreButton from "../ReadMoreButton";

const GET_USERS = gql`
    query {
        users {
            id
            name
            username
        }
    }
`;

const UsersSection = () => (
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
                        {/* { paginateToPage ? <ReadMoreButton to="/users" > : "" }
                        { paginate ? <ReadMoreButton onClick={onLoadUsers} /> : ""} */}
                    </Loading>
                )
            }
        </Query>
    </section>
)
export default UsersSection;