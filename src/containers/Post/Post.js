import React, {Component} from "react";
import {Link} from "react-router-dom";
import Like from "../../components/UI/Like/Like";
import classes from "./Post.module.css"
import {unsplash} from "../../unsplash";
import {toJson} from "unsplash-js";
import {connect} from "react-redux";

class Post extends Component {
    state = {
        like: this.props.liked,
        likes: this.props.likes,
        error: null
    }
    likePhotoHandler = (id) => {
        if (this.state.like) {
            const updatedLike = this.state.likes - 1;
            unsplash.photos.unlikePhoto(id)
                .then(toJson)
                .then(json => {
                })
            this.setState({like: false, likes: updatedLike})

        } else {
            const updatedLike = this.state.likes + 1;
            unsplash.photos.likePhoto(id)
                .then(toJson)
                .then(json => {
                })
            this.setState({like: true, likes: updatedLike})
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
                        likes: this.state.likes
                    }
                }}>
                    <div className={classes.Body}><img src={this.props.image} alt=""/></div>
                </Link>
                <div className={classes.Footer}>
                    {this.props.authUser ?
                        (<Like
                            class={classes.Like}
                            like={() => {
                                this.likePhotoHandler(this.props.id)
                            }}
                            isLiked={this.state.like}
                        />)
                        : ('Likes: ')
                    }

                    <span style={!this.props.authUser ? {marginLeft: '15px'} : null}>
                        {this.state.likes}
                    </span>
                </div>
            </li>
        )
    }
}

const mapStateToProps = state => {
    return {
        authUser: state.authUser
    }
}

export default connect(mapStateToProps)(Post);