import React, {FunctionComponent} from 'react';
import LeftNav from "../components/LeftNav";
import Thread from "../components/Thread";
import {useSelector} from "react-redux";
import {getUserConnected} from "../redux/reducers/user/user.getters";
import CreatePost from "../components/Post/Create.post";
import Log from "../components/Log";
import {IUserEntity} from "../structures/entities/IUser.entity";

const Home: FunctionComponent = () => {
    // States
    const userConnected: IUserEntity | undefined = useSelector(getUserConnected);

    return (
        <div className="home">
            <LeftNav/>
            <div className="main">
                <div className="home-header">
                    {
                        userConnected
                            ? <CreatePost/>
                            : <Log signin={true} signup={false}/>
                    }
                </div>
                <Thread/>
            </div>
        </div>
    );
};

export default Home;