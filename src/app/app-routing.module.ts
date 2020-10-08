import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponentComponent } from './teacher/home-component.component';
import { VmsContComponentComponent } from './teacher/vms/vms-cont-component.component';
import { StudentsContComponent } from './teacher/students-cont.component';
import { PageNotFoundComponentComponent } from './teacher/page-not-found-component.component';
import { LoginDialogComponent } from './auth/login-dialog.component';
import { AuthGuard } from './auth/auth.guard';
import { GroupsContComponent} from './teacher/groups/groups-cont.component';
import { TaskContComponent } from './teacher/tasks/task-cont.component';


const routes: Routes = [
  { path: 'home', component: HomeComponentComponent },
  { path: 'courses',  redirectTo: 'teacher/courses'},
  { path: 'teacher/courses/applicazioni-internet/students', canActivate: [AuthGuard], component: StudentsContComponent },
  { path: 'teacher/courses/applicazioni-internet/vms', canActivate: [AuthGuard], component: VmsContComponentComponent },
  { path: 'teacher/courses/applicazioni-internet/groups', canActivate: [AuthGuard], component: GroupsContComponent },
  { path: 'teacher/courses/applicazioni-internet/tasks', canActivate: [AuthGuard], component: TaskContComponent },
  /*{ path: 'login', component: LoginDialogComponent},*/
  { path: '**', component: PageNotFoundComponentComponent }  
];


@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forRoot(routes, {enableTracing: false} )],
  exports: [RouterModule]
})
export class AppRoutingModule { }