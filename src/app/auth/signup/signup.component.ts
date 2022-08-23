import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {setLoadingSpinner} from "../../store/shared/shared.actions";
import {loginStart, signupStart} from "../state/auth.actions";
import {Store} from "@ngrx/store";
import {AppState} from "../../store/app.state";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  signUpForm: FormGroup;
  constructor(private store: Store<AppState>) { }

  ngOnInit(): void {
    this.signUpForm = new FormGroup({
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required, Validators.minLength(6)]),
    });
  }

  onSignUpSubmit() {
    if (this.signUpForm.invalid) {
      return;
    }

    const email = this.signUpForm.value.email;
    const password = this.signUpForm.value.password;

    this.store.dispatch(setLoadingSpinner({status: true}));
    this.store.dispatch(signupStart({email, password}));
  }

}
