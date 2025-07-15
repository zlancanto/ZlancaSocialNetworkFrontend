import React, {FunctionComponent, useState} from 'react';
import {IComment} from "../../../structures/IComment";
import {useDispatch, useSelector} from "react-redux";
import {getUserConnected, getUserList} from "../../../redux/reducers/user/user.getters";
import {IUserEntity} from "../../../structures/entities/IUser.entity";
import FollowHandler from "../../Profil/FollowHandler";
import {formatLikeDayMonthYearHour} from "../../../utils/date";
import {createComment} from "../../../providers/comments/create.comment";
import {IPostEntity} from "../../../structures/entities/IPost.entity";
import {setPost} from "../../../redux/reducers/post/post.setters";
import EditDeleteCommentPost from "./EditDeleteComment.post";
import {toast} from "react-toastify";

interface Props {
    post: IPostEntity;
}

const CommentPost: FunctionComponent<Props> = ({post}) => {
    // States
    const [textComment, setTextComment] = useState<string>();

    // Dispatch and Selector
    const dispatch = useDispatch();
    const userConnectd: IUserEntity | undefined = useSelector(getUserConnected);
    const userList = useSelector(getUserList);

    const getCommenter = (commenterId: string) => {
        return  userList.find((user: IUserEntity) => user._id === commenterId)!;
    };

    const handleComment = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userConnectd || !textComment) { return; }
        createComment(post._id, userConnectd._id, textComment)
            .then((post: IPostEntity | undefined) => {
                if (post) {
                    dispatch(setPost(post))
                }
                setTextComment('');
                toast.success('Commentaire ajouté');
            })
            .catch(err => toast.error(err.message))
    };

    return (
        <div className="comments-container">
            {
                /* Comment Form */
                userConnectd && (
                    <form
                        onSubmit={handleComment}
                        className="comment-form"
                    >
                        <input
                            type="text"
                            name="textComment"
                            value={textComment}
                            placeholder="Laisser un commentaire"
                            onChange={e => setTextComment(e.currentTarget.value)}
                        />
                        <br/>

                        <input type="submit" value="Envoyer"/>
                        <br/>
                        <br/>
                        <br/>
                    </form>
                )
            }

            {
                /* Comment List */
                post.comments.map((comment: IComment) => {
                    const commenter = getCommenter(comment.commenterId);
                    return <div
                        key={comment._id}
                        className={
                            comment.commenterId === userConnectd?._id
                                ? 'comment-container client'
                                : 'comment-container'
                        }>
                        <div className="left-part">
                            <img src={commenter.picture} alt="CommenterImage"/>
                        </div>
                        <div className="right-part">
                            <div className="comment-header">
                                <div className="pseudo">
                                    <h3>{commenter.pseudo}</h3>
                                    {
                                        comment.commenterId !== userConnectd?._id && (
                                            <FollowHandler idToFollow={comment.commenterId} type={'card'}/>
                                        )
                                    }
                                </div>
                                <span>{formatLikeDayMonthYearHour(comment.timestamp)}</span>
                            </div>
                            <p>{comment.text}</p>
                            <EditDeleteCommentPost comment={comment} postId={post._id}/>
                        </div>
                    </div>
                })
            }
        </div>
    );
};

export default CommentPost;