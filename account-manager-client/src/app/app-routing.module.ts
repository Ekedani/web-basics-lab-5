import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginComponent} from './auth/login/login.component';
import {ProfileComponent} from './profile/profile.component';
import {RegisterComponent} from './auth/register/register.component';
import {UsersComponent} from './users/users.component';
import {authGuard} from "./core/guards/auth.guard";
import {ErrorComponent} from "./core/components/error/error.component";

const routes: Routes = [
  {path: '', redirectTo: 'profile', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: 'users', component: UsersComponent, canActivate: [authGuard]},
  {path: 'profile', component: ProfileComponent,  canActivate: [authGuard]},
  {path: 'error', component: ErrorComponent},
  {path: '**', redirectTo: '/error'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
