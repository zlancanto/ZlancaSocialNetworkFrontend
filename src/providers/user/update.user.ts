import axios, {AxiosResponse} from "axios";
import {API_USER_BY_ID} from "../../vars/api";
import {IUserEntity} from "../../structures/entities/IUser.entity";

export const updateUser = async (user: IUserEntity) => {
    try {
        const res: AxiosResponse<IUserEntity> = await axios({
            method: 'PUT',
            url: `${API_USER_BY_ID}/${user._id}`,
            withCredentials: true,
            data: user
        });

        return res.data;
    }
    catch (err) {
        console.error('UpdateUserError : ', err);
        throw err;
    }
};