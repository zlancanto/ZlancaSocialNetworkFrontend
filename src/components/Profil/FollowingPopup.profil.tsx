import React, {FunctionComponent} from 'react';
import {IUserEntity} from "../../structures/entities/IUser.entity";
import {useSelector} from "react-redux";
import {getUserConnected, getUserList} from "../../redux/reducers/user/user.getters";
import FollowHandler from "./FollowHandler";

interface Props {
    setFollowingPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowingPopupProfil: FunctionComponent<Props> = ({setFollowingPopup}) => {
    const userConnected = useSelector(getUserConnected)!;
    const userList = useSelector(getUserList);

    return (
        <div className="popup-profil-container">
            <div className="modal">
                <h3>Abonnements</h3>
                <span
                    className="cross"
                    onClick={() => setFollowingPopup(false)}
                >
                    &#10005;
                </span>
                <ul>
                    {
                        userConnected.following.map((followingId: string) =>
                            userList.filter((user: IUserEntity) =>
                                followingId === user._id).map((folling: IUserEntity) => (
                                <li key={folling._id}>
                                    <img src={folling.picture} alt="FollowingPicture"/>
                                    <h4>{folling.pseudo}</h4>
                                    <div className="follow-handler">
                                        <FollowHandler idToFollow={folling._id} type={'suggestion'}/>
                                    </div>
                                </li>
                            )))
                    }
                </ul>
            </div>
        </div>
    );
};

export default FollowingPopupProfil;