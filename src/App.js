import React, {Component} from 'react';
import classes from './App.module.css';
import Unsplash, {toJson} from "unsplash-js/lib/unsplash";
import Header from "./components/Header/Header";
import Post from "./components/Post/Post";

const unsplash = new Unsplash({accessKey: "NoZ3Xj6EmhgafvdAT6G5I_NXKAnO3xU3TkUTtV7vvtM"});

class App extends Component {

    state = {
        posts: []
    }

    componentDidMount() {
        unsplash.photos.listPhotos(2, 15, "latest")
            .then(toJson)
            .then(posts => {
                const myPosts = [];
                for (let post of posts) {
                    const postId = post.id;
                    const postPhoto = post.urls.thumb;
                    const user = post.user.first_name;
                    const userLink = post.user.links.html;
                    myPosts.push({
                        postId,
                        postPhoto,
                        user,
                        userLink
                    })
                }
                this.setState({
                    posts: myPosts,
                })
            });
    }

    render() {
        const posts = this.state.posts.map(post => {
            return (
                <Post
                    key={post.postId}
                    image={post.postPhoto}
                    userName={post.user}
                    userLink={post.userLink}/>
            )
        })
        return (
            <div className={classes.App}>
                <Header/>
                <main>
                    <div className="container">
                        <div className="row">
                            <div className="col-12 col-md-8 offset-md-2">
                                <div className={classes.AppBlock}>
                                    <ul>
                                        {posts}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        );
    }
}

export default App;
