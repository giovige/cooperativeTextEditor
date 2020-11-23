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
  groupName:string='gruppo2';
  currentTeam: Group;
  team_id: string;

  @ViewChild('table') table: MatTable<Element>;

  @Input()
  actualUser: Student = { id: '', serial:'', name: '', firstName: '', courseId: '', groupId:''};

  
  constructor(private studentService: StudentService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.currentTeam = null;
   }



  ngOnInit(): void {
    this.activatedRoute.params.subscribe( p => {
      //this.course_id = p['id'];
      this.course_name = p['course_name'];
      this.studentID = this.authService.getStudentId();
      
      //this.getTeam(this.studentID,this.course_name);
      console.log(this.team_id);
      
      this.inAteamObs = this.studentService.studentHasTeam(this.studentID, this.course_name);
      
      
      
      //TODO
      /* if(this.team_id!==null){
        console.log('NON.NULL');
        console.log(this.currentTeam);
        console.log(this.team_id);
        this.alreadyInGroup = true;
        this.getMembers(this.team_id);
      } */
      
    });
    

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
 
/* group: Student[] = [{ id: '261098', serial:'1', name: 'ini', firstName: 'enzo', courseId: '432', groupId:'32'}, 
                    { id: '261088', serial:'2', name: 'bianchi', firstName: 'paolo', courseId: '34', groupId:'33'} 
]; */



groupColumns: string[] = ['select','name', 'firstName'];
/* group: Student[];
groupName:string='gruppo2'; */





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
    console.log('getMermers()');
    console.log(s);
    this.group = s} );
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

alreadyInGroup(c: string) {
  //console.log('pacchiufaiii    '+ c);
  return this.studentService.studentHasTeam(this.studentID, c).subscribe(
    b => {
      console.log(b);
      return b;  
    }
  );
}


}
