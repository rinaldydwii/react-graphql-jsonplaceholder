import React from "react";
import { Link } from "react-router-dom"

const AlbumItem = ({album}) => (
    <Link to={`/albums/${album.id}`}>
        <div className="grid__item">
            <div className="grid__title">{album.title}</div>
        </div>
    </Link>
)
export default AlbumItem;