import React, {Component} from "react";
import {Link} from "react-router-dom";
import Like from "../../components/UI/Like/Like";
import classes from "./Post.module.css"
import {unsplash} from "../../unsplash";
import {toJson} from "unsplash-js";

class Post extends Component {
    state = {
        like: false,
        likes: this.props.likes
    }
    likePhotoHandler = (id) => {
        if (this.state.like) {
            unsplash.photos.unlikePhoto(id)
                .then(toJson)
                .then(json => {
                    const updatedLike = json.photo.likes;
                    this.setState({like: false, likes: updatedLike})
                });
        } else {
            unsplash.photos.likePhoto(id)
                .then(toJson)
                .then(json => {
                    const updatedLike = json.photo.likes;
                    this.setState({like: true, likes: updatedLike})
                });

        }
    }

    render() {
        const regDate = new Date(this.props.date);
        const regDateString = ('0' + regDate.getDate()).slice(-2) + '.' + ('0' + (regDate.getMonth() + 1)).slice(-2) + '.' + regDate.getFullYear();
        return (
            <li className={classes.Post}>
                <div className={classes.Head}>
                    <a href={this.props.user.link} className={classes.User}>
                        <span className={classes.Image}><img src={this.props.user.photo} alt=""/></span>
                        {this.props.user.name}
                    </a>
                    <div className={classes.Date}>{regDateString}</div>
                </div>
                <Link to={'/photo/' + this.props.id}>
                    <div className={classes.Body}><img src={this.props.image} alt=""/></div>
                </Link>
                <div className={classes.Footer}>
                    <Like
                        class={classes.Like}
                        like={()=>{this.likePhotoHandler(this.props.id)}}
                        isLiked={this.state.like}
                    />
                    <span>{this.state.likes}</span>
                </div>
            </li>
        )
    }
}

export default Post;