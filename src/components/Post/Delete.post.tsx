import React, {FunctionComponent} from 'react';
import {deletePost as deletePostApi} from "../../providers/post/delete.post";
import {deletePost} from "../../redux/reducers/post/post.setters";
import {useDispatch} from "react-redux";
import {IPostEntity} from "../../structures/entities/IPost.entity";

interface Props {
    postId: string
}

const DeletePost: FunctionComponent<Props> = ({postId}) => {
    const dispatch = useDispatch();

    const handlerDeletePost = (e: React.MouseEvent<HTMLDivElement>) => {
        e.preventDefault();
        if (window.confirm('Voulez-vous supprimer ce post ?')) {
            deletePostApi(postId)
                .then((postDeleted: IPostEntity | undefined) => {
                    if (postDeleted) {
                        dispatch(deletePost(postDeleted._id));
                    }
                })
        }
    };

    return (
        <div onClick={handlerDeletePost}>
            <img src="/img/icons/trash.svg" alt="DeletePostIcon"/>
        </div>
    );
};

export default DeletePost;