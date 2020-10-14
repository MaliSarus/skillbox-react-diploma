import classes from "./Like.module.css";
import likeIcon from "../../../assets/icons/Like/like.svg";
import Like_disabled from "../../../assets/icons/Like/like_disabled.svg";
import React from "react";

const Like = (props) => (
    <div
        className={props.class || classes.Like}
        onClick={props.like}
    >
        <img src={!props.isLiked ? likeIcon : Like_disabled} alt=""/>
    </div>
)

export default Like;