import React, {Component} from 'react';
import Posts from "../../components/Posts/Posts";
import {toJson} from "unsplash-js/lib/unsplash";
import InfiniteScroll from "react-infinite-scroll-component";


class Main extends Component{
    state = {
        posts: [],
        page: 1
    }
    componentDidMount() {
        if (window.location.search !== "") {
            let code = "";
            const query = new URLSearchParams(window.location.search);
            for (let param of query.entries()) {
                if (param[0] === "code") {
                    code = param[1];
                }
            }
            this.props.unsplash.auth.userAuthentication(code)
                .then(toJson)
                .then(json => {
                    console.log(json.access_token)
                    this.props.unsplash.auth.setBearerToken(json.access_token);
                })
        }

        this.getPosts();
    }

    getPosts = () => {
        this.props.unsplash.photos.listPhotos(this.state.page, 30, "latest")
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
        this.props.unsplash.photos.likePhoto(id)
            .then(toJson)
            .then(json => {
                console.log(json)
            });
    }
    render() {


        return (
            <main>
                <InfiniteScroll
                    next={this.getPosts}
                    hasMore={true}
                    loader={null}
                    dataLength="30"
                >
                <Posts
                    posts={this.state.posts}
                    writeLike={this.likePhotoHandler}
                />
                </InfiniteScroll>
            </main>
        )
    }

}

export default Main