import axios, {AxiosResponse} from "axios";
import {API_POST_DELETE} from "../../vars/api";
import {IPostEntity} from "../../structures/entities/IPost.entity";

export const deletePost = async (postId: string) => {
    try {
        const res: AxiosResponse<IPostEntity> = await axios({
            method: "DELETE",
            url: `${API_POST_DELETE}/${postId}`,
            withCredentials: true
        })

        return res.data;
    }
    catch (err) {
        console.error('DeletePostError : ', err);
        throw err;
    }
}