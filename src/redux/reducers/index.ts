import {combineSlices} from "@reduxjs/toolkit";
import {userSlice} from "./user/user.slice";
import {postSlice} from "./post/post.slice";

export const rootReducer = combineSlices(userSlice, postSlice)