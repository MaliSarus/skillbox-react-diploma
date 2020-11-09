import React, {Component} from "react";
import classes from "./Posts.module.scss";
import Post from "../../containers/Post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import {checkLocalToken, checkUrlToken, unsplash} from "../../unsplash";
import {toJson} from "unsplash-js";
import * as actionCreators from "../../store/actionCreators/actionCreators";
import {connect} from "react-redux";

class Posts extends Component {
    state = {
        page: 1,
    }

    componentDidMount() {

        const localToken = checkLocalToken()
        if (localToken) {
            unsplash.auth.setBearerToken(localStorage.getItem('token'));
            unsplash.currentUser.profile()
                .then(toJson)
                .then(data => {
                    this.props.onCheckAuth(data.username)
                    this.getPosts(true)
                });
        } else {
            const urlToken = checkUrlToken()
            if (urlToken) {
                unsplash.auth.userAuthentication(urlToken)
                    .then(toJson)
                    .then(json => {
                        localStorage.setItem('token', json.access_token);
                        localStorage.setItem('tokenExpiration', new Date().getTime() + 100000);
                        unsplash.auth.setBearerToken(json.access_token);
                        unsplash.currentUser.profile()
                            .then(toJson)
                            .then(data => {
                                this.props.onCheckAuth(data.username)
                                this.getPosts(true)
                            });
                    });
            } else {
                this.getPosts(true)
            }
        }
    }

    getPosts = (clear = false) => {
        if (clear) this.props.onClearPosts()
        unsplash.photos.listPhotos(clear ? 1 : this.state.page, 30, "latest")
            .then(toJson)
            .then(posts => {
                const myPosts = [];
                for (let post of posts) {
                    const newPost = {
                        postId: post.id,
                        postPhoto: post.urls.small,
                        likes: post.likes,
                        date: post.created_at,
                        liked: post.liked_by_user,
                        user: {
                            name: post.user.first_name,
                            link: post.user.links.html,
                            photo: post.user.profile_image.large
                        },
                    }
                    myPosts.push(newPost)
                }
                if (clear) {
                    this.setState({page: 2})
                    this.props.onAddPosts(myPosts);
                } else {
                    this.setState({page: this.state.page + 1});
                    this.props.onAddPosts(myPosts);
                }
            });
    }

    render() {
        const postsElement = this.props.posts.map(post => {
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
        return (
            <InfiniteScroll
                next={this.getPosts}
                hasMore={true}
                loader={null}
                dataLength="30"
            >
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
            </InfiniteScroll>
        )
    }
}

const mapStateToProps = state => {
    return {
        posts: state.posts,
        authUser: state.authUser
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddPosts: (posts) => {
            dispatch(actionCreators.addPost(posts))
        },
        onClearPosts: () => {
            dispatch(actionCreators.clearPosts())
        },
        onCheckAuth: (username) => {
            dispatch(actionCreators.checkAuthSync(username))
        },
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Posts)