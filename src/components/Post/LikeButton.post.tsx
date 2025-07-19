import React, {FunctionComponent, useEffect, useState} from 'react';
import {IPostEntity} from "../../structures/entities/IPost.entity";
import {useDispatch, useSelector} from "react-redux";
import {getUserConnected} from "../../redux/reducers/user/user.getters";
import Popup from "reactjs-popup";
import {likePost as likePostProvider} from "../../providers/post/like.post";
import {unlikePost as unlikePostProvider} from "../../providers/post/unlike.post";
import {IUserEntity} from "../../structures/entities/IUser.entity";
import {setUserConnected} from "../../redux/reducers/user/user.setters";
import {likePost, unlikePost} from "../../redux/reducers/post/post.setters";

interface Props {
    post: IPostEntity;
}

const LikeButtonPost: FunctionComponent<Props> = ({post}) => {
    // States
    const [liked, setLiked] = useState(false);

    // Selector and Dispatch
    const userConnected = useSelector(getUserConnected);
    const dispatch = useDispatch();

    const likeHandler = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        if (userConnected) {
            likePostProvider(post._id, userConnected._id)
                .then((user: IUserEntity) => {
                    dispatch(setUserConnected(user));
                    dispatch(likePost({
                        postId: post._id,
                        likerId: userConnected._id
                    }))
                    setLiked(true);
                })
        }
    };

    const unlikeHandler = (e: React.MouseEvent<HTMLImageElement>) => {
        e.preventDefault();
        if (userConnected) {
            unlikePostProvider(post._id, userConnected._id)
                .then((user: IUserEntity) => {
                    dispatch(setUserConnected(user));
                    dispatch(unlikePost({
                        postId: post._id,
                        unlikerId: userConnected._id
                    }))
                    setLiked(false);
                })
        }
    };

    useEffect(() => {
        if (userConnected && post.likers.includes(userConnected._id)) {
            setLiked(true);
        }
    }, [userConnected, post.likers, liked]);

    return (
        <div className="like-container">
            {
                userConnected ? (
                    liked
                        ? <img src="/img/icons/heart-filled.svg" alt="Unlike" onClick={unlikeHandler}/>
                        : <img src="/img/icons/heart.svg" alt="Like" onClick={likeHandler}/>
                ) : (
                    <Popup
                        trigger={<img src="/img/icons/heart.svg" alt="Like"/>}
                        position={['left center']}
                        closeOnDocumentClick={true}
                    >
                        Connectez-vous pour liker un post
                    </Popup>
                )
            }

            <span>{post.likers.length}</span>
        </div>
    );
};

export default LikeButtonPost;