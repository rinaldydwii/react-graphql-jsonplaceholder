import React from "react";
import { Link } from "react-router-dom"

const UserItem = ({user}) => (
    <Link to={`/users/${user.id}`}>
        <div className="grid__item">
            <div className="grid__title">{user.name}</div>
            <div className="grid__subtitle">{user.username}</div>
        </div>
    </Link>
)
export default UserItem;