import axios, {AxiosResponse} from "axios";
import {API_USER_UPLOAD_PICTURE} from "../../vars/api";
import {IUserEntity} from "../../structures/entities/IUser.entity";

export const postUserPicture = async (data: FormData) => {
    try {
        const res: AxiosResponse<{ message: string, data: IUserEntity }> = await axios.post(API_USER_UPLOAD_PICTURE, data);
        return res.data.data;
    }
    catch (err) {
        console.error('Upload picture error : ', err);
        throw err;
    }
}