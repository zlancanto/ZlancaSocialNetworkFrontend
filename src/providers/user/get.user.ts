import axios from "axios";
import {API_USER_BY_ID} from "../../vars/api";
import AxiosXHR = Axios.AxiosXHR;
import {IUserEntity} from "../../structures/entities/IUser.entity";

export const getUser = async (uid: string) => {
    try {
        const res: AxiosXHR<IUserEntity> = await axios({
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