import React, {FunctionComponent, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getUserConnected} from "../../redux/reducers/user/user.getters";
import {NavLink} from "react-router-dom";
import {ROUTE_PROFIL} from "../../vars/routes";
import {formatLikeDayMonthYearHour} from "../../utils/date";
import {createPost} from "../../providers/post/create.post";
import {IPostEntity} from "../../structures/entities/IPost.entity";
import {addPost} from "../../redux/reducers/post/post.setters";
import {toast} from "react-toastify";
import {addUploadFileError, resetUploadFileError} from "../../redux/reducers/error/error.setters";
import {IUploadFileError} from "../../structures/errors/IUploadFileError";
import {getUploadFileError} from "../../redux/reducers/error/error.getters";

const CreatePost: FunctionComponent = () => {
    // States
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState<string>();
    const [postPicture, setPostPicture] = useState<string>();
    const [video, setVideo] = useState<string>();
    const [file, setFile] = useState<File>();

    // Dispatch and Selector
    const dispatch = useDispatch();
    const userConnected = useSelector(getUserConnected);
    const errors: IUploadFileError = useSelector(getUploadFileError)

    useEffect(() => {
        if (userConnected) {
            setIsLoading(false);
        }
        handleVideo();
    }, [userConnected, message, video]);

    useEffect(() => {
        return () => {
            if (postPicture) {
                URL.revokeObjectURL(postPicture);
            }
        };
    }, [postPicture]);

    const handleVideo = () => {
        if (!message) {
            return;
        }
        let findLink = message.split(' ');
        findLink.forEach((str: string, index: number) => {
            if (!(
                str.includes('https://www.youtube.com/') ||
                str.includes('https://youtube.com/')
            )) {
                return;
            }
            let embed = str.replace('watch?v=', 'embed/');
            setVideo(embed.split('&')[0]);
            findLink.splice(index, 1);
            setMessage(findLink.join(' '));
            setPostPicture('');
        })
    }

    const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.currentTarget.files) {
            const file: File = e.currentTarget.files[0];
            setPostPicture(URL.createObjectURL(file))
            setFile(file);
            setVideo('');
        }
    }

    const cancelPost = () => {
        setMessage('');
        setPostPicture(undefined);
        setVideo(undefined);
        setFile(undefined);
    }

    const handlePost = () => {
        if (!userConnected) {
            return;
        }
        if (message || postPicture || video) {
            const data = new FormData();
            data.append('posterId', userConnected._id);
            data.append('message', message || '');

            if (file) {
                data.append('file', file);
            }
            if (video) {
                data.append('video', video);
            }

            createPost(data)
                .then((post: IPostEntity | undefined) => {
                    if (post) {
                        console.log('POST : ', post);
                        dispatch(addPost(post));
                        dispatch((resetUploadFileError()));
                        setMessage('');
                        setPostPicture(undefined);
                        setVideo(undefined);
                        setFile(undefined);
                        toast.success('Post ajouté');
                    }
                })
                .catch((err: any) => {
                    dispatch(addUploadFileError(err.response.data.errors));
                    console.error('CreatePostError : ', err);
                })
        } else {
            toast.warning("Aucune donnée. Impossible d'effectuer le post");
        }
    }

    return (
        <div className="post-container">
            {
                isLoading
                    ? <i className="fas fa-spinner fa-pulse"></i>
                    : (
                        userConnected &&
                        <>
                            <div className="data">
                                <p>
                                    <span>
                                        {
                                            userConnected.following
                                                ? userConnected.following.length
                                                : 0
                                        }
                                    </span>
                                    {' '} Abonnement{userConnected.following.length > 1 ? 's' : ''}
                                </p>

                                <p>
                                    <span>
                                        {
                                            userConnected.followers
                                                ? userConnected.followers.length
                                                : 0
                                        }
                                    </span>
                                    {' '} Abonné{userConnected.followers.length > 1 ? 's' : ''}
                                </p>
                            </div>
                            <NavLink to={ROUTE_PROFIL}>
                                <div className="user-info">
                                    <img src={userConnected.picture} alt="UserImage"/>
                                </div>
                            </NavLink>
                            <div className="post-form">
                                <textarea
                                    name="message"
                                    id="message"
                                    placeholder="Quoi de neuf ?"
                                    value={message}
                                    required
                                    onChange={e => setMessage(e.currentTarget.value)}
                                />

                                {
                                    /*  */
                                    (message || postPicture || video) && (
                                        <li className="card-container">
                                            <div className="card-left">
                                                <img src={userConnected.picture} alt="UserImage"/>
                                            </div>
                                            <div className="card-right">
                                                <div className="card-header">
                                                    <div className="pseudo">
                                                        <h3>{userConnected.pseudo}</h3>
                                                    </div>
                                                    <span>{formatLikeDayMonthYearHour(Date.now())}</span>
                                                </div>
                                                <div className="content">
                                                    <p>{message}</p>
                                                    {postPicture && <img src={postPicture}/>}

                                                    {
                                                        /* Vidéo */
                                                        video && (
                                                            <iframe
                                                                width={500}
                                                                height={300}
                                                                src={video}
                                                                frameBorder={0}
                                                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                                                allowFullScreen={true}
                                                            ></iframe>
                                                        )
                                                    }
                                                </div>
                                            </div>
                                        </li>
                                    )
                                }

                                <div className="footer-form">
                                    <div className="icon">
                                        {
                                            video
                                                ? (
                                                    <button onClick={() => setVideo('')}>
                                                        Supprimer vidéo
                                                    </button>
                                                )
                                                : (
                                                    <>
                                                        <img src="/img/icons/picture.svg" alt="ImgIcon"/>
                                                        <input
                                                            type="file"
                                                            accept=".jpg, .jpeg, .png"
                                                            onChange={handlePicture}
                                                        />
                                                    </>
                                                )
                                        }
                                    </div>
                                    { errors.notFile !== '' && <p>{errors.notFile}</p> }
                                    { errors.invalidFile !== '' && <p>{errors.invalidFile}</p> }
                                    { errors.user !== '' && <p>{errors.user}</p> }
                                    { errors.maxSizeFile !== '' && <p>{errors.maxSizeFile}</p> }
                                    { errors.other !== '' && <p>{errors.other}</p> }

                                    <div className="btn-send">
                                        {
                                            /* Cancel */
                                            (message || postPicture || video) && (
                                                <button className="cancel" onClick={cancelPost}>
                                                    Annuler
                                                </button>
                                            )
                                        }


                                        {/* Send */}
                                        <button className="send" onClick={handlePost}>
                                            Envoyer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </>
                    )
            }
        </div>
    );
};

export default CreatePost;