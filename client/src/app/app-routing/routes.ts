import { Routes } from '@angular/router';

import { HomeComponent } from '../home/home.component';
import { LoginComponent } from "../login/login.component";
import {RegisterComponent} from '../register/register.component';
import { AuthGuard } from "../shared/auth-guard.service";

export const routes: Routes = [
  { path: 'home',  component: HomeComponent, canActivate: [AuthGuard]},
  {path:'login',component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' }
];

