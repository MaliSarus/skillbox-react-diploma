import React, {Component} from "react";
import {unsplash} from "../../unsplash";
import {toJson} from "unsplash-js/lib/unsplash";
import classes from './Detail.module.css'
import Spinner from "../../components/UI/Spinner/Spinner";

class Detail extends Component {
    state = {
        post: {
            image: '',
            desc: '',
            user: {
                photo: '',
                name: '',
                link: '',
            }
        },
        spinner: true,
    }

    componentDidMount() {
        setTimeout(() => {
            unsplash.photos.getPhoto(this.props.match.params.id)
                .then(toJson)
                .then(json => {
                    console.log(json)
                    const singlePost = {
                        image: json.urls.regular,
                        desc: json.alt_description,
                        user: {
                            photo: json.user.profile_image.medium,
                            name: json.user.first_name,
                            link: json.user.links.html,
                        }
                    }
                    this.setState({
                        post: singlePost,
                        spinner: false,
                    })
                });
        },3000)
    }

    render() {
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
            content = (<div className={classes.Detail} style={{paddingTop: '150px'}}>
                <div className={classes.Image}>
                    <img src={this.state.post.image} alt=""/>
                </div>
                <div className={classes.Desc}>
                    <div className={classes.Head}>
                        <a href={this.state.post.user.link} className={classes.User}>
                            <span className={classes.Image}><img src={this.state.post.user.photo} alt=""/></span>
                            {this.state.post.user.name}
                        </a>
                    </div>
                    <div className={classes.Text}>
                        <p>{this.state.post.desc}</p>
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