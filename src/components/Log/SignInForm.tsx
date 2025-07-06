import React, {FunctionComponent, useState} from 'react';

const SignInForm: FunctionComponent = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onChangeEmailValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setEmail(e.target.value);
    }

    const onChangePasswordValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();
        setPassword(e.target.value);
    }

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    }

    return (
        <form onSubmit={onSubmit} id={'sign-in-form'}>
            <label htmlFor={'email'}>Email</label>
            <br/>
            <input
                type="email"
                name={'email'}
                id='email'
                value={email}
                onChange={onChangeEmailValue}
            />
            <div className={'email error'}></div>
            <br/>

            <label htmlFor={'password'}>Mot de passe</label>
            <br/>
            <input
                type="password"
                name={'password'}
                id='password'
                value={password}
                onChange={onChangePasswordValue}
            />
            <div className="password error"></div>
            <br/>

            <input type="submit" value="Se connecter" />
        </form>
    );
};

export default SignInForm;