import React, {FunctionComponent, useEffect, useState} from 'react';
import Routes from "./components/Routes";
import {UidContext} from "./components/AppContext";
import {fetchToken} from "./utils/api";
import {useDispatch} from "react-redux";
import {getUser} from "./providers/user/get.user";
import {IUserEntity} from "./structures/entities/IUser.entity";
import {setUserConnected, setUserList} from "./redux/reducers/user/user.setters";
import {getUserList} from "./providers/user/get.user.list";
import {IPostEntity} from "./structures/entities/IPost.entity";
import {setPostList} from "./redux/reducers/post/post.setters";
import {getPostList} from "./providers/post/get.post.list";
import {ToastContainer} from "react-toastify";


const App: FunctionComponent = () => {
    const [uid, setUid] = useState<string | null>(null);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchToken(setUid);

        /* UserConnected */
        if (uid) {
            getUser(uid)
                .then((user: IUserEntity | undefined) => {
                    dispatch(setUserConnected(user));
                    console.log('user', user);
                })
                .catch(err => console.error(err));
        }

        /* UserList */
        getUserList().then((userList) => {
            userList
                ? dispatch(setUserList(userList))
                : dispatch(setUserList([]))
        })

        /* PostList */
        getPostList().then((postList: Array<IPostEntity> | undefined) => {
            postList
                ? dispatch(setPostList(postList))
                : dispatch(setPostList([]))
        })
    }, [uid]);

    return (
        <UidContext.Provider value={uid}>
            <Routes/>
            <ToastContainer
                position="top-right"
                autoClose={7000}
                hideProgressBar={false}
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </UidContext.Provider>
    )
}

export default App;
