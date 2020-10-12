import React from "react";
import likeIcon from '../../../assets/icons/like.svg'
import Like_disabled from '../../../assets/icons/like_disabled.svg'
import {Link} from "react-router-dom";

import classes from "./Post.module.css"

const Post = (props) => {
    const regDate = new Date(props.date);
    const regDateString = ('0' + regDate.getDate()).slice(-2) + '.' + ('0' + (regDate.getMonth() + 1)).slice(-2) + '.' + regDate.getFullYear();

    return (
        <li className={classes.Post}>
            <div className={classes.Head}>
                <a href={props.user.link} className={classes.User}>
                    <span className={classes.Image}><img src={props.user.photo} alt=""/></span>
                    {props.user.name}
                </a>
                <div className={classes.Date}>{regDateString}</div>
            </div>
            <Link to={'/photo/' + props.id}>
                <div className={classes.Body}><img src={props.image} alt=""/></div>
            </Link>
            <div className={classes.Footer}>
                <div
                    className={classes.Like}
                    onClick={props.writelike}
                >
                    <img src={likeIcon} alt=""/>
                </div>
                <span>{props.likes}</span>
            </div>
        </li>
    )
}

export default Post;