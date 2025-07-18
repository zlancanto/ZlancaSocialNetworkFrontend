import {RootState} from "../../index";
import {IUploadFileError} from "../../../structures/errors/IUploadFileError";
import {ISignInError} from "../../../structures/errors/ISignInError";
import {ISignUpError} from "../../../structures/errors/ISignUpError";

export const getSignUpError = (state: RootState): ISignUpError => state.error.signUp
export const getSignInError = (state: RootState): ISignInError => state.error.signIn
export const getUploadFileError = (state: RootState): IUploadFileError => state.error.uploadFile
