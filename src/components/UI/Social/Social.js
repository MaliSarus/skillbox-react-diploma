import React from "react";
import classes from './Social.module.css'

const Social = (props) => {
    let href = '';
    switch (props.class) {
        case 'Twitter':
            href = `https://twitter.com/${props.href}`;
            break;
        case 'Instagram':
            href = `https://instagram.com/${props.href}`;
            break;
        default:
            href = props.href
    }
    return (
        <a className={classes[props.class]} href={href}/>
    )
}


export default Social;