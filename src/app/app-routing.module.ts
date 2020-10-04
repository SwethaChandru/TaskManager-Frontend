import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddTaskComponent } from './components/add-task/add-task.component';
import { LoginComponent } from './components/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { ViewTaskComponent } from './components/view-task/view-task.component';
import { ViewComponent } from './components/view/view.component';


const routes: Routes = [
  {path:'',component:NavbarComponent},
  {path:'login',component:LoginComponent},
  {path:'signup',component:SignupComponent},
  {path:'edit/:userId',component:SignupComponent},
  {path:'addtask',component:AddTaskComponent},
  {path:'view',component:ViewComponent},
  {path:'viewtask',component:ViewTaskComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const routingComponent=[LoginComponent,SignupComponent,NavbarComponent,AddTaskComponent,
                                ViewComponent,ViewTaskComponent]
