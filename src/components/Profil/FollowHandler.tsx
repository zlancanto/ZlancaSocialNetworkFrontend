import React, {FunctionComponent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserConnected} from "../../redux/reducers/user/user.getters";
import {followUser} from "../../providers/user/follow.user";
import {IUserEntity} from "../../structures/entities/IUser.entity";
import {setUserConnected} from "../../redux/reducers/user/user.setters";
import {unfollowUser} from "../../providers/user/unfollow.user";

interface Props {
    idToFollow: string;
}

const FollowHandler: FunctionComponent<Props> = ({idToFollow}) => {
    // States
    const [isFollowed, setIsFollowed] = useState(false);

    // Selector
    const userConnected = useSelector(getUserConnected)!;
    const dispatch = useDispatch();

    const handleFollow = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        followUser(userConnected._id, idToFollow).then((user: IUserEntity) => dispatch(setUserConnected(user)))
        setIsFollowed(true);
    };

    const handleUnFollow = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        unfollowUser(userConnected._id, idToFollow).then((user: IUserEntity) => dispatch(setUserConnected(user)))
        setIsFollowed(false);
    };

    useEffect(() => {
        if (userConnected.following.includes(idToFollow)) {
            setIsFollowed(true);
        } else {
            setIsFollowed(false);
        }
    }, [userConnected, idToFollow]);

    return (
        <>
            {
                isFollowed
                    ? (
                        <span onClick={handleUnFollow}>
                            <button className="unfollow-btn">Abonné</button>
                        </span>
                    )
                    : (
                        <span onClick={handleFollow}>
                            <button className="follow-btn">Suivre</button>
                        </span>
                    )
            }
        </>
    );
};

export default FollowHandler;