import React, {Component} from 'react';
import classes from './App.module.css';
import Header from "./Header/Header";
import Main from "./Main/Main";
import {authenticationUrl} from "../unsplash";
import {connect} from 'react-redux'
import * as actionCreators from "../store/actionCreators/actionCreators";

class App extends Component {
    componentDidMount() {
        this.props.onCheckAuth();
    }

    onLogInHandler = (event) => {
        event.preventDefault();
        window.location.assign(authenticationUrl);
    }

    render() {
        return (
            <div className={classes.App}>
                <Header logIn={this.onLogInHandler}/>
                <Main/>
            </div>
        );
    }
}


const mapDispatchToProps = dispatch => {
    return {
        onCheckAuth: () => {
            dispatch(actionCreators.checkAuthAsync())
        }
    }
}
const mapStateToProps = state => {
    return {
        user: state.authUser
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
