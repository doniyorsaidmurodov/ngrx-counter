import {Component, OnInit} from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {Observable} from "rxjs";
import {Post} from "../../models/post.model";
import {getCount, getPosts} from "../state/posts.selector";
import {deletePost, loadPosts} from "../state/posts.actions";

@Component({
  selector: 'app-posts-list',
  templateUrl: './posts-list.component.html',
  styleUrls: ['./posts-list.component.scss']
})
export class PostsListComponent implements OnInit {
  posts: Observable<Post[]>;
  count: Observable<number>;

  constructor(private store: Store<AppState>) {
  }

  ngOnInit(): void {
    this.posts = this.store.select(getPosts);
    this.count = this.store.select(getCount);
    this.store.dispatch(loadPosts());
  }

  onDeletePost(id: string) {
    if (confirm('Are you sure to delete post?')) {
      this.store.dispatch(deletePost({id}));
    } else {
      return;
    }
  }
}
