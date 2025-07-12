import axios from "axios";
import {API_JWT} from "../vars/api";
import AxiosXHR = Axios.AxiosXHR;
import {Dispatch, SetStateAction} from "react";
import {getUser} from "../providers/user/get.user";
import {setUserConnected} from "../redux/reducers/user/user.setters";
import {IUserEntity} from "../structures/entities/IUser.entity";

export const fetchToken = async (setUid: Dispatch<SetStateAction<string | null>>) => {
    try {
        const response: AxiosXHR<string> = await axios({
            method: 'GET',
            url: API_JWT,
            withCredentials: true,
        });
        /* data = user id */
        const uid: string | null = response.data
        setUid(uid);

    } catch (err) {
        console.log("No token");
        console.error(err);
    }
}