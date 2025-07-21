import React, {FunctionComponent, useEffect, useState} from 'react';
import {IUserEntity} from "../../structures/entities/IUser.entity";
import {useSelector} from "react-redux";
import {getUserConnected, getUserList} from "../../redux/reducers/user/user.getters";
import FollowHandler from "./FollowHandler";

const FriendsHint: FunctionComponent = () => {
    // State
    const [isLoading, setIsLoading] = useState(true);
    const [playOnce, setPlayOnce] = useState(true);
    const [friendListHint, setFriendListHint] = useState<Array<IUserEntity>>([]);

    // Selectors
    const userConnected = useSelector(getUserConnected);
    const userList = useSelector(getUserList);

    useEffect(() => {
        if (playOnce && userConnected && userList.length > 0) {
            notFriendList();
            setIsLoading(false);
            setPlayOnce(false);
        }
    }, [userConnected, userList]);

    const notFriendList = () => {
        if (!userConnected) {
            return;
        }
        let friendListSuggestion: Array<IUserEntity> = [];
        userList.map((user: IUserEntity) => {
            if (
                userConnected._id !== user._id &&
                !userConnected.following.includes(user._id)
            ) {
                friendListSuggestion.push(user)
            }
        })
        friendListSuggestion.sort(() => 0.5 - Math.random());

        if (window.innerHeight > 780) {
            friendListSuggestion = friendListSuggestion.slice(0, 5);
        } else if (window.innerHeight > 720) {
            friendListSuggestion = friendListSuggestion.slice(0, 4);
        } else if (window.innerHeight > 615) {
            friendListSuggestion = friendListSuggestion.slice(0, 3);
        } else if (window.innerHeight > 540) {
            friendListSuggestion = friendListSuggestion.slice(0, 1);
        } else {
            friendListSuggestion = [];
        }
        setFriendListHint(friendListSuggestion);
    }

    return (
        <>
            {
                friendListHint.length > 0 && (
                    <div className="get-friends-container">

                        <>
                            <h4>Suggestions</h4>
                            {
                                isLoading
                                    ? (
                                        <div className="icon">
                                            <i className="fas fa-spinner fa-pulse"></i>
                                        </div>
                                    )
                                    : (
                                        <ul>
                                            {
                                                friendListHint.map((user: IUserEntity) => (
                                                    <li className="user-hint">
                                                        <img src={user.picture} alt="UserImage"/>
                                                        <p>{user.pseudo}</p>
                                                        <FollowHandler idToFollow={user._id} type={'suggestion'}/>
                                                    </li>
                                                ))
                                            }
                                        </ul>
                                    )
                            }
                        </>
                    </div>
                )
            }
        </>
    );
};

export default FriendsHint;