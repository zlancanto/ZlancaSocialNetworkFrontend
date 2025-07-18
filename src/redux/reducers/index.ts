import {combineSlices} from "@reduxjs/toolkit";
import {userSlice} from "./user/user.slice";
import {postSlice} from "./post/post.slice";
import {errorSlice} from "./error/error.slice";

export const rootReducer = combineSlices(userSlice, postSlice, errorSlice)