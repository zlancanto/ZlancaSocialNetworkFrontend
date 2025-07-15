import React, {FunctionComponent, useEffect, useState} from 'react';
import {IComment} from "../../../structures/IComment";
import {useDispatch, useSelector} from "react-redux";
import {getUserConnected} from "../../../redux/reducers/user/user.getters";
import {IUserEntity} from "../../../structures/entities/IUser.entity";
import {editComment} from "../../../providers/comments/edit.comment";
import {IPostEntity} from "../../../structures/entities/IPost.entity";
import {setPost} from "../../../redux/reducers/post/post.setters";
import {deleteComment} from "../../../providers/comments/delete.comment";
import {toast} from "react-toastify";

interface Props {
    comment: IComment;
    postId: string;
}

const EditDeleteCommentPost: FunctionComponent<Props> = ({comment, postId}) => {
    // States
    const [isAuthor, setIsAuthor] = useState(false);
    const [edit, setEdit] = useState(false);
    const [textEdit, setTextEdit] = useState<string>()

    // Dispatch and Selector
    const dispatch = useDispatch();
    const userConnected: IUserEntity | undefined = useSelector(getUserConnected);

    const handleEdit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userConnected || !textEdit) {
            return;
        }
        editComment(postId, comment._id, textEdit)
            .then((post: IPostEntity | undefined) => {
                if (post) {
                    dispatch(setPost(post));
                    setTextEdit(undefined);
                    setEdit(false);
                    toast.success('Commentaire modifié');
                }
            })
            .catch(err => toast.error(err.message))
    };

    const handleDelete = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.preventDefault();
        if (!userConnected) { return; }
        if (window.confirm('Voulez-vous supprimer ce commentaire ?')) {
            deleteComment(postId, comment._id)
                .then((post: IPostEntity | undefined) => {
                    if (post) {
                        dispatch(setPost(post));
                        toast.success('Commentaire supprimé');
                    }
                })
                .catch(err => toast.error(err.message))
        }
    };

    useEffect(() => {
        if (userConnected?._id === comment.commenterId) {
            setIsAuthor(true)
        }
    }, [comment.commenterId, userConnected?._id]);

    return (
        <div className="edit-comment">
            {
                /* Delete button */
                isAuthor && (
                    <span onClick={handleDelete}>
                        <img src="/img/icons/trash.svg" alt="DeleteCommentIcon"/>
                    </span>
                )
            }

            {
                /* Edit button */
                (isAuthor && !edit) && (
                    <span onClick={() => setEdit(!edit)}>
                        <img src="/img/icons/edit.svg" alt="EditCommentIcon"/>
                    </span>
                )
            }

            {
                /* Edit Form */
                (isAuthor && edit) && (
                    <form onSubmit={handleEdit} className="edit-comment-form">
                        <label onClick={() => setEdit(!edit)}> Annuler </label>
                        <br/>
                        <input
                            type="text"
                            name="textComment"
                            value={textEdit}
                            defaultValue={comment.text}
                            onChange={e => setTextEdit(e.currentTarget.value)}
                        />
                        <input type="submit"/>
                    </form>
                )
            }
        </div>
    );
};

export default EditDeleteCommentPost;