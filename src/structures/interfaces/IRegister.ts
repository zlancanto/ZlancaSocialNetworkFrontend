import {IPasswordError} from "./IPasswordError";

export interface IRegister {
    email: string;
    pseudo: string;
    password: IPasswordError;
}