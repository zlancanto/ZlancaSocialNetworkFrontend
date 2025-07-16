import {IPostState} from "../../../structures/states/IPost.state";
import {PayloadAction} from "@reduxjs/toolkit";
import {IPostEntity} from "../../../structures/entities/IPost.entity";

export const setPostList = (currentState: IPostState, action: PayloadAction<Array<IPostEntity>>)=> {
    currentState.postList = action.payload;
};

export const addPost = (currentState: IPostState, action: PayloadAction<IPostEntity>)=> {
    currentState.postList = [action.payload, ...currentState.postList];
}

/* action.payload = PostId  */
export const likePost = (currentState: IPostState, action: PayloadAction<{ postId: string, likerId: string }>)=> {
    const postIndexToLiked: number = currentState.postList.findIndex((post: IPostEntity) => post._id === action.payload.postId);
    if (postIndexToLiked !== -1) {
        const postToLiked: IPostEntity = currentState.postList[postIndexToLiked];
        const updatedPost = {
            ...postToLiked,
            likers: [...postToLiked.likers, action.payload.likerId]
        };
        currentState.postList[postIndexToLiked] = updatedPost;
    }
};

/* action.payload = PostId  */
export const unlikePost = (currentState: IPostState, action: PayloadAction<{ postId: string, unlikerId: string }>)=> {
    // Post à disliker
    const postIndexToUnliked: number = currentState.postList.findIndex((post: IPostEntity) => post._id === action.payload.postId);
    if (postIndexToUnliked !== -1) {
        const postToUnliked: IPostEntity = currentState.postList[postIndexToUnliked]
        const updatedPost = {
            ...postToUnliked,
            likers: postToUnliked.likers.filter((likerId: string) => likerId !== action.payload.unlikerId)
        };
        currentState.postList[postIndexToUnliked] = updatedPost;
    }
};

export const updatePost = (currentState: IPostState, action: PayloadAction<IPostEntity>) =>{
    const indexPostToUpdate: number = currentState.postList.findIndex((post: IPostEntity) => post._id === action.payload._id);
    if (indexPostToUpdate !== -1) {
        currentState.postList[indexPostToUpdate] = action.payload;
    }
};

/* action.payload = PostId  */
export const deletePost = (currentState: IPostState, action: PayloadAction<string>) => {
    currentState.postList = currentState.postList.filter((post: IPostEntity) => post._id !== action.payload)
}

export const setPost = (currentState: IPostState, action: PayloadAction<IPostEntity>) => {
    const postIndex = currentState.postList.findIndex((post: IPostEntity) => post._id === action.payload._id);
    if (postIndex === -1) { return; }
    currentState.postList[postIndex] = action.payload;
}