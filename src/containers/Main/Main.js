import React, {Component} from 'react';
import Posts from "../../components/Posts/Posts";
import {Switch, Route} from 'react-router-dom'
import Detail from "../Detail/Detail";
import {connect} from "react-redux";


class Main extends Component {
    render() {
        return (
            <main>
                <Switch>
                    <Route path="/photo/:id" component={Detail}/>
                    <Route path="/" render={ () => (<Posts authUser={this.props.user}/>)}/>
                </Switch>
            </main>
        )
    }
}
const mapStateToProps = state => {
    return {
        user: state.authUser
    }
}

export default connect(mapStateToProps)(Main)