import React, {Component} from "react";
import likeIcon from '../../assets/icons/like.svg'
import Like_disabled from '../../assets/icons/like_disabled.svg'
import {Link} from "react-router-dom";

import classes from "./Post.module.css"
import {unsplash} from "../../unsplash";
import {toJson} from "unsplash-js";

class Post extends Component {
    state = {
        like: false
    }
    likePhotoHandler = (id) => {
        if (this.state.like) {
            unsplash.photos.unlikePhoto("mtNweauBsMQ")
                .then(toJson)
                .then(json => {
                    this.setState({like: false})
                });
        } else {
            unsplash.photos.likePhoto(id)
                .then(toJson)
                .then(json => {
                    console.log(json)
                    this.setState({like: true})
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
                    <div
                        className={classes.Like}
                        onClick={() => {
                            this.likePhotoHandler(this.props.id)
                        }}

                    >
                        <img src={!this.state.like ? likeIcon : Like_disabled} alt=""/>
                    </div>
                    <span>{this.props.likes}</span>
                </div>
            </li>
        )
    }
}

export default Post;