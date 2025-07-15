import axios, {AxiosResponse} from "axios";
import {API_COMMENT_CREATE} from "../../vars/api";
import {IPostEntity} from "../../structures/entities/IPost.entity";

export const createComment = async (postId: string, commenterId: string, comment: string) => {
    try {
        const res: AxiosResponse<IPostEntity> = await axios({
            method: 'PATCH',
            url: `${API_COMMENT_CREATE}/${postId}`,
            withCredentials: true,
            data: {
                commenterId,
                text: comment
            }
        })

        return res.data;
    }
    catch (err) {
        console.error('CreateCommentError : ', err);
        throw err;
    }
};