import React, {FunctionComponent} from 'react';
import Log from '../components/Log'

const Profil: FunctionComponent = () => {
    return (
        <div className={'profil-page'}>
            <div className={'log-container'}>
                <Log signin={false} signup={true}/>
                <div className="img-container">
                    <img src="./img/log.svg" alt="log-img"/>
                </div>
            </div>
        </div>
    );
};

export default Profil;