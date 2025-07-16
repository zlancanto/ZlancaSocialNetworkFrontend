import React, {FunctionComponent, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getUserConnected} from "../../redux/reducers/user/user.getters";
import {NavLink} from "react-router-dom";
import {ROUTE_PROFIL} from "../../vars/routes";
import {formatLikeDayMonthYearHour} from "../../utils/date";

const CreatePost: FunctionComponent = () => {
    // States
    const [isLoading, setIsLoading] = useState(true);
    const [message, setMessage] = useState<string>();
    const [postPicture, setPostPicture] = useState<string>();
    const [video, setVideo] = useState<string>();
    const [file, setFile] = useState<File>();

    // Dispatch and Selector
    const userConnected = useSelector(getUserConnected);

    useEffect(() => {
        if (userConnected) {
            setIsLoading(false);
        }
    }, []);

    const handlePicture = (e: React.ChangeEvent<HTMLInputElement>) => {

    }

    const handlePost = (e: React.MouseEvent<HTMLButtonElement>) => {}

    const cancelPost = () => {
        setMessage('');
        setPostPicture(undefined);
        setVideo(undefined);
        setFile(undefined);
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
                                                    { postPicture && <img src={postPicture} /> }

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