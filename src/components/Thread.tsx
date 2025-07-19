import React, {FunctionComponent, useState} from 'react';
import {useSelector} from "react-redux";
import {getPosts} from "../redux/reducers/post/post.getters";
import {IPostEntity} from "../structures/entities/IPost.entity";
import CardPost from "./Post/Card.post";
import InfiniteScroll from "react-infinite-scroll-component";

const Thread: FunctionComponent = () => {
    // States
    const [count, setCount] = useState(5);

    // Selector
    const postList: Array<IPostEntity> = useSelector(getPosts(count));

    // Vars
    const hasMore = postList.length >= count;

    const fetchMore = () => {
        setCount(prev => prev + 5);
    };

    return (
        <div className="thread-container">
            <InfiniteScroll
                next={fetchMore}
                hasMore={hasMore}
                dataLength={postList.length}
                loader={<h4>Chargement…</h4>}
            >
                {
                    (postList.length > 0)
                        ? (
                            <ul>
                                {
                                    postList.map(post => <CardPost post={post} key={post._id}/>)
                                }
                            </ul>
                        )
                        : <h2>Aucun post publié</h2>
                }
            </InfiniteScroll>
        </div>
    );
};

export default Thread;