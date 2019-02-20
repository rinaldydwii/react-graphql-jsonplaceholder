import React from "react";

const CommentForm = ({onSubmitComment, value = null, title = "Comment", onChange}) => (
    <form className="form text-center" onSubmit={onSubmitComment} >
        <div className="form__row">
            <input 
                placeholder="Name" 
                name="name" 
                value={value ? value.name : ""} 
                onChange={onChange ? onChange.name : null} 
                type="text" 
            />
        </div>
        <div className="form__row">
            <input 
                placeholder="Email" 
                name="email" 
                value={value ? value.email : ""} 
                onChange={onChange ? onChange.email : null} 
                type="email" 
            />
        </div>
        <div className="form__row">
            <textarea 
                placeholder="Type comment here..." 
                name="body"
                value={value ? value.body : ""} 
                onChange={onChange ? onChange.body : null} 
            ></textarea>
        </div>
        <button className="button">{title}</button>
    </form>
)

export default CommentForm