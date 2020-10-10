import React from "react";
import classes from "../../containers/App.module.css";
import InfiniteScroll from "react-infinite-scroll-component";
import Post from "./Post/Post";

const Posts = (props) => {
    const postsElement = props.posts.map(post => {
        return (
            <Post
                key={post.postId}
                id={post.postId}
                image={post.postPhoto}
                user={post.user}
                likes={post.likes}
                writelike={() => {props.writeLike(post.postId)}}
            />
        )
    })
    return(
        <div className="container">
            <div className="row">
                <div className="col-12 col-md-8 offset-md-2">
                    <div className="posts" style={{paddingTop: '150px'}}>
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