import React from "react";
import classes from './Header.module.css'
import logo from '../../logo.svg'
import {Link} from "react-router-dom";

const Header = (props) => {

    return(
        <header className={classes.Header}>
            <div className="container">
                <div className="row">
                    <div className="col-2 offset-5">
                        <Link to="/">
                            <img src={logo} alt=""/>
                        </Link>
                    </div>
                    <div className="col-5 d-flex align-items-center justify-content-end">
                        <button className="btn btn-primary" onClick={props.logIn}>Вход</button>
                    </div>
                </div>
            </div>
        </header>
    )
}

export default Header;