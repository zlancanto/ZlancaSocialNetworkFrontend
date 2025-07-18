import axios, {AxiosResponse} from "axios";
import {IPostEntity} from "../../structures/entities/IPost.entity";
import {API_POST_ALL} from "../../vars/api";

export const getPostList = async () => {
    try {
        const res: AxiosResponse<Array<IPostEntity>> = await axios({
            method: 'GET',
            url: API_POST_ALL,
            withCredentials: true
        })

        return res.data;
    }
    catch (err) {
        console.error('GetPostListError : ', err);
        throw err;
    }
};