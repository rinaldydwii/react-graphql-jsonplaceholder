import React from "react";
import { Link } from "react-router-dom";

const PhotoItem = ({ photo }) => (
    <Link to={`/photos/${photo.id}`}>
        <div className="grid__item">
            <div className="grid__thumbnail">
                <img src={photo.thumbnailUrl} alt={photo.title} />
            </div>
            <div className="grid__title">{photo.title}</div>
        </div>
    </Link>
)
export default PhotoItem;