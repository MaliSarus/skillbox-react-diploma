import React, {Component} from 'react';
import classes from './App.module.css';
import Header from "../components/Header/Header";
import Main from "./Main/Main";
import Unsplash, {toJson} from "unsplash-js";

const unsplash = new Unsplash({
    accessKey: "NoZ3Xj6EmhgafvdAT6G5I_NXKAnO3xU3TkUTtV7vvtM",
    secret: "8lvyNjsXAVw-uSh8xohSxCwDDl_IThXhw-emg5xXJWk",
    callbackUrl: 'http://localhost:3000/'
});


class App extends Component {
    // componentDidMount() {
    //         if (window.location.search !== "") {
    //             const query = new URLSearchParams(window.location.search);
    //             for (let param of query.entries()) {
    //                 if (param[0] === "code") {
    //                     code = param[1];
    //                 }
    //             }
    //             unsplash.auth.userAuthentication(code)
    //                 .then(toJson)
    //                 .then(json => {
    //                     unsplash.auth.setBearerToken(json.access_token);
    //                 })
    //         }
    //
    // }

    onLogInHandler = (event) => {
        event.preventDefault();
        const authenticationUrl = unsplash.auth.getAuthenticationUrl([
            "write_likes"
        ]);
        window.location.assign(authenticationUrl);
    }

    render() {
        return (
            <div className={classes.App}>
                <Header logIn={this.onLogInHandler}/>
                <Main
                    unsplash={unsplash}
                />
            </div>
        );
    }
}

export default App;
