import React, {FunctionComponent, useEffect, useState} from 'react';
import Routes from "./components/Routes";
import {UidContext} from "./components/AppContext";
import {fetchToken} from "./utils/api";
import {useDispatch} from "react-redux";
import {getUser} from "./providers/user/get.user";
import {IUserEntity} from "./structures/entities/IUser.entity";
import {setUserConnected, setUserList} from "./redux/reducers/user/user.setters";
import {getUserList} from "./providers/user/get.user.list";


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
    }, [uid]);

  return (
      <UidContext.Provider value={uid}>
        <Routes/>
      </UidContext.Provider>
  )
}

export default App;
