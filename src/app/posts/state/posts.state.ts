import {Post} from "../../models/post.model";

export interface PostsState {
  posts: Post[];
}

export const initialState: PostsState = {
  posts: [
    {id: 1, title: 'Post title 1', description: 'Post description 1'},
    {id: 2, title: 'Post title 2', description: 'Post description 2'},
    {id: 3, title: 'Post title 3', description: 'Post description 3'},
  ]
}
