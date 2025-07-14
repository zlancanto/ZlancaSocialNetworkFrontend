import axios, {AxiosResponse} from "axios";
import {IUserEntity} from "../../structures/entities/IUser.entity";
import {API_POST_UNLIKE} from "../../vars/api";

export const unlikePost = async (postId: string, unlikerId: string) => {
    try {
        const res: AxiosResponse<IUserEntity> = await axios({
            method: 'PATCH',
            url: `${API_POST_UNLIKE}/${postId}`,
            withCredentials: true,
            data: {unlikerId}
        })

        return res.data;
    }
    catch (err) {
        console.error('LikePostError : ', err);
        throw err;
    }
}