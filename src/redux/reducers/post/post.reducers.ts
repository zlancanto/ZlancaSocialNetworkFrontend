import {IPostState} from "../../../structures/states/IPost.state";
import {PayloadAction} from "@reduxjs/toolkit";
import {IPostEntity} from "../../../structures/entities/IPost.entity";

export const setPostList = (currentState: IPostState, action: PayloadAction<Array<IPostEntity>>)=> {
    currentState.postList = action.payload;
};