import {createReducer, on} from "@ngrx/store";
import {initialState, postsAdapter} from "./posts.state";
import {
  addPostSuccess,
  deletePostSuccess,
  loadPostsSuccess,
  updatePostSuccess
} from "./posts.actions";

const _postsReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    return postsAdapter.addOne(action.post, {...state, count: state.count + 1})
    // let post = {...action.post};
    //
    // return {
    //   ...state,
    //   posts: [...state.posts, post]
    // }
  }),
  on(updatePostSuccess, (state, action) => {
    return postsAdapter.updateOne(action.post, state)
    // const updatedPosts = state.posts.map(post => {
    //   return action.post.id == post.id ? action.post : post;
    // });
    // return {
    //   ...state,
    //   posts: updatedPosts
    // }
  }),
  on(deletePostSuccess, (state, {id}) => {
    return postsAdapter.removeOne(id, state)
    // const updatedPosts = state.posts.filter(post => post.id != id);
    // return {
    //   ...state,
    //   posts: updatedPosts
    // }
  }),
  on(loadPostsSuccess, (state, action) => {
    return postsAdapter.setAll(action.posts, {...state, count: state.count + 1})
    // return {
    //   ...state,
    //   posts: action.posts
    // }
  })
)

export function postsReducer(state, action) {
  return _postsReducer(state, action)
}
