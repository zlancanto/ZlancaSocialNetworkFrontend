import React, {FunctionComponent} from 'react';
import {NavLink} from "react-router-dom";
import {ROUTE_HOME, ROUTE_PROFIL, ROUTE_TRENDING} from "../vars/routes";

const LeftNav: FunctionComponent = () => {
    return (
        <div className="left-nav-container">
            <div className="icons">
                <div className="icons-bis">
                    <NavLink
                        to={ROUTE_HOME}
                        className={({ isActive }) => isActive ? "active-left-nav" : ""}
                    >
                        <img src="/img/icons/home.svg" alt="HomeIcon"/>
                    </NavLink>
                    <br/>

                    <NavLink
                        to={ROUTE_TRENDING}
                        className={({ isActive }) => isActive ? "active-left-nav" : ""}
                    >
                        <img src="/img/icons/rocket.svg" alt="RocketIcon"/>
                    </NavLink>
                    <br/>

                    <NavLink
                        to={ROUTE_PROFIL}
                        className={({ isActive }) => isActive ? "active-left-nav" : ""}
                    >
                        <img src="/img/icons/user.svg" alt="UserIcon"/>
                    </NavLink>
                    <br/>
                </div>
            </div>
        </div>
    );
};

export default LeftNav;