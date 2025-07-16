import axios, {AxiosResponse} from "axios";
import {API_POST_CREATE} from "../../vars/api";
import {IPostEntity} from "../../structures/entities/IPost.entity";

export const createPost = async (data: FormData) => {
    try {
        const res: AxiosResponse<IPostEntity> = await axios({
            method: "POST",
            url: API_POST_CREATE,
            withCredentials: true,
            data
        })

        return res.data;
    }
    catch (err) {
        console.error('CreatePostError : ', err);
        throw err;
    }
}