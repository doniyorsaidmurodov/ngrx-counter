import { Component, OnInit } from '@angular/core';
import {Form, FormControl, FormGroup, Validators} from "@angular/forms";
import {Post} from "../../models/post.model";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";
import {addPost} from "../state/posts.actions";

@Component({
  selector: 'app-add-post',
  templateUrl: './add-post.component.html',
  styleUrls: ['./add-post.component.scss']
})
export class AddPostComponent implements OnInit {
  postForm: FormGroup;

  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    })
  }

  get title(): FormControl {
    return this.postForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.postForm.get('description') as FormControl;
  }

  onAddPost() {
    if (this.postForm.invalid) {
      return
    }

    const post: Post = {
      title: this.title.value,
      description: this.description.value
    }

    this.store.dispatch(addPost({post}))
    this.postForm.reset()
  }

  get showDescriptionErrors() {
    if (this.description.touched && this.description.invalid) {
      if (this.description.errors['required']) {
        return 'Description is required'
      } else if (this.description.errors['minlength']) {
        return 'Description should be minimum 10 characters'
      } else {
        return ''
      }
    } else {
      return ''
    }
  }
}
