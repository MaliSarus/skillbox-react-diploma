import React, {Component} from "react";
import classes from './Header.module.scss'
import logo from '../../logo.svg'
import {Link} from "react-router-dom";
import {connect} from 'react-redux'
import * as actionCreators from "../../store/actionCreators/actionCreators";
import {unsplash} from "../../unsplash";
import {toJson} from "unsplash-js/lib/unsplash";

class Header extends Component {
    componentDidMount() {
        this.props.onCheckAuth();
    }

    render() {
        let logInButton = (
            <div className="col-5 d-flex align-items-center justify-content-end">
                <button className="btn btn-primary" onClick={this.props.logIn}>Вход</button>
            </div>
        )
        if (this.props.user) {
            logInButton = (
                <div className="col-5 d-flex align-items-center justify-content-end">
                    <p>Hello, <b>{this.props.user}</b></p>
                </div>
            )
        }
        return (
            <header className={classes.Header}>
                <div className="container">
                    <div className="row">
                        <div className="col-2 offset-5">
                            <Link to="/">
                                <img src={logo} alt=""/>
                            </Link>
                        </div>
                        {logInButton}
                    </div>
                </div>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        user: state.authUser
    }
}
const mapDispatchToProps = dispatch => {
    return {
        onCheckAuth: () => {
            dispatch(actionCreators.checkAuthAsync())
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header);