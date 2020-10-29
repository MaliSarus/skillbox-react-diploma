import React from "react";
import classes from "./Posts.module.scss";
import Post from "../../containers/Post/Post";

const Posts = (props) => {
    const postsElement = props.posts.map(post => {
        return (
            <Post
                key={post.postId}
                id={post.postId}
                image={post.postPhoto}
                user={post.user}
                likes={post.likes}
                date={post.date}
                liked={post.liked}
            />
        )
    })
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2">
                    <div className={classes.Posts} style={{paddingTop: '150px'}}>
                        <ul>
                                {postsElement}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Posts