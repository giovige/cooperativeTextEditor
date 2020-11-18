import { Component, ViewChild, ElementRef, OnInit, Output, Input, AfterViewInit, OnDestroy } from '@angular/core';
import { MatIcon } from '@angular/material/icon';
import { SelectControlValueAccessor } from '@angular/forms';
import { MatSidenav } from '@angular/material/sidenav';
import {Student} from 'src/app/student.model'
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import {FormControl} from '@angular/forms';
import {Observable, Subscription} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import { strict } from 'assert';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete'; 
import {MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { LoginDialogComponent } from './auth/login-dialog.component';
import { AuthService } from './auth/auth.service';
import {StudentService} from 'src/app/service/student.service'
import { Router, ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})



export class AppComponent implements OnInit, OnDestroy{
  public course_list = true;
  courses = [];
  public tab_type = 0;  // professore o non loggato => 0   ; studente => 1
  
  id: string;
  role: string;   //ruolo user = {STUDENT, PROFESSOR}
  course_name: string;
  title = 'ai20-lab05';
  routeQueryParams$: Subscription;

  teamPresent: boolean;
  teamId:string;


  @ViewChild('sidenav') sidenav: MatSidenav;

constructor(public dialog: MatDialog, public authService: AuthService, private router: Router, private route: ActivatedRoute, private studentService: StudentService) {
  this.courses= [];
  this.id = null;
  this.role = null;
  this.course_name = null;
  this.routeQueryParams$ = route.queryParams.subscribe(params => {
    if (params['doLogin']) {
      this.openDialog();
      this.sidenav.close();
    }
  });
}

  ngOnInit() {
    this.authService.resetRole();
    this.tab_type=0;
    this.router.navigateByUrl('home');
  }

  


  toggleForMenuClick() {
    this.sidenav.toggle();
  }


  openDialog(): void {
    const dialogRef = this.dialog.open(LoginDialogComponent, {
      width: '250px'  
  });
    dialogRef.afterClosed().subscribe( end => {
      this.router.navigateByUrl('home');
      this.setRole();
      if(this.role=='ROLE_PROFESSOR'){
        this.tab_type=0;
        this.getCourses();
      }
      else if(this.role=='ROLE_STUDENT'){
        this.tab_type=1;
        this.getCoursesForStudent();
      }

      setTimeout(() => {      //apro sidenav una volta che i corsi sono disponibili
          this.toggleForMenuClick();
          }, 200);
    });

    
  }




  logout(){
    this.authService.logout();
    this.router.navigateByUrl('/home');
    this.sidenav.close();
    this.courses= [];
    this.id = null;
    this.role = null;
    this.course_name = null;
    this.tab_type=0;
    
  }

  ngOnDestroy() {
    this.routeQueryParams$.unsubscribe();
  }


  clicked_course(course_name:string) {
    if(course_name=='home') 
      this.course_name="home";
    else
      this.course_name=course_name;
  }

  getID(){
    this.id = this.authService.getStudentId();
    console.log(this.id);
  }

  getCoursesForStudent(): void {
      this.getID();
      this.studentService.getStudentCourses(this.id)
          .subscribe(s => {this.courses = s;/*console.log(this.courses);*/});
  }


  getCourses(): void {
    this.studentService.getCourses()
        .subscribe(s => {this.courses = s;/*console.log(this.courses);*/});
  }

  setRole(): void {
    this.role = this.authService.getStudentRole();
    console.log(this.role);
  }


  //TODO
  groupClicked(course: string): void{
    //alert('AAAAAAAAAAAAAAAAAAHHHHH');
    this.studentService.getStudentTeamByCourse(this.id, course)
    .subscribe( g => {
      console.log('>>>>>>>>teamExist');
      if(g!==null) this.teamId = g.id;
      console.log(this.teamId);
      if(this.teamId!==undefined){
        this.teamPresent=true;
      }else
        this.teamPresent=false;
      console.log(this.teamPresent);
      this.router.navigateByUrl('student/courses/'+ course +'/groups');
    });

  }

}