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
            <button className={classes.Login_button} onClick={this.props.logIn}>Вход</button>
        )
        if (this.props.user) {
            logInButton = (
                <p style={{marginBottom: 0}}>Hello, <b>{this.props.user}</b></p>
            )
        }
        return (
            <header className={classes.Header}>
                <div className="container">
                    <div className="row">
                        <div className="col-4 offset-4 col-md-2 offset-md-5">
                            <div className={classes.Logo}>
                                <Link to="/">
                                    <img src={logo} alt=""/>
                                </Link>
                            </div>
                        </div>
                        <div className="col-4 col-md-5 d-flex align-items-center justify-content-end">
                            {logInButton}
                        </div>
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