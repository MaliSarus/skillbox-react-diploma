import React from "react";
import likeIcon from '../../../assets/icons/like.svg'
import Like_disabled from '../../../assets/icons/like_disabled.svg'

import classes from "./Post.module.css"
import {toJson} from "unsplash-js/lib/unsplash";

const Post = (props) => {
    const regDate = new Date(props.date);
    const regDateString = ('0' + regDate.getDate()).slice(-2) + '.' + ('0' + regDate.getMonth()).slice(-2) + '.' + regDate.getFullYear();

    return (
        <li className={classes.Post} onClick={() => {console.log('post')}}>
            <div className={classes.Head}>
                <a href={props.user.link} className={classes.User}>
                    <span className={classes.Image}><img src={props.user.photo} alt=""/></span>
                    {props.user.name}
                </a>
                <div className={classes.Date}>{regDateString}</div>
            </div>
            <div className={classes.Body}><img src={props.image} alt=""/></div>
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