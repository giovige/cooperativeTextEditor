import { Component, ViewChild, EventEmitter ,ElementRef, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import {Student} from 'src/app/student.model'
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import {FormControl, Form, FormBuilder, FormGroup, Validators} from '@angular/forms';
import {from, Observable} from 'rxjs';
import {catchError, concatMap, map, startWith} from 'rxjs/operators';
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
  team_id: number;
  team_name: string;
  nogroup:boolean;

  requestMap: Map<Token, Student[]> = new Map<Token, Student[]>();
  

  @ViewChild('table') table: MatTable<Element>;
  form: FormGroup;
  newGroupName = new FormControl('', [Validators.required]);
  timeoutRequest = new FormControl('', [Validators.required]);


  @Input()
  actualUser: Student = { id: '', serial:'', name: '', firstName: '', courseId: '', groupId:''};

  
  constructor(private fb: FormBuilder, private studentService: StudentService, private activatedRoute: ActivatedRoute, private authService: AuthService) {
    this.currentTeam = null;
    this.nogroup=false;
    this.inizializza_form();
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

            // console.log(res);
            this.team_id = res.id; 
            this.team_name = res.name;  
            this.studentService.getTeamMembers(this.team_id).subscribe(
              s => {
                this.group = s;
              });

          }else{
            //true - cerco persone libere
            
            this.studentService.getNoTeamStudents(this.course_name).subscribe(
              s => {
                this.freeStudents = s;
              } 
            );

            this.studentService.getTeamRequests(this.studentID, this.course_name).subscribe(
              tkn => {
                if(Object.keys(tkn).length !== 0){
                  // console.log('trovato token');
                  // console.log(tkn);
                  
                  from(tkn).forEach( (t: Token) => {
                    
                    // console.log('FOR EACH');
                    
                    this.studentService.getTeamMembers(t.teamId).subscribe(
                      s => {
                        // console.log('ADESSO COSI');
                        // console.log(t);
                        // console.log(s);
                        this.requestMap.set(t, s);
                        //console.log('mappa token-studenti');
                        console.log(this.requestMap);
                      });
                  });
                  
                }else{
                  console.log('niente token');
                }
                
                
          
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
    
    

  }


/* --------------------------------------------------------------------------------- 
this.studentService.getTeamRequests(this.studentID, this.course_name).pipe(
  concatMap( tkn => {
    if(Object.keys(tkn).length !== 0){
      console.log('trovato token');
      console.log(tkn);
      this.studentService.getTeamMembers(tkn.teamId);
    }else{
      console.log('niente token');
    }
  })//parentesi concatMap
  )//parentesi pipe
  .subscribe( s => {
    console.log('dopppo');
    console.log(s);

  });








  this.studentService.getTeamRequests(this.studentID, this.course_name).subscribe(
    tkn => {
      if(Object.keys(tkn).length !== 0){
        console.log('trovato token');
        console.log(tkn);
        
        this.studentService.getTeamMembers(tkn.teamId).subscribe(
        s => {
          this.requestMap.set(tkn, s);
          console.log('mappa token-studenti');
          console.log(this.requestMap);
        });
      }else{
        console.log('niente token');
      }
      
      

      //qui per ogni teamId devo trovare i partecipanti e il nome
    },
    err => {
      console.log('nessuna richiesta gruppo!');
    }
  );






  this.studentService.getTeamRequests(this.studentID, this.course_name).subscribe(
              tkn => {
                if(Object.keys(tkn).length !== 0){
                  console.log('trovato token');
                  console.log(tkn);
                  
                  from(tkn).forEach( (t: Token) => {
                    console.log(t.id);
                    console.log(t.expiryDate);
                    console.log('CICLOOOOO');
                  });
                  this.studentService.getTeamMembers(tkn.teamId).subscribe(
                  s => {
                    this.requestMap.set(tkn, s);
                    console.log('mappa token-studenti');
                    console.log(this.requestMap);
                  });
                }else{
                  console.log('niente token');
                }
 --------------------------------------------------------------------------------- */
  



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



sendTeamRequest() {     //@@@@@@invia richiesta
  const val = this.form.value;
  if(!this.form.invalid) {
    let membersList: string[] = [];
    membersList.push(this.studentID);
    this.selection.selected.forEach(item => membersList.push(item.id));
    console.log(val.newGroupName);
    console.log(val.timeoutRequest);
    console.log(membersList);
    this.studentService.proposeTeamRequest(this.course_name, membersList, val.newGroupName).subscribe(res => console.log(res), err => console.log(err))
  }
  this.selection = new SelectionModel<Student>(true, []);
  
}


accept(tok :string) {
  console.log(tok);
  this.studentService.acceptRequest(tok).subscribe();
}

reject(tok :string) {
  console.log(tok);
  this.studentService.rejectRequest(tok).subscribe();
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
getMembers(teamId:number): void {
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


toArray(answers: object) {
  return Object.keys(answers).map(key => answers[key]);
}


inizializza_form(){
  this.form = this.fb.group({
    newGroupName: ['', Validators.required],
    timeoutRequest: ['', Validators.required]
  });
}



}
