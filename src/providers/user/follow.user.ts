import axios, {AxiosResponse} from "axios";
import {API_USER_FOLLOW} from "../../vars/api";

export const followUser = async (userIdWantFollow: string, userIdToFollow: string) => {
    try {
        const res: AxiosResponse = await axios({
            method: 'PATCH',
            url: `${API_USER_FOLLOW}/${userIdWantFollow}`,
            withCredentials: true,
            data:{
                idToFollow: userIdToFollow
            }
        })

        return res.data;
    }
    catch (err) {
        console.error('FollowUserError : ', err);
        throw err;
    }
}