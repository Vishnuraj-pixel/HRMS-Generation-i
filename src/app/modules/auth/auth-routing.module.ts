import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NonAuthGuard } from 'src/app/core/guards/non-auth.guard';
// import { SignInComponent } from './signIN/sign-in/sign-in.component';
import { SignInComponent } from './sign-in/sign-in.component';

const routes: Routes = [
  {
    path: 'sign-in',
    canActivate: [NonAuthGuard],
    component: SignInComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [NonAuthGuard]
})
export class AuthRoutingModule { }
