import React from "react";
import Title from "./Title/Title";
import Body from "./Body/Body";
import classes from "./Post.module.css"
import {Link} from "react-router-dom";
import {toJson} from "unsplash-js/lib/unsplash";

const Post = (props) => {
    return (
        <li className={classes.Post} onClick={() => {props.click(props.id)}}>
            <Title creator={props.user} likes={props.likes} />
            <Link to="/image">
                <Body photo={props.image}/>
            </Link>
        </li>
    )
}

export default Post;