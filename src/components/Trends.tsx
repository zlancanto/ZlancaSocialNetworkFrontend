import React, {FunctionComponent} from 'react';
import {useSelector} from "react-redux";
import {getUserConnected} from "../redux/reducers/user/user.getters";
import {getTrendList} from "../redux/reducers/post/post.getters";
import {NavLink} from "react-router-dom";
import {ROUTE_TRENDING} from "../vars/routes";
import {IPostEntity} from "../structures/entities/IPost.entity";

const Trends: FunctionComponent = () => {

    const userConnected = useSelector(getUserConnected);
    const trendList = useSelector(getTrendList(3));

    return (
        <>
            {
                (trendList && userConnected) && (
                    <div className="trending-container">
                        <h4>Tendances</h4>
                        <NavLink to={ROUTE_TRENDING}>
                            <ul>
                                {
                                    trendList.map((post: IPostEntity) => (
                                        <li key={post._id}>
                                            <div>
                                                {
                                                    /* On affiche l'img du post  */
                                                    post.picture
                                                        ? <img src={post.picture} alt="PostImage"/>
                                                        : <img src="/img/icon.png" alt="UserImage"/>
                                                }
                                            </div>
                                            <div className="trend-content">
                                                <p>{post.message}</p>
                                                <span>Lire</span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        </NavLink>
                    </div>
                )
            }
        </>
    );
};

export default Trends;