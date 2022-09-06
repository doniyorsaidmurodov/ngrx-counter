import { Component, OnInit } from '@angular/core';
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {Post} from "../../models/post.model";
import {Observable} from "rxjs";
import {getPostById} from "../state/posts.selector";

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.scss']
})
export class SinglePostComponent implements OnInit {
  post: Observable<Post>;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.post = this.store.select(getPostById);
  }

}
