import React, {FunctionComponent, useState} from 'react';
import {API_USER_REGISTER} from "../../vars/api";
import {NavLink} from "react-router-dom";
import axios from "axios";
import {IRegister} from "../../structures/interfaces/IRegister";
import {IPasswordError} from "../../structures/interfaces/IPasswordError";
import SignInForm from "./SignInForm";

const SignUpForm: FunctionComponent = () => {
    /* Attr */
    const [pseudo, setPseudo] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [terms, setTerms] = useState(false);
    const [formSubmitted, setFormSubmitted] = useState(false);

    /* Error */
    const [pseudoError, setPseudoError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState<IPasswordError | undefined>(undefined);
    const [confirmPasswordError, setConfirmPasswordError] = useState('');
    const [termsError, setTermsError] = useState('');

    /* On submit form */
    const onRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        let hasError = false;

        /* Errors : Passwords not match */
        if (password !== confirmPassword) {
            const error = 'Les mots de passe ne correspondent pas';
            setConfirmPasswordError(error);
            hasError = true;
        } else {
            setConfirmPasswordError('');
        }
        /* Terms not checked */
        if (!terms) {
            const error = "Vous devez accepter les conditions d'utilisation";
            setTermsError(error);
            hasError = true;
        } else {
            setTermsError('');
        }

        /* Return if error */
        if (hasError) {
            return;
        }

        try {
            const response = await axios({
                method: 'post',
                url: API_USER_REGISTER,
                withCredentials: true,
                data: {
                    pseudo,
                    email,
                    password,
                }
            });
            setPasswordError(undefined)
            setFormSubmitted(true);
            console.log('response : ', response);
        } catch (err: any) {
            if (err.response.data.errors) {
                const errors: IRegister = err.response.data.errors;
                setPseudoError(errors.pseudo);
                setEmailError(errors.email);
                setPasswordError(errors.password);
            }
            console.error('error : ', err)
        }
    }

    return (
        <>
            {
                formSubmitted
                    ? (
                        <>
                            <SignInForm/>
                            <h4 className="success">Inscription réussie. Veuillez vous connecter</h4>
                        </>
                    )
                    : (
                        <form onSubmit={onRegister} id="sign-up-form">
                            {/* Pseudo */}
                            <label htmlFor="pseudo">Pseudo</label>
                            <br/>
                            <input
                                type="text"
                                id={'pseudo'}
                                value={pseudo}
                                required={true}
                                minLength={3}
                                title="Au moins 3 caractères"
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPseudo(e.target.value)}
                            />
                            <div className="pseudo error">{pseudoError}</div>
                            <br/>

                            {/* Email */}
                            <label htmlFor="email">Email</label>
                            <br/>
                            <input
                                type="email"
                                id={'email'}
                                value={email}
                                required={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            />
                            <div className="email error">{emailError}</div>
                            <br/>

                            {/* Password */}
                            <label htmlFor="password">Mot de passe</label>
                            <br/>
                            <input
                                type="password"
                                id={'password'}
                                value={password}
                                required={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                                onPaste={e => e.preventDefault()}
                                title="Saisissez le mot de passe à la main"
                            />
                            {
                                passwordError && (
                                    <div>
                                        <ul>
                                            <li className="password error">{passwordError.libelle}</li>
                                            <li className="password error">{passwordError.minChar}</li>
                                            <li className="password error">{passwordError.majLetter}</li>
                                            <li className="password error">{passwordError.minLetter}</li>
                                            <li className="password error">{passwordError.specialChar}</li>
                                        </ul>
                                    </div>
                                )
                            }
                            <br/>
                            <br/>

                            {/* Confirm Password */}
                            <label htmlFor="confirmPassword">Confirmer le mot de passe</label>
                            <br/>
                            <input
                                type="password"
                                id={'confirmPassword'}
                                value={confirmPassword}
                                required={true}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setConfirmPassword(e.target.value)}
                                onPaste={e => e.preventDefault()}
                                title="Saisissez le mot de passe à la main"
                            />
                            <div className="confirmPassword error">{confirmPasswordError}</div>
                            <br/>

                            {/* Les conditions d'utilisation */}
                            <input
                                type="checkbox"
                                id="terms"
                                checked={terms}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    setTerms(e.target.checked);
                                    if (terms) {
                                        setTermsError('');
                                    }
                                }}
                            />
                            <label htmlFor="terms">
                                J'accepte les <NavLink to=".">conditions d'utilisation</NavLink>
                            </label>
                            <div className="terms error">{termsError}</div>
                            <br/>

                            {/* Submit */}
                            <input type="submit" value="Valider"/>
                        </form>
                    )
            }
        </>
    );
};

export default SignUpForm;