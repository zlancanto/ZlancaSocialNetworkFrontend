import {RootState} from "../../index";
import {IUserEntity} from "../../../structures/entities/IUser.entity";

export const getUserConnected = (state: RootState): IUserEntity | undefined => state.user.userConnected

export const getUserList = (state: RootState): Array<IUserEntity> => state.user.userList

/*
* export const getUserById =
    (userId: string) => (state: RootState) =>
        getUserList(state).find((user: IUserEntity) => user._id === userId)
* */