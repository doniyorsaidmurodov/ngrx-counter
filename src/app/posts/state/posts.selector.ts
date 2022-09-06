import {createFeatureSelector, createSelector} from "@ngrx/store";
import {PostsState} from "./posts.state";
import {RouterStateUrl} from "../../store/router/custom-serializer";
import {getCurrentRoute} from "../../store/router/router.selector";

export const POSTS_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);

export const getPosts = createSelector(getPostsState, state => {
  return state.posts;
});

export const getPostById = createSelector(getPosts, getCurrentRoute, (posts, route: RouterStateUrl) => {
  return posts ? posts.find(post => post.id == route.params['id']) : null;
});
