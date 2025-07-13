import React, {FunctionComponent, useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {getPostList} from "../redux/reducers/post/post.getters";
import {IPostEntity} from "../structures/entities/IPost.entity";
import CardProfil from "./Post/Card.profil";

const Thread: FunctionComponent = () => {

    // Selector
    const postList: Array<IPostEntity> = useSelector(getPostList);

    return (
        <div className="thread-container">
            <ul>
                {
                    postList.map(post => <CardProfil post={post} key={post._id}/>)
                }
            </ul>
        </div>
    );
};

export default Thread;