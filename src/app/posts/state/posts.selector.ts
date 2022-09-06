import {createFeatureSelector, createSelector} from "@ngrx/store";
import {postsAdapter, PostsState} from "./posts.state";
import {RouterStateUrl} from "../../store/router/custom-serializer";
import {getCurrentRoute} from "../../store/router/router.selector";

export const POSTS_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POSTS_STATE_NAME);

export const postsSelectors = postsAdapter.getSelectors();

export const getPosts = createSelector(getPostsState, postsSelectors.selectAll);
export const getPostsEntities = createSelector(
  getPostsState,
  postsSelectors.selectEntities
)

export const getPostById = createSelector(
  // getPosts,
  getPostsEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    // return posts ? posts.find(post => post.id == route.params['id']) : null;
    return posts ? posts[route.params['id']] : null;
  }
);
