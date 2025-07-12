import React, {FunctionComponent, useContext} from 'react';
import Log from '../components/Log'
import {UidContext} from "../components/AppContext";
import UpdateProfil from "../components/Profil/Update.profil";

const Profil: FunctionComponent = () => {

    const uid = useContext(UidContext);
    return (
        <div className={'profil-page'}>
            {
                uid ?
                    (<UpdateProfil/>)
                    : (
                        <div className={'log-container'}>
                            <Log signin={true} signup={false}/>
                            <div className="img-container">
                                <img src="/img/log.svg" alt="log-img"/>
                            </div>
                        </div>
                    )
            }
        </div>
    );
};

export default Profil;