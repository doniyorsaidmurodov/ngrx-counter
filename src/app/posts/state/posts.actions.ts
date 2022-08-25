import {createAction, props} from "@ngrx/store";
import {Post} from "../../models/post.model";

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

export const deletePost = createAction(
  '[posts page] delete post',
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
