import axios from "axios";
import {API_URL} from "../vars/api";
import AxiosXHR = Axios.AxiosXHR;
import {Dispatch, SetStateAction} from "react";

export const fetchToken = async (setUid: Dispatch<SetStateAction<string | null>>) => {
    try {
        const response: AxiosXHR<string> = await axios({
            method: 'GET',
            url: `${API_URL}jwtId`,
            withCredentials: true,
        });
        /* data = user id */
        setUid(response.data);
    }
    catch (err) {
        console.log("No token")
        console.error(err);
    }
}