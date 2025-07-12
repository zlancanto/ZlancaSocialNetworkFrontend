import {combineSlices} from "@reduxjs/toolkit";
import {userSlice} from "./user/user.slice";

export const rootReducer = combineSlices(userSlice)