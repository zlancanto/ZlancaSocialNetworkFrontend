import React, {FunctionComponent, useState} from 'react';
import {API_URL, API_USER_LOGIN} from "../../vars/api";
import axios from "axios";
import {NavigateFunction, useNavigate} from "react-router-dom";
import {ROUTE_HOME} from "../../vars/routes";

const SignInForm: FunctionComponent = () => {
    /* Hooks */
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [connectionError, setConnectionError] = useState<string|null>(null);

    /* Navigate */
    const navigate: NavigateFunction = useNavigate();

    const onChangeEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const onChangePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log('API_URL : ', API_URL)
            const response = await axios({
                method: 'post',
                url: API_USER_LOGIN,
                withCredentials: true,
                data: {
                    email,
                    password,
                }
            });
            if (!response.data) {
                setConnectionError('Email ou mot de passe incorrect');
            }else {
                navigate(ROUTE_HOME);
            }
        }
        catch (err: any) {
            if (err.response.data.errors) {
                setConnectionError('Email ou mot de passe incorrect');
            }
            else {
                setConnectionError(err.message);
            }
            console.error('error : ', err)
        }
    }

    return (
        <form onSubmit={onSubmit}>
            <label htmlFor={'email'}>Email</label>
            <br/>
            <input
                type="email"
                name={'email'}
                id='email'
                value={email}
                required={true}
                onChange={onChangeEmailValue}
            />
            <br/>

            <label htmlFor={'password'}>Mot de passe</label>
            <br/>
            <input
                type="password"
                name={'password'}
                id='password'
                value={password}
                required={true}
                onChange={onChangePasswordValue}
            />
            <br/>

            {
                connectionError && (
                    <>
                        <div className="error">{connectionError}</div>
                    </>
                )
            }
            <br/>

            <input type="submit" value="Se connecter" />
        </form>
    );
};

export default SignInForm;