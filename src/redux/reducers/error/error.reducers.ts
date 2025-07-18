import {IErrorState} from "../../../structures/states/IError.state";
import {PayloadAction} from "@reduxjs/toolkit";
import {IUploadFileError} from "../../../structures/errors/IUploadFileError";

export const addUploadFileError = (currentState: IErrorState, action: PayloadAction<IUploadFileError>) => {
    currentState.uploadFile = action.payload;
}

export const resetUploadFileError = (currentState: IErrorState) => {
    currentState.uploadFile = {
        notFile: '',
        invalidFile: '',
        maxSizeFile: '',
        user: '',
        other: ''
    }
}