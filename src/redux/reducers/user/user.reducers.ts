import {IUserEntity} from "../../../structures/entities/IUser.entity";
import {PayloadAction} from "@reduxjs/toolkit";
import {IUserState} from "../../../structures/states/IUser.state";

export const setUserConnected = (currentState: IUserState, action: PayloadAction<IUserEntity | undefined>) => {
    currentState.userConnected = action.payload
}

export const setUserList = (currentState: IUserState, action: PayloadAction<Array<IUserEntity>>) => {
    currentState.userList = action.payload
}

export const addUser = (currentState: IUserState, action: PayloadAction<IUserEntity>) => {
    currentState.userList = [...currentState.userList, action.payload];
}

export const deleteUser = (currentState: IUserState, action: PayloadAction<IUserEntity>) => {
    const userList = [...currentState.userList];
    currentState.userList = userList.filter((user: IUserEntity) => user._id !== action.payload._id);
}

