import React, {Component} from "react";
import classes from './Header.module.scss'
import logo from '../../logo.svg'
import {Link} from "react-router-dom";
import {connect} from 'react-redux'

class Header extends Component {

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

export default connect(mapStateToProps)(Header);