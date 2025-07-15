import axios, {AxiosResponse} from "axios";
import {IPostEntity} from "../../structures/entities/IPost.entity";
import {API_COMMENT_DELETE} from "../../vars/api";

export const deleteComment = async (postId: string, commentId: string) => {
    try {
        const res: AxiosResponse<IPostEntity> = await axios({
            method: 'PATCH',
            url: `${API_COMMENT_DELETE}/${postId}`,
            withCredentials: true,
            data: {commentId}
        })

        return res.data;
    }
    catch (err) {
        console.error('DeleteCommentError : ', err);
        throw err;
    }
};