import React from "react";
import classes from './Body.module.css'

const Body = (props) => (
    <div className={classes.Body}>
        <img src={props.photo} alt=""/>
    </div>
);

export default Body;