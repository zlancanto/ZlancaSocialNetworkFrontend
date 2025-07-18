import React, {FunctionComponent, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserConnected} from "../../redux/reducers/user/user.getters";
import {postUserPicture} from "../../providers/user/post.user.picture";
import {setUserConnected} from "../../redux/reducers/user/user.setters";
import {IUserEntity} from "../../structures/entities/IUser.entity";
import {addUploadFileError, resetUploadFileError} from "../../redux/reducers/error/error.setters";
import any = jasmine.any;

const UploadImgProfil: FunctionComponent = () => {
    const [file, setFile] = useState<File>();
    const dispatch = useDispatch();
    const userConnected = useSelector(getUserConnected);

    const onChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.currentTarget.files;
        if (files && files.length > 0) {
            e.preventDefault();
            setFile(files[0])
        } else {
            console.error("Not file selected");
        }
    };

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        if (userConnected && file) {
            e.preventDefault();
            console.log('file : ', file)
            const data = new FormData()
            data.append('userId', userConnected._id);
            data.append('file', file);
            postUserPicture(data)
                .then((user: IUserEntity | undefined) => {
                    dispatch(setUserConnected(user));
                    dispatch(resetUploadFileError());
                })
                .catch((err : any) => {
                    dispatch(addUploadFileError(err.response.data.errors));
                    console.error('UpdateProfilError : ', err);
                });
        }
    };

    return (
        <form onSubmit={onSubmit} className="upload-pic">
            <label htmlFor="file">Modifier l'image</label>
            <input
                type="file"
                id="file"
                name="file"
                accept=".jpg, .jpeg, .png"
                onChange={onChooseFile}
            />
            <br/>

            <input type="submit" value="Envoyer"/>
        </form>
    );
};

export default UploadImgProfil;