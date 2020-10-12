import React, {Component} from "react";
import {unsplash} from "../../../unsplash";
import {toJson} from "unsplash-js/lib/unsplash";

class Detail extends Component{
    state={
        post: {
            image: ''
        }
    }
    componentDidMount() {
        unsplash.photos.getPhoto(this.props.match.params.id)
            .then(toJson)
            .then(post => {
                const singlePost = {
                    image: post.urls.regular
                }
                this.setState({
                    post: singlePost
                })
            });
    }

    render() {
        console.log(this.state.post)
        return(
            <div className="container">
                <div className="row">
                    <div className="col-12">
                        <div className="post" style={{paddingTop: '150px'}}>
                            <img src={this.state.post.image} alt="" style={{
                                width: '100%',
                                objectFit: 'contain',
                                objectPosition: 'center'
                            }}/>
                        </div>
                    </div>
                </div>
            </div>

        )
    }
}

export default Detail