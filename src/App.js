import React, {Component} from 'react';
import classes from './App.module.css';
import Unsplash, {toJson} from "unsplash-js/lib/unsplash";
import Header from "./components/Header/Header";
import Post from "./components/Post/Post";
import InfiniteScroll from "react-infinite-scroll-component";
import {Route, Link, Switch} from 'react-router-dom'
import Detail from "./components/Detail/Detail";

const unsplash = new Unsplash({
    accessKey: "NoZ3Xj6EmhgafvdAT6G5I_NXKAnO3xU3TkUTtV7vvtM",
    secret: "8lvyNjsXAVw-uSh8xohSxCwDDl_IThXhw-emg5xXJWk",
    callbackUrl: 'http://localhost:3000/'
});
let code = "";


if (window.location.search !== "") {
    const query = new URLSearchParams(window.location.search);
    for (let param of query.entries()) {
        if (param[0] === "code") {
            code = param[1];
        }
    }
    unsplash.auth.userAuthentication(code)
        .then(toJson)
        .then(json => {
            unsplash.auth.setBearerToken(json.access_token);
        })
}

class App extends Component {

    state = {
        posts: [],
        page: 1,
    }

    getPosts = () => {
        unsplash.photos.listPhotos(this.state.page, 30, "latest")
            .then(toJson)
            .then(posts => {
                const myPosts = [...this.state.posts];
                for (let post of posts) {
                    const newPost = {
                        postId: post.id,
                        postPhoto: post.urls.small,
                        likes: post.likes,
                        user: {
                            name: post.user.first_name,
                            link: post.user.links.html,
                            photo: post.user.profile_image.large
                        },
                    }
                    myPosts.push(newPost)
                }
                this.setState({
                    posts: myPosts,
                    page: this.state.page + 1
                })
            });
    }
    likePhotoHandler = (id) =>{
        console.log('click')
        unsplash.photos.likePhoto(id)
            .then(toJson)
            .then(json => {
                console.log(json)
            });
    }

    componentDidMount() {

        this.getPosts();
    }

    render() {
        const authenticationUrl = unsplash.auth.getAuthenticationUrl([
            "write_likes"
        ]);
        const posts = this.state.posts.map(post => {
            return (
                <Post
                    key={post.postId}
                    id={post.postId}
                    image={post.postPhoto}
                    user={post.user}
                    likes={post.likes}
                    click={this.likePhotoHandler}
                />
            )
        })


        return (
            <div className={classes.App}>
                <Header/>
                <main>
                    <Switch>
                        <Route path="/image" render={() => {
                            window.location.assign(authenticationUrl)
                        }}/>
                        <Route path="/">
                            <div className="container">
                                <div className="row">
                                    <div className="col-12 col-md-8 offset-md-2">
                                        <div className={classes.AppBlock}>

                                            <ul>
                                                <InfiniteScroll
                                                    next={this.getPosts}
                                                    hasMore={true}
                                                    loader={null}
                                                    dataLength={posts.length}
                                                >
                                                    {posts}
                                                </InfiniteScroll>
                                            </ul>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Route>
                    </Switch>
                </main>
            </div>
        );
    }
}

export default App;
