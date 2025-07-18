import React, {FunctionComponent} from 'react';
import {useSelector} from "react-redux";
import {getUserConnected} from "../redux/reducers/user/user.getters";
import {getTrendList} from "../redux/reducers/post/post.getters";
import LeftNav from "../components/LeftNav";
import {IPostEntity} from "../structures/entities/IPost.entity";
import CardPost from "../components/Post/Card.post";
import Trends from "../components/Trends";

const Trending: FunctionComponent = () => {
    // Selectors
    const userConnected = useSelector(getUserConnected);
    const trendList = useSelector(getTrendList(3))

    return (
        <>
            <div className="trending-page">
                <LeftNav/>
                <div className="main">
                    {
                        (userConnected && trendList.length > 0) && trendList.map((post: IPostEntity) => (
                            <CardPost post={post} key={post._id}/>
                        ))
                    }
                </div>
                <div className="right-side">
                    <div className="right-side-container">
                        <h1>Tendances</h1>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Trending;