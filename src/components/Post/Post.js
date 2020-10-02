import React from "react";
import Title from "./Title/Title";
import Body from "./Body/Body";
import Footer from "./Footer/Footer";
import classes from "./Post.module.css"

const Post = (props) => {
    return (
        <li className={classes.Post}>
                <Title postCreator={props.userName} postCreatorLink={props.userLink}/>
                <Body photo={props.image}/>
                <Footer likes="38"/>
        </li>
    )
}

export default Post;