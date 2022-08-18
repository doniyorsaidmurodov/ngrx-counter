import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {PostsState} from "../state/posts.state";
import {AppState} from "../../store/app.state";
import {getPostById} from "../state/posts.selector";
import {Post} from "../../models/post.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {updatePost} from "../state/posts.actions";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  post: Post;
  postForm: FormGroup;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private store: Store<AppState>,
    ) {
  }

  ngOnInit(): void {
    this.postForm = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(6)]),
      description: new FormControl(null, [Validators.required, Validators.minLength(10)]),
    })
    this.route.params.subscribe(param => {
      const id = param['id'];
      this.store.select(getPostById, {id}).subscribe((data: any) => {
        this.post = data;
        this.postForm.patchValue(this.post);
      })
    })
  }

  get title(): FormControl {
    return this.postForm.get('title') as FormControl;
  }

  get description(): FormControl {
    return this.postForm.get('description') as FormControl;
  }

  onUpdatePost() {
    if (this.postForm.invalid) {
      return
    }

    const post: Post = {
      id: this.post.id,
      title: this.postForm.value.title,
      description: this.postForm.value.description
    };

    this.store.dispatch(updatePost({post}));
    this.router.navigate(['./posts']).then();
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
