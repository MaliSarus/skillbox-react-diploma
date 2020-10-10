import React from "react";
import likeIcon from '../../../assets/icons/like.svg'
import Like_disabled from '../../../assets/icons/like_disabled.svg'

import classes from "./Post.module.css"
import {toJson} from "unsplash-js/lib/unsplash";

const Post = (props) => {
    return (
        <li className={classes.Post} onClick={() => {console.log('post')}}>
            <div className={classes.Head}>
                <a href={props.user.link} className={classes.User}>
                    <span className={classes.Image}><img src={props.user.photo} alt=""/></span>
                    {props.user.name}
                </a>
                <div className={classes.Date}>15.02.2020</div>
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