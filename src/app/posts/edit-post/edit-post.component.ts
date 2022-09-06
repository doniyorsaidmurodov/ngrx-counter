import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {PostsState} from "../state/posts.state";
import {AppState} from "../../store/app.state";
import {getPostById} from "../state/posts.selector";
import {Post} from "../../models/post.model";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {updatePost} from "../state/posts.actions";
import {getCurrentRoute} from "../../store/router/router.selector";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit, OnDestroy {
  post: Post;
  postForm: FormGroup;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private router: Router,
    // private route: ActivatedRoute,
    private store: Store<AppState>,
  ) {
  }

  ngOnInit(): void {
    this.createForm();
    this.store.select(getPostById)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        post => {
          if (post) {
            this.post = post;
            this.postForm.patchValue({
              title: post.title,
              description: post.description
            })
          }
        }
      )
    // this.route.params.subscribe(param => {
    //   const id = param['id'];
    //   this.store.select(getPostById, {id}).subscribe((data: any) => {
    //     this.post = data;
    //     this.postForm.patchValue(this.post);
    //   })
    // })
  }

  ngOnDestroy(): void {
    this._unsubscribeAll.next(true);
    this._unsubscribeAll.complete();
  }

  createForm() {
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
}
