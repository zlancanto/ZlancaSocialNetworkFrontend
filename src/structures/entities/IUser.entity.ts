import {ITimestamps} from "../ITimestamps";

export interface IUserEntity extends ITimestamps {
    _id: string;
    pseudo: string;
    email: string;
    password?: string;
    picture?: string;
    pictureId?: string;
    bio?: string;
    followers: Array<string>;
    following: Array<string>;
    likes: Array<string>;
}