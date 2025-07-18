import axios, {AxiosResponse} from "axios";
import {IPostEntity} from "../../structures/entities/IPost.entity";
import {API_POST_UPDATE} from "../../vars/api";

export const updatePost = async (postId: string, message: string) => {
    try {
        const res: AxiosResponse<IPostEntity> = await axios({
            method: 'PUT',
            url: `${API_POST_UPDATE}/${postId}`,
            withCredentials: true,
            data: {message}
        })

        return res.data;
    }
    catch (err) {
        console.error('UpdatePostError : ', err);
        throw err;
    }
};