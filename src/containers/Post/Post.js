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
            const updatedLike = this.state.likes + 1;
            this.setState({like: false, likes: updatedLike})
            unsplash.photos.unlikePhoto(id)
                .then(toJson)
                .then(json => {
                })
                .catch(err => {
                    console.log(err)
                });
        } else {
            const updatedLike = this.state.likes - 1;
            this.setState({like: true, likes: updatedLike})
            unsplash.photos.likePhoto(id)
                .then(toJson)
                .then(json => {
                })
                .catch(err => {
                    console.log(err)
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
                <Link to={{
                    pathname: '/photo/' + this.props.id,
                    state: {
                        user: this.props.user,
                        postPhoto: this.props.image,
                        date: regDateString,
                    }
                }}>
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