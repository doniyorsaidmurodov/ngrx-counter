import {createAction, props} from "@ngrx/store";
import {Post} from "../../models/post.model";

export const addPost = createAction(
  '[posts page] add post',
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
    id: number
  }>()
);
