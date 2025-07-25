import React, {FunctionComponent, useEffect, useState} from 'react';
import {IPostEntity} from "../../structures/entities/IPost.entity";
import {useDispatch, useSelector} from "react-redux";
import {getUserConnected, getUserList} from "../../redux/reducers/user/user.getters";
import {IUserEntity} from "../../structures/entities/IUser.entity";
import {formatLikeDayMonthYearHour} from "../../utils/date";
import FollowHandler from "../Profil/FollowHandler";
import LikeButtonPost from "./LikeButton.post";
import {updatePost as updatePostApi} from "../../providers/post/update.post";
import {updatePost} from "../../redux/reducers/post/post.setters";
import DeletePost from "./Delete.post";
import CommentPost from "./Comment/Comment.post";

interface Props {
    post: IPostEntity;
}

const CardPost: FunctionComponent<Props> = ({post}) => {
    // States
    const [isLoading, setIsLoading] = useState(true);
    const [isUpdated, setIsUpdated] = useState(false);
    const [showCommentList, setShwoCommentList] = useState(false);
    const [textUpdate, setTextUpdate] = useState<string>();
    const [posterUser, setPosterUser] = useState<IUserEntity>();

    // Selectors and Dispatch
    const userConnected = useSelector(getUserConnected);
    const userList = useSelector(getUserList);
    const dispatch = useDispatch();

    useEffect(() => {
        if (userList) {
            setIsLoading(false)
        }
        const posterList = userList.filter(user => user._id === post.posterId);
        setPosterUser(posterList[0]);
    }, [userList]);

    const handlerUpdatePost = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        if (textUpdate) {
            updatePostApi(post._id, textUpdate)
                .then(postUpdated => {
                    if (postUpdated) {
                        dispatch(updatePost(postUpdated));
                    }
                })
                .finally(() => setIsUpdated(false))
        }
    };

    return (
        <>
            {
                posterUser && (
                    <li className="card-container" key={post._id}>
                        {
                            isLoading
                                ? (<i className="fas fa-spinner fa-spin"></i>)
                                : (
                                    <>
                                        <div className="card-left">
                                            <img src={posterUser.picture} alt="PosterImg"/>
                                        </div>
                                        <div className="card-right">
                                            <div className="card-header">
                                                <div className="pseudo">
                                                    <h3>{posterUser.pseudo}</h3>
                                                    {
                                                        userConnected?._id !== post.posterId
                                                        && <FollowHandler idToFollow={post.posterId} type={'card'}/>
                                                    }
                                                </div>
                                                <span>{formatLikeDayMonthYearHour(post.createdAt)}</span>
                                            </div>

                                            {
                                                isUpdated
                                                    ? (
                                                        <div className="update-post">
                                                            <textarea
                                                                defaultValue={post.message}
                                                                onChange={e => setTextUpdate(e.currentTarget.value)}
                                                            />
                                                            <div className="button-container">
                                                                <button
                                                                    className="btn"
                                                                    onClick={handlerUpdatePost}
                                                                >
                                                                    Valider
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                                    : <p>{post.message}</p>
                                            }

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

                                            {
                                                (userConnected?._id === post.posterId) && (
                                                    <div className="button-container">
                                                        {/* Update */}
                                                        <div onClick={() => setIsUpdated(!isUpdated)}>
                                                            <img src="/img/icons/edit.svg" alt="EditPostIcon"/>
                                                        </div>

                                                        {/* Delete */}
                                                        <DeletePost postId={post._id}/>
                                                    </div>
                                                )
                                            }

                                            <div className="card-footer">
                                                <div className="comment-icon">
                                                    <img
                                                        src="/img/icons/message1.svg"
                                                        alt="Comment"
                                                        onClick={() => setShwoCommentList(!showCommentList)}
                                                    />
                                                    <span>{post.comments.length}</span>
                                                </div>
                                                <LikeButtonPost post={post}/>
                                                <img src="/img/icons/share.svg" alt="Share"/>
                                            </div>

                                            {
                                                /* Comments */
                                                showCommentList && <CommentPost post={post}/>
                                            }
                                        </div>
                                    </>

                                )
                        }
                    </li>
                )
            }
        </>
    );
};

export default CardPost;