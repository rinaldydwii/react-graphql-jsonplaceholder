import React from "react";
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import Loading from "../Loading";
import UserItem from "../items/UserItem";
import ReadMoreButton from "../ReadMoreButton";

const GET_USERS = gql`
    query users($limit: Int, $page: Int) {
        users(limit: $limit, page: $page) {
            id
            name
            username
        }
    }
`;

const LIMIT_USERS = 20

const UsersSection = ({paginate = false}) => (
    <section>
        <h2 className="text-center">Users</h2>
        <Query query={GET_USERS}>
            { ({loading, error, data: {users}, fetchMore}) => {
                return (
                    <Loading loading={loading} error={error}>
                        { users ? (
                            <React.Fragment>
                                <div className="grid grid-4">
                                    { users.map((user, index) => {
                                        if (typeof paginate.to !== "undefined") {
                                            if (index < LIMIT_USERS)
                                                return (
                                                    <UserItem user={user} key={user.id} />
                                                )
                                            else return null
                                        }
                                        return (
                                            <UserItem user={user} key={user.id} />
                                        )}
                                    ) }
                                </div>
                                { paginate && !(users.length < LIMIT_USERS) ? 
                                    typeof paginate.to !== "undefined" ?
                                        <ReadMoreButton to={paginate.to} /> :
                                        <ReadMoreButton 
                                            onClick={async() => await fetchMore({
                                                variables: {
                                                    page: (users.length / LIMIT_USERS) + 1
                                                },
                                                updateQuery: (prev, {fetchMoreResult}) => {
                                                    if (!fetchMoreResult) return prev;
                                                    return Object.assign({}, prev, {
                                                        users: [...prev.users, ...fetchMoreResult.users]
                                                    });
                                                }
                                            })} 
                                        />
                                    : ""
                                }
                            </React.Fragment>
                        ) : <div>Empty user!</div>
                        }
                    </Loading>
                )}
            }
        </Query>
    </section>
)
export default UsersSection;