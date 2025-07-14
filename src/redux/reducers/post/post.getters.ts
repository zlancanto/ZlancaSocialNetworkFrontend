import {RootState} from "../../index";

// Obtenir tous les posts
export const getPostList = (state: RootState) => state.post.postList

// Obtenir un nombre précis de posts
export const getPosts = (postNumber: number) => (state: RootState) => getPostList(state).slice(0, postNumber)

/*
    export const getPostById = (postId: string) => (state: RootState) => state.post.postList.find(p => p._id === postId);
*/