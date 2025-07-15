import axios, {AxiosResponse} from "axios";
import {IPostEntity} from "../../structures/entities/IPost.entity";
import {API_COMMENT_EDIT} from "../../vars/api";

export const editComment = async (postId: string, commentId: string, comment: string) => {
    try {
        const res: AxiosResponse<IPostEntity> = await axios({
            method: 'PATCH',
            url: `${API_COMMENT_EDIT}/${postId}`,
            withCredentials: true,
            data: {
                commentId,
                text: comment
            }
        })

        return res.data;
    }
    catch (err) {
        console.error('EditCommentError : ', err);
        throw err;
    }
};