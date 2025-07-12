import {createSlice} from "@reduxjs/toolkit";
import * as userReducers from "./user.reducers"
import {IUserEntity} from "../../../structures/entities/IUser.entity";

const userList: Array<IUserEntity> = [];

export const userSlice = createSlice({
    name: 'user',
    initialState: {
        userConnected: undefined,
        userList: userList,
    },
    reducers: userReducers
})