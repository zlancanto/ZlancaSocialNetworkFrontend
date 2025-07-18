import {ISignUpError} from "../errors/ISignUpError";
import {ISignInError} from "../errors/ISignInError";
import {IUploadFileError} from "../errors/IUploadFileError";

export interface IErrorState {
    signUp: ISignUpError;
    signIn: ISignInError;
    uploadFile: IUploadFileError;
}