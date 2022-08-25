import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {LoginComponent} from "./login/login.component";
import {RouterModule, Routes} from "@angular/router";
import {ReactiveFormsModule} from "@angular/forms";
import {EffectsModule} from "@ngrx/effects";
import {AuthEffects} from "./state/auth.effects";
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'signup', component: SignupComponent},
]

@NgModule({
  declarations: [LoginComponent, SignupComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes),
    EffectsModule.forFeature([]),
  ]
})
export class AuthModule { }
