import {ITimestamps} from "../ITimestamps";
import {IComment} from "../IComment";

export interface IPostEntity extends ITimestamps {
    _id: string;
    posterId: string;
    message: string;
    picture: string;
    video: string;
    likers: Array<string>;
    comments: Array<IComment>;
}