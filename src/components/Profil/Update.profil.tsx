import React, {FunctionComponent, useState} from 'react';
import LeftNav from "../LeftNav";
import {useDispatch, useSelector} from "react-redux";
import {getUserConnected} from "../../redux/reducers/user/user.getters";
import {IUserEntity} from "../../structures/entities/IUser.entity";
import UploadImgProfil from "./UploadImg.profil";
import {updateUser} from "../../providers/user/update.user";
import {setUserConnected} from "../../redux/reducers/user/user.setters";
import {formatLikeDayMonthYearHour} from "../../utils/date";
import FollowingPopupProfil from "./FollowingPopup.profil";
import FollowersPopupProfil from "./FollowersPopup.profil";

const UpdateProfil: FunctionComponent = () => {
    // States
    const [bio, setBio] = useState('');
    const [updateForm, setUpdateForm] = useState(false);
    const [followingPopup, setFollowingPopup] = useState(false);
    const [followersPopup, setFollowersPopup] = useState(false);

    // Selector and Dispatch
    const userConnected: IUserEntity | undefined = useSelector(getUserConnected);
    const dispatch = useDispatch();

    const onUpdateBio = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const userUpdated: IUserEntity = {...userConnected} as IUserEntity;
        userUpdated.bio = bio;
        updateUser(userUpdated).then(user => {
            dispatch(setUserConnected(user));
            setUpdateForm(false);
        });
    };

    const onLookatFollowing = (e: React.MouseEvent<HTMLHeadingElement>) => {
        e.preventDefault();
        setFollowingPopup(true);
    };

    const onLookatFollowers = (e: React.MouseEvent<HTMLHeadingElement>) => {
        e.preventDefault();
        setFollowersPopup(true);
    };

    return (
        <>
            {
                userConnected
                    ? (
                        <div className="profil-container">
                            <LeftNav/>
                            <h1>Profil de {userConnected.pseudo}</h1>
                            <div className="update-container">
                                {/* Left */}
                                <div className="left-part">
                                    <h3>Photo de profil</h3>
                                    <img src={`${userConnected.picture}?v=${userConnected.updatedAt}`} alt="UserPicture"/>
                                    <UploadImgProfil/>
                                </div>

                                {/* Right */}
                                <div className="right-part">
                                    {/* Bio */}
                                    <div className="bio-update">
                                        <h3>Bio</h3>
                                        {
                                            !updateForm && (
                                                <>
                                                    <p onClick={() => setUpdateForm(!updateForm)}> {userConnected.bio} </p>
                                                    <button onClick={() => setUpdateForm(!updateForm)}> Modifier Bio </button>
                                                </>
                                            )
                                        }
                                        {
                                            updateForm && (
                                                <>
                                                    <textarea
                                                        defaultValue={userConnected.bio}
                                                        onChange={e => setBio(e.currentTarget.value)}
                                                    ></textarea>
                                                    <button onClick={onUpdateBio}>Valider les modifications</button>
                                                </>
                                            )
                                        }
                                    </div>

                                    {/* User date creation */}
                                    <h4>Membre depuis le : {formatLikeDayMonthYearHour(userConnected.createdAt)} </h4>
                                    <h5 onClick={onLookatFollowing}>
                                        Abonnements : {userConnected.following.length}
                                    </h5>
                                    <h5 onClick={onLookatFollowers}>
                                        Abonnés : {userConnected.followers.length}
                                    </h5>
                                </div>
                            </div>

                            {
                                /* Following Popup */
                                followingPopup && <FollowingPopupProfil setFollowingPopup={setFollowingPopup}/>
                            }

                            {
                                /* Followers Popup */
                                followersPopup && <FollowersPopupProfil setFollowersPopup={setFollowersPopup}/>
                            }
                        </div>
                    )
                    : <h1>Connexion requise pour l'affichage de la page</h1>
            }
        </>
    );
};

export default UpdateProfil;