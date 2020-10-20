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
        if (this.props.detailPost){
            if(this.props.detailPost.id === this.props.match.params.id){
                const singlePostUser = {
                    ...this.props.detailPost.user
                };
                const singlePost = {
                    ...this.props.detailPost,
                    user: singlePostUser
                }
                this.setState({
                    post: singlePost,
                    spinner: false,
                })
            }
            else{
                this.fetchPost();
            }
        }
        else{
            this.fetchPost();
        }
    }

    fetchPost = () => {
        setTimeout(() => {
            unsplash.photos.getPhoto(this.props.match.params.id)
                .then(toJson)
                .then(json => {
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
                    this.props.onSaveDetailPost(singlePost);
                });
        }, 3000)
    }

    likePhotoHandler = (id) => {
        if (this.state.like) {
            const updatedLike = this.state.post.likes + 1;
            const updatedPost = {...this.state.post};
            updatedPost.likes = updatedLike;
            this.setState({
                post: updatedPost,
                like: false
            })
            unsplash.photos.unlikePhoto(id)
                .then(toJson)
                .then(json => {
                });
        } else {
            const updatedLike = this.state.post.likes - 1;
            const updatedPost = {...this.state.post};
            updatedPost.likes = updatedLike;
            this.setState({
                post: updatedPost,
                like: true
            })
            unsplash.photos.likePhoto(id)
                .then(toJson)
                .then(json => {
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
            </div>)
        }

        const routeState = this.props.location.state;
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
        detailPost: state.detailPost
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