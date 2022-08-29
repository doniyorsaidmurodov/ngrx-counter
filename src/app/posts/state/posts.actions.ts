import {createAction, props} from "@ngrx/store";
import {Post} from "../../models/post.model";

export const ADD_POST_ACTION = '[posts page] add post';
export const ADD_POST_SUCCESS = '[posts page] add post success';
export const UPDATE_POST_ACTION = '[posts page] update post';
export const UPDATE_POST_SUCCESS = '[posts page] update success';
export const DELETE_POST_ACTION = '[posts page] delete post';
export const LOAD_POSTS = '[posts page] load posts';
export const LOAD_POSTS_SUCCESS = '[posts page] load posts success';

export const addPost = createAction(
  '[posts page] add post',
  props<{
    post: Post
  }>()
);

export const addPostSuccess = createAction(
  '[posts page] add post success',
  props<{
    post: Post
  }>()
);

export const updatePost = createAction(
  '[posts page] update post',
  props<{
    post: Post
  }>()
);

export const updatePostSuccess = createAction(
  '[posts page] update post success',
  props<{
    post: Post
  }>()
);

export const deletePost = createAction(
  '[posts page] delete post',
  props<{
    id: string
  }>()
);

export const deletePostSuccess = createAction(
  '[posts page] delete post success',
  props<{
    id: string
  }>()
);

export const loadPosts = createAction(
  '[posts page] load posts'
)

export const loadPostsSuccess = createAction(
  '[posts page] load posts success',
  props<{posts: Post[]}>()
)
