import React, {FunctionComponent, useContext} from 'react';
import {NavLink} from "react-router-dom";
import {ROUTE_HOME, ROUTE_PROFIL} from "../vars/routes";
import {UidContext} from "./AppContext";
import Logout from "./Log/Logout";
import {IUserEntity} from "../structures/entities/IUser.entity";
import {useSelector} from "react-redux";
import {getUserConnected} from "../redux/reducers/user/user.getters";

const Navbar: FunctionComponent = () => {
    const uid: string | null = useContext(UidContext);
    const userConnected: IUserEntity | undefined = useSelector(getUserConnected)

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to={ROUTE_HOME}>
                        <div className="logo">
                            <img src="/img/icon.png" alt="Log du site"/>
                            <h3>Zlanca</h3>
                        </div>
                    </NavLink>
                </div>
                {
                    uid ? (
                            <ul>
                                <li></li>
                                <li className="welcome">
                                    <NavLink to={ROUTE_PROFIL}>
                                        <h5>Bienvenue {userConnected?.pseudo}</h5>
                                    </NavLink>
                                </li>
                                <Logout/>
                            </ul>
                        )
                        : (
                            <ul>
                                <li></li>
                                <li>
                                    <NavLink to={ROUTE_PROFIL}>
                                        <img src="/img/icons/login.svg" alt="Logo login"/>
                                    </NavLink>
                                </li>
                            </ul>
                        )
                }
            </div>
        </nav>
    );
};

export default Navbar;