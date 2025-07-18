import {createSlice} from "@reduxjs/toolkit";
import {IErrorState} from "../../../structures/states/IError.state";
import * as errorReducers from "./error.reducers";

const initialState: IErrorState = {
    signUp: {
        pseudo: '',
        email: '',
        password: {
            libelle: '',
            minChar: '',
            majLetter: '',
            minLetter: '',
            specialChar: '',
        },
        other: ''
    },
    signIn: {
        email: '',
        password: '',
        other: ''
    },
    uploadFile: {
        notFile: '',
        invalidFile: '',
        maxSizeFile: '',
        user: '',
        other: ''
    }
}

export const errorSlice = createSlice({
    name: 'error',
    initialState,
    reducers: errorReducers
})