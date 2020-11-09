import React from 'react';
import Posts from "../../components/Posts/Posts";
import {Switch, Route} from 'react-router-dom'
import Detail from "../Detail/Detail";


const Main = () => {
    return (
        <main>
            <Switch>
                <Route path="/photo/:id" component={Detail}/>
                <Route path="/" component={Posts}/>
            </Switch>
        </main>
    )
}


export default Main