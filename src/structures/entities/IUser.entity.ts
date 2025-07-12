export interface IUserEntity {
    _id: string;
    pseudo: string;
    email: string;
    password?: string;
    picture?: string;
    pictureId?: string;
    bio?: string;
    followers: Array<string>;
    following: Array<string>;
    likes: Array<string>;
    createdAt: Date;
    updatedAt: Date;
}