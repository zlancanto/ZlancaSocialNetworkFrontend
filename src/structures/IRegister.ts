import {IPasswordError} from "./errors/IPasswordError";

export interface IRegister {
    email: string;
    pseudo: string;
    password: IPasswordError;
}