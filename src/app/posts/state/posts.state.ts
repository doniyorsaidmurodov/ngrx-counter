import {Post} from "../../models/post.model";
import {createEntityAdapter, EntityState} from "@ngrx/entity";

export interface PostsState extends EntityState<Post> {
  count: number;
}

export const postsAdapter = createEntityAdapter<Post>();

export const initialState: PostsState = postsAdapter.getInitialState({
  count: 0
});

export function sortByPost(a: Post, b: Post): number {
  const compare = a.title.localeCompare(b.title);
  if (compare > 0) {
    return -1
  }
  if (compare < 0) {
    return 1
  }

  return compare
}
