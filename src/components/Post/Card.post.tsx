import React, {FunctionComponent, useEffect, useState} from 'react';
import {IPostEntity} from "../../structures/entities/IPost.entity";
import {useSelector} from "react-redux";
import {getUserConnected, getUserList} from "../../redux/reducers/user/user.getters";
import {getPostList} from "../../redux/reducers/post/post.getters";
import {IUserEntity} from "../../structures/entities/IUser.entity";
import {formatLikeDayMonthYearHour} from "../../utils/date";
import FollowHandler from "../Profil/FollowHandler";
import LikeButtonPost from "./LikeButton.post";

interface Props {
    post: IPostEntity;
}

const CardPost: FunctionComponent<Props> = ({post}) => {
    // States
    const [isLoading, setIsLoading] = useState(true);
    const [posterUser, setPosterUser] = useState<IUserEntity>()

    // Selectors
    const userConnected = useSelector(getUserConnected);
    const userList = useSelector(getUserList);
    //const postList = useSelector(getPostList);

    useEffect(() => {
        if (userList) { setIsLoading(false) }
        const posterList = userList.filter(user => user._id === post.posterId);
        setPosterUser(posterList[0]);
    }, [userList]);

    return (
        <li className="card-container" key={post._id}>
            {
                isLoading
                    ? (<i className="fas fa-spinner fa-spin"></i>)
                    : (
                        <>
                            {
                                posterUser && (
                                    <>
                                        <div className="card-left">
                                            <img src={posterUser.picture} alt="PosterImg"/>
                                        </div>
                                        <div className="card-right">
                                            <div className="card-header">
                                                <div className="pseudo">
                                                    <h3>{posterUser.pseudo}</h3>
                                                    {
                                                        userConnected
                                                        && userConnected._id !== post.posterId
                                                        && <FollowHandler idToFollow={post.posterId} type={'card'}/>
                                                    }
                                                </div>
                                                <span>{formatLikeDayMonthYearHour(post.createdAt)}</span>
                                            </div>
                                            <p>{post.message}</p>
                                            {
                                                /* Picture */
                                                post.picture && <img src={post.picture} alt="PostPicture" className="card-pic"/>
                                            }

                                            {
                                                /* Video */
                                                post.video && (
                                                    <iframe
                                                        width={500}
                                                        height={300}
                                                        src={post.video}
                                                        frameBorder={0}
                                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                        allowFullScreen={true}
                                                    ></iframe>
                                                )
                                            }
                                            <div className="card-footer">
                                                <div className="comment-icon">
                                                    <img src="/img/icons/message1.svg" alt="Comment"/>
                                                    <span>{post.comments.length}</span>
                                                </div>
                                                <LikeButtonPost post={post}/>
                                                <img src="/img/icons/share.svg" alt="Share"/>
                                            </div>
                                        </div>
                                    </>
                                )
                            }

                        </>
                    )
            }
        </li>
    );
};

export default CardPost;