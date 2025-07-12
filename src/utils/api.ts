import axios, {AxiosResponse} from "axios";
import {API_JWT} from "../vars/api";
import {Dispatch, SetStateAction} from "react";

export const fetchToken = async (setUid: Dispatch<SetStateAction<string | null>>) => {
    try {
        const response: AxiosResponse<string> = await axios({
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