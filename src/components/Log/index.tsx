import React, {FunctionComponent, useState} from 'react';
import SignInForm from "./SignInForm";
import SignUpForm from "./SignUpForm";

interface Props {
    signin: boolean;
    signup: boolean;
}

const Index: FunctionComponent<Props> = ({ signin, signup }) => {
    const [signInModal, setSignInModal] = useState(signin);
    const [signUpModal, setSignUpModal] = useState(signup);

    const onSignIn = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        setSignInModal(true);
        setSignUpModal(false);
    }

    const onSignUp = (e: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        e.preventDefault();
        setSignUpModal(true);
        setSignInModal(false);
    }

    return (
        <div className="connection-form">
            <div className="form-container">
                <ul>
                    <li
                        className={signInModal ? 'active-btn': ''}
                        onClick={onSignIn}>
                        Se connecter
                    </li>
                    <li className={signUpModal ? 'active-btn': ''}
                        onClick={onSignUp}>
                        S'inscrire
                    </li>
                </ul>
                {
                    signInModal
                        ? <SignInForm/>
                        : <SignUpForm/>
                }
            </div>
        </div>
    );
};

export default Index;