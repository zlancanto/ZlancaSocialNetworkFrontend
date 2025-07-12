import React, {FunctionComponent} from 'react';
import {API_USER_LOGOUT} from "../../vars/api";
import axios from "axios";
import cookie from "js-cookie";
import {useNavigate} from "react-router-dom";
import {ROUTE_HOME} from "../../vars/routes";

const Logout: FunctionComponent = () => {

    const navigate = useNavigate();

    const removeCookie = (key: string) => {
        if (typeof window !== 'undefined') {
            cookie.remove(key, { expires: 1 });
        }
    };

    const onLogout = async (e: React.MouseEvent<HTMLLIElement>) => {
        e.preventDefault();
        try {
            const res = await axios({
                method: 'GET',
                url: API_USER_LOGOUT,
                withCredentials: true
            });
            removeCookie('jwt')
            console.log('res', res);
            navigate(ROUTE_HOME);
        }
        catch (err) {
            console.error('err : ', err);
        }
    };

    return (
        <li onClick={onLogout}>
            <img src="/img/icons/logout.svg" alt="Logout logo"/>
        </li>
    );
};

export default Logout;