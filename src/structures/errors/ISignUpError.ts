import {IPasswordError} from "./IPasswordError";

export interface ISignUpError {
    pseudo: string;
    email: string;
    password: IPasswordError;
    other: string;
}