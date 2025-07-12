import axios, {AxiosResponse} from "axios";
import {API_USER_FOLLOW, API_USER_UNFOLLOW} from "../../vars/api";

export const unfollowUser = async (userIdWantUnfollow: string, userIdToUnfollow: string) => {
    try {
        const res: AxiosResponse = await axios({
            method: 'PATCH',
            url: `${API_USER_UNFOLLOW}/${userIdWantUnfollow}`,
            withCredentials: true,
            data:{
                idToUnfollow: userIdToUnfollow
            }
        })

        return res.data;
    }
    catch (err) {
        console.error('UnfollowUserError : ', err);
    }
}