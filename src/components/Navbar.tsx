import React, {FunctionComponent, useContext} from 'react';
import {NavLink, useLocation} from "react-router-dom";
import {ROUTE_HOME, ROUTE_PROFIL, ROUTE_TRENDING} from "../vars/routes";
import {UidContext} from "./AppContext";
import Logout from "./Log/Logout";
import {IUserEntity} from "../structures/entities/IUser.entity";
import {useSelector} from "react-redux";
import {getUserConnected} from "../redux/reducers/user/user.getters";

const Navbar: FunctionComponent = () => {
    const uid: string | null = useContext(UidContext);
    const userConnected: IUserEntity | undefined = useSelector(getUserConnected);
    const location = useLocation();

    const getNamePage = () => {
        switch (location.pathname) {
            case ROUTE_HOME:
                return "Page d'accueil";
            case ROUTE_PROFIL:
                return 'Votre profil';
            case ROUTE_TRENDING:
                return 'Les tendances du moment';
            default:
                return '';
        }
    }

    return (
        <nav>
            <div className="nav-container">
                <div className="logo">
                    <NavLink to={ROUTE_HOME}>
                        <div className="logo">
                            <img src="/img/icon.png" alt="Log du site"/>
                            <h3>Mymoz</h3>
                        </div>
                    </NavLink>
                </div>
                <h3>{getNamePage()}</h3>
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
                                        <img src="/img/icons/login.svg" alt="LoginLogo"/>
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