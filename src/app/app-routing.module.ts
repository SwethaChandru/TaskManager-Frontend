import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { ViewComponent } from './components/view/view.component';
import { AuthGuardService } from './shared/auth-guard.service';
import {AdminGuardService} from './shared/admin-guard.service';
import {SharedAuthService} from './shared/shared-auth.service';


const routes: Routes = [
  {path:'',component:NavbarComponent,canActivate:[SharedAuthService]},
  {path:'login',component:LoginComponent},
  {path:'editpass/:change',component:SignupComponent,canActivate:[AuthGuardService]},
  {path:'signup',component:SignupComponent,canActivate:[AdminGuardService]},
  {path:'edit/:userId',component:SignupComponent,canActivate:[AdminGuardService]},
  {path:'addtask',component:AddTaskComponent,canActivate:[AdminGuardService]},
  {path:'editTask/:taskid',component:AddTaskComponent,canActivate:[AdminGuardService]},
  {path:'view',component:ViewComponent,canActivate:[SharedAuthService]},
  {path:'viewtask',component:ViewTaskComponent,canActivate:[SharedAuthService]},
  {path:'profile',component:ProfileComponent,canActivate:[SharedAuthService]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers:[ AuthGuardService,AdminGuardService,SharedAuthService]
})
export class AppRoutingModule { }

export const routingComponent=[LoginComponent,SignupComponent,NavbarComponent,AddTaskComponent,
                                ViewComponent,ViewTaskComponent,ProfileComponent]
