import {IPostEntity} from "../../../structures/entities/IPost.entity";
import {createSlice} from "@reduxjs/toolkit";
import * as postReducers from "./post.reducers";

const postList: Array<IPostEntity> = [];

export const postSlice = createSlice({
    name: 'post',
    initialState: {
        postList: postList,
    },
    reducers: postReducers,
})