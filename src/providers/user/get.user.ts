import axios, {AxiosResponse} from "axios";
import {API_USER_BY_ID} from "../../vars/api";
import {IUserEntity} from "../../structures/entities/IUser.entity";

export const getUser = async (uid: string) => {
    try {
        const res: AxiosResponse<IUserEntity> = await axios({
            method: 'GET',
            url: `${API_USER_BY_ID}/${uid}`,
            withCredentials: true
        })

        return res.data
    }
    catch (err) {
        console.error(err)
    }
}