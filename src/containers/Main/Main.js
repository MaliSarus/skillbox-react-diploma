import React, {Component} from 'react';
import Posts from "../../components/Posts/Posts";
import {toJson} from "unsplash-js/lib/unsplash";
import InfiniteScroll from "react-infinite-scroll-component";
import {connect} from "react-redux";
import {unsplash} from "../../unsplash";
import {Switch, Route} from 'react-router-dom'
import Detail from "../../components/Posts/Detail/Detail";


class Main extends Component {
    state = {
        // posts: [],
        page: 1
    }

    componentDidMount() {
        this.getPosts();
    }

    getPosts = () => {
        unsplash.photos.listPhotos(this.state.page, 30, "latest")
            .then(toJson)
            .then(posts => {
                const myPosts = [];
                for (let post of posts) {
                    const newPost = {
                        postId: post.id,
                        postPhoto: post.urls.small,
                        likes: post.likes,
                        date: post.created_at,
                        user: {
                            name: post.user.first_name,
                            link: post.user.links.html,
                            photo: post.user.profile_image.large
                        },
                    }
                    myPosts.push(newPost)
                }
                this.setState({page: this.state.page + 1});
                this.props.onAddPosts(myPosts);
            });
    }

    likePhotoHandler = (id) => {
        unsplash.photos.likePhoto(id)
            .then(toJson)
            .then(json => {
                console.log(json)
            });
    }

    render() {

        return (
            <main>
                <Switch>
                    <Route path="/photo/:id" component={Detail}/>
                    <Route path="/" render={() => (
                        <InfiniteScroll
                            next={this.getPosts}
                            hasMore={true}
                            loader={null}
                            dataLength="30"
                        >
                            <Posts
                                posts={this.props.posts}
                                writeLike={this.likePhotoHandler}
                            />
                        </InfiniteScroll>
                    )}/>
                </Switch>
            </main>
        )
    }

}

const mapStateToProps = state => {
    return {
        posts: state.posts
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onAddPosts: (posts) => {
            dispatch({type: 'ADD_POSTS', posts})
        }
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Main)