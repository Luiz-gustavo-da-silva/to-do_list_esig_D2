import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { TodopageComponent } from './pages/todopage/todopage.component';
import { TaskspageComponent } from './pages/taskspage/taskspage.component';

const routes: Routes = [
  {
    path: "",
    pathMatch:"full",
    redirectTo:"login",
  },
  {
    path:"login", component: LoginComponent,
  },
  {
    path: 'todopage', component: TodopageComponent,
  }
  ,
  {
    path: 'taskspage', component: TaskspageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
