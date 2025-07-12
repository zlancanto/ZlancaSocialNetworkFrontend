import axios, {AxiosResponse} from "axios";
import {API_USER_ALL} from "../../vars/api";
import {IUserEntity} from "../../structures/entities/IUser.entity";

export const getUserList = async () => {
    try {
        const res: AxiosResponse<Array<IUserEntity>> = await axios({
            method: 'GET',
            url: API_USER_ALL,
            withCredentials: true,
        })

        return res.data;
    }
    catch (err) {
        console.error('GetUserListError : ', err);
    }
};