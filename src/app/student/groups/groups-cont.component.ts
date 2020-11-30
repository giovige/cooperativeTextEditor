import { Component, ViewChild, EventEmitter ,ElementRef, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import {Student} from 'src/app/student.model'
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import {FormControl, Form} from '@angular/forms';
import {Observable} from 'rxjs';
import {catchError, map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete'; 
import {MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { group } from '@angular/animations';
import {MatExpansionModule,MatAccordion} from '@angular/material/expansion'; 
import {MatButtonModule} from '@angular/material/button'; 
import {StudentService} from 'src/app/service/student.service';
import { ActivatedRoute } from '@angular/router';
import { Group } from 'src/app/group.model';
import { AuthService } from 'src/app/auth/auth.service';
import { Token } from 'src/app/token.model';



@Component({
  selector: 'app-groups-cont',
  templateUrl: './groups-cont.component.html',
  styleUrls: ['./groups-cont.component.css']
})
export class GroupsContComponent implements OnInit {
  
  GroupPresent: boolean;    //@@@@@@@@@@@ selezionatore della vista opportuna
  //course_id: string;
  course_name: string;
  inAteamObs: Observable<any>;
  studentID: string;
  group: Student[];
  currentTeam: Group;
  team_id: string;
  team_name: string;
  nogroup:boolean;

  requestMap: Map<Token, Student[]>;
  


  @ViewChild('table') table: MatTable<Element>;

  @Input()
  actualUser: Student = { id: '', serial:'', name: '', firstName: '', courseId: '', groupId:''};

  
  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.currentTeam = null;
    this.nogroup=false;
   }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe( p => {
      //this.course_id = p['id'];
      this.course_name = p['course_name'];
      this.studentID = this.authService.getStudentId();
      
      
      this.inAteamObs = this.studentService.studentHasTeam(this.studentID, this.course_name);
      

      this.studentService.getStudentTeamByCourse(this.studentID, this.course_name).subscribe(
        res => {
          if(res!==null) {
            //false - cerco componenti gruppo
            console.log('1--------cie un gruppoooo')
            console.log(res);
            this.team_id = res.id; 
            this.team_name = res.name;  
            this.studentService.getTeamMembers(this.team_id).subscribe(
              s => {
                this.group = s;
              });

          }else{
            //true - cerco persone libere
            console.log('2--------NO gruppoooo')
            this.studentService.getNoTeamStudents(this.course_name).subscribe(
              s => {
                this.freeStudents = s;
              } 
            );

            this.studentService.getTeamRequests(this.studentID, this.course_name).subscribe(
              tkn => {
                console.log(tkn);
                this.studentService.getInvitedToAGroup(this.studentID, this.course_name, tkn.teamId).subscribe(
                  s => {
                    this.requestMap.set(tkn, s);
                  }
                );

                //qui per ogni teamId devo trovare i partecipanti e il nome
              },
              err => {
                console.log('nessuna richiesta gruppo!');
              }
            );
          }



        }
      )
      
      
     
      
    });
    console.log(this.inAteamObs);
    

  }



  



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@ parte di tabella per registrazione gruppo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

selection = new SelectionModel<Student>(true, []);

freeStudents: Student[] = [];


/** Whether the number of selected elements matches the total number of rows. */
isAllSelected() {
  const numSelected = this.selection.selected.length;
  const numRows = this.freeStudents.length;
  return numSelected == numRows;
}

/** Selects all rows if they are not all selected; otherwise clear selection. */
masterToggle() {
  this.isAllSelected() ?
      this.selection.clear() :
      this.freeStudents.forEach(row => this.selection.select(row));
}

studentColumns: string[] = ['select','id', 'serial', 'name', 'firstName' ];



sendRequest() {     //@@@@@@invia richiesta  
  console.log();
  console.log();
  console.log();
  console.log(this.selection);

}

//@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@


groupColumns: string[] = ['select','name', 'firstName'];



//@@@@@@@@@@@@@@@@@@@__________FUNZIONI per service___________@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

/* 
//TODO
getTeam(id: string, c: string): void{
  this.studentService.getStudentTeamByCourse(id, c)
  .subscribe( g => {
    console.log('getTeam()');
    this.currentTeam = g;
    this.team_id = g.id;
    console.log(this.team_id);

    if(this.team_id!==null){
      this.alreadyInGroup=true;
      console.log(this.currentTeam);
      console.log(this.team_id);
      this.alreadyInGroup = true;
      this.getMembers(this.team_id);
    }else{
      this.alreadyInGroup=false;
    }

    
  });
} */

//TODO
getMembers(teamId:string): void {
  this.studentService.getTeamMembers(teamId)
  .subscribe( s => {
    console.log('getMermbers()');
    console.log(s);
    this.group = s
  });
}


/* 
//TODO
teamExist(id: string, c: string): void{
  this.studentService.getStudentTeamByCourse(id, c)
  .subscribe( g => {
    console.log('>>>>>>>>teamExist');
    this.team_id = g.id;
    console.log(this.team_id);
    if(this.team_id!==undefined){
      this.alreadyInGroup=true;
    }
    console.log(this.alreadyInGroup);
  });
}

 */









}
