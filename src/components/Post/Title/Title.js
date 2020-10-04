import React from "react";
import classes from './Title.module.css'

const Title = (props) => (
    <div className={classes.Title}>
        <a href={props.creator.link}>
            <div className={classes.Title__image}>
                <img src={props.creator.photo} alt=""/>
            </div>
            <span>{props.creator.name}</span>
        </a>
        <div className={classes.Likes}>
            Likes: {props.likes}
        </div>
    </div>
);

export default Title;
