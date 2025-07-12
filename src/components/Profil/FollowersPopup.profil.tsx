import React, {FunctionComponent} from 'react';
import {useSelector} from "react-redux";
import {getUserConnected, getUserList} from "../../redux/reducers/user/user.getters";
import {IUserEntity} from "../../structures/entities/IUser.entity";
import FollowHandler from "./FollowHandler";

interface Props {
    setFollowersPopup: React.Dispatch<React.SetStateAction<boolean>>;
}

const FollowersPopupProfil: FunctionComponent<Props> = ({setFollowersPopup}) => {
    const userConnected = useSelector(getUserConnected)!;
    const userList = useSelector(getUserList);

    return (
        <div className="popup-profil-container">
            <div className="modal">
                <h3>Abonnés</h3>
                <span
                    className="cross"
                    onClick={() => setFollowersPopup(false)}
                >
                    &#10005;
                </span>
                <ul>
                    {
                        userConnected.followers.map((followerId: string) =>
                            userList.filter((user: IUserEntity) =>
                                followerId === user._id).map((follower: IUserEntity) => (
                                <li key={follower._id}>
                                    <img src={follower.picture} alt="FollowerPicture"/>
                                    <h4>{follower.pseudo}</h4>
                                    <div className="follow-handler">
                                        <FollowHandler idToFollow={follower._id}/>
                                    </div>
                                </li>
                            )))
                    }
                </ul>
            </div>
        </div>
    );
};

export default FollowersPopupProfil;