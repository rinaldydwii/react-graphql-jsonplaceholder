import React from "react";

const CommentItem = ({comment}) => {
    return (
        <div className="list__item">
            <div className="list__title">{comment.name}</div>
            <div className="list__subtitle">{comment.email}</div>
            <div className="list__content"><p>{comment.body}</p></div>
        </div>
    )
}

export default CommentItem;