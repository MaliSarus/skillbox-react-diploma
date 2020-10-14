import React, {Component} from "react";
import {unsplash} from "../../unsplash";
import {toJson} from "unsplash-js/lib/unsplash";
import classes from './Detail.module.css'
import Spinner from "../../components/UI/Spinner/Spinner";
import Like from "../../components/UI/Like/Like";
import Social from "../../components/UI/Social/Social";

class Detail extends Component {
    state = {
        post: {
            id: '',
            image: '',
            desc: '',
            date: '',
            likes: '',
            user: {
                photo: '',
                name: '',
                link: '',
                twitter: '',
                instagram: '',
                portfolio: '',
            }
        },
        spinner: true,
        like: false,
    }

    componentDidMount() {
        setTimeout(() => {
            unsplash.photos.getPhoto(this.props.match.params.id)
                .then(toJson)
                .then(json => {
                    console.log(json)
                    const singlePost = {
                        id: json.id,
                        image: json.urls.regular,
                        desc: json.alt_description,
                        date: json.created_at,
                        likes: json.likes,
                        user: {
                            photo: json.user.profile_image.medium,
                            name: json.user.first_name,
                            link: json.user.links.html,
                            twitter: json.user.twitter_username,
                            instagram: json.user.instagram_username,
                            portfolio: json.user.portfolio_url,
                        }
                    }
                    this.setState({
                        post: singlePost,
                        spinner: false,
                    })
                });
        }, 3000)
    }

    likePhotoHandler = (id) => {
        if (this.state.like) {
            unsplash.photos.unlikePhoto(id)
                .then(toJson)
                .then(json => {
                    console.log(json);
                    const updatedLike = json.photo.likes;
                    const updatedPost = {...this.state.post};
                    updatedPost.likes = updatedLike;
                    this.setState({
                        post: updatedPost,
                        like: false
                    })
                });
        } else {
            unsplash.photos.likePhoto(id)
                .then(toJson)
                .then(json => {
                    console.log(json);
                    const updatedLike = json.photo.likes;
                    const updatedPost = {...this.state.post};
                    updatedPost.likes = updatedLike;
                    this.setState({
                        post: updatedPost,
                        like: true
                    })
                });

        }
    }

    render() {
        const regDate = new Date(this.state.post.date);
        const regDateString = ('0' + regDate.getDate()).slice(-2) + '.' + ('0' + (regDate.getMonth() + 1)).slice(-2) + '.' + regDate.getFullYear();
        let content = (
            <div className={classes.Detail} style={{
                paddingTop: '150px',
                display: 'flex',
                justifyContent: 'center'
            }}>
                <Spinner/>
            </div>
        );
        if (!this.state.spinner) {
            content = (<div className={classes.Detail} style={{marginTop: '150px'}}>
                <div className={classes.Image}>
                    <img src={this.state.post.image} alt=""/>
                </div>
                <div className={classes.Desc}>
                    <div className={classes.Head}>
                        <a href={this.state.post.user.link} className={classes.User}>
                            <span className={classes.Image}><img src={this.state.post.user.photo} alt=""/></span>
                            {this.state.post.user.name}
                        </a>
                        <div className={classes.Date}>{regDateString}</div>
                    </div>
                    <div className={classes.Text}>
                        <p>{this.state.post.desc}</p>
                    </div>
                    <div className={classes.Footer}>
                        <div className={classes.Likes}>
                            <Like
                                like={() => {
                                    this.likePhotoHandler(this.state.post.id)
                                }}
                                isLiked={this.state.like}
                            />{this.state.post.likes}
                        </div>
                        <div className={classes.Socials}>
                            <Social class="Portfolio" href={this.state.post.user.portfolio}/>
                            {this.state.post.user.twitter ?
                                <Social class="Twitter" href={this.state.post.user.twitter}/> : null}
                            {this.state.post.user.instagram ?
                                <Social class="Instagram" href={this.state.post.user.instagram}/> : null}
                        </div>
                    </div>
                </div>
            </div>)
        }
        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        {content}
                    </div>
                </div>
            </div>

        )
    }
}

export default Detail