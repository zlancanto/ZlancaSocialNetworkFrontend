import {IUserEntity} from "../entities/IUser.entity";

export interface IUserState {
    userConnected: IUserEntity | undefined;
    userList: Array<IUserEntity>;
}