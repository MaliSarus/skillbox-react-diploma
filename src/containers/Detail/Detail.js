import React, {Component} from "react";
import {unsplash} from "../../unsplash";
import {toJson} from "unsplash-js/lib/unsplash";
import classes from './Detail.module.scss'
import Spinner from "../../components/UI/Spinner/Spinner";
import Like from "../../components/UI/Like/Like";
import Social from "../../components/UI/Social/Social";
import {connect} from 'react-redux'
import * as actionCreators from "../../store/actionCreators/actionCreators";

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
        if (this.props.detailPost) {
            if (this.props.detailPost.id === this.props.match.params.id && this.props.detailPost.likes === this.props.location.state.likes) {

                const singlePostUser = {
                    ...this.props.detailPost.user
                };
                const singlePost = {
                    ...this.props.detailPost,
                    user: singlePostUser
                }
                this.setState({
                    post: singlePost,
                    like: singlePost.liked,
                    spinner: false,
                })
            } else {
                this.fetchPost();
            }
        } else {
            this.fetchPost();
        }
    }

    fetchPost = () => {
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
                        liked: json.liked_by_user,
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
                        like: singlePost.liked,
                        spinner: false,
                    })
                    this.props.onSaveDetailPost(singlePost);
                });
        }, 3000)
    }

    likePhotoHandler = (id) => {
        if (this.state.like) {
            const updatedLike = this.state.post.likes - 1;
            const updatedPost = {...this.state.post};
            updatedPost.likes = updatedLike;
            unsplash.photos.unlikePhoto(id)
                .then(toJson)
                .then(json => {
                });
            this.setState({
                post: updatedPost,
                like: false
            })
        } else {
            const updatedLike = this.state.post.likes + 1;
            const updatedPost = {...this.state.post};
            updatedPost.likes = updatedLike;
            unsplash.photos.likePhoto(id)
                .then(toJson)
                .then(json => {
                });
            this.setState({
                post: updatedPost,
                like: true
            })

        }
    }

    render() {
        const routeState = this.props.location.state;
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
            content = (<div style={{
                display: "flex",
                height: '100%',
                flexDirection: 'column'
            }}>
                <div className={classes.Text}>
                    <p>{this.state.post.desc}</p>
                </div>
                <div className={classes.Footer}>
                    <div className={classes.Likes}>
                        {this.props.authUser ?
                            (<Like
                                like={() => {
                                    this.likePhotoHandler(this.state.post.id)
                                }}
                                isLiked={this.state.like}
                            />)
                            : 'Likes: '
                        }
                        {this.state.spinner ? routeState.likes : this.state.post.likes}
                    </div>
                    <div className={classes.Socials}>
                        <Social class="Portfolio" href={this.state.post.user.portfolio}/>
                        {this.state.post.user.twitter ?
                            <Social class="Twitter" href={this.state.post.user.twitter}/> : null}
                        {this.state.post.user.instagram ?
                            <Social class="Instagram" href={this.state.post.user.instagram}/> : null}
                    </div>
                </div>
            </div>)
        }


        return (
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className={classes.Detail} style={{marginTop: '150px'}}>
                            <div className={classes.Image}>
                                <img src={this.state.spinner ? routeState.postPhoto : this.state.post.image} alt=""/>
                            </div>
                            <div className={classes.Desc}>
                                <div className={classes.Head}>
                                    <a href={routeState.user.link} className={classes.User}>
                                        <span className={classes.Image}><img src={routeState.user.photo} alt=""/></span>
                                        {routeState.user.name}
                                    </a>
                                    <div className={classes.Date}>{routeState.date}</div>
                                </div>
                                {content}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

const mapStateToProps = state => {
    return {
        detailPost: state.detailPost,
        authUser: state.authUser
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onSaveDetailPost: (post) => {
            dispatch(actionCreators.saveDetailPost(post))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Detail)