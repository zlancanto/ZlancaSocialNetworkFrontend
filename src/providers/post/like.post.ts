import axios, {AxiosResponse} from "axios";
import {API_POST_LIKE} from "../../vars/api";
import {IUserEntity} from "../../structures/entities/IUser.entity";

export const likePost = async (postId: string, likerId: string) => {
    try {
        const res: AxiosResponse<IUserEntity> = await axios({
            method: 'PATCH',
            url: `${API_POST_LIKE}/${postId}`,
            withCredentials: true,
            data: {likerId}
        })

        return res.data;
    }
    catch (err) {
        console.error('LikePostError : ', err);
        throw err;
    }
}