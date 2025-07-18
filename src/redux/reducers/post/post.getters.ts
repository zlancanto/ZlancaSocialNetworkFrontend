import {RootState} from "../../index";
import {IPostEntity} from "../../../structures/entities/IPost.entity";

// Obtenir tous les posts
export const getPostList = (state: RootState) => state.post.postList

// Obtenir un nombre précis de posts
export const getPosts = (postNumber: number) => (state: RootState) => getPostList(state).slice(0, postNumber)

export const getTrendList = (trendsLength: number) => (state: RootState) => [...getPostList(state)].sort((a: IPostEntity, b: IPostEntity) => b.likers.length - a.likers.length).slice(0, trendsLength)

/*
    export const getPostById = (postId: string) => (state: RootState) => state.post.postList.find(p => p._id === postId);
*/