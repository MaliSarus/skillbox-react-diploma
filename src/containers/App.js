import React, {Component} from 'react';
import classes from './App.module.css';
import Header from "../components/Header/Header";
import Main from "./Main/Main";
import {authenticationUrl} from "../unsplash";

class App extends Component {

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

export default App;
