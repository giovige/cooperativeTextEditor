import { Component, ViewChild, EventEmitter ,ElementRef, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import {Student} from 'src/app/student.model'
import {MatTableDataSource} from '@angular/material/table';
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import {FormControl, Form} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatAutocompleteModule, MatAutocompleteSelectedEvent} from '@angular/material/autocomplete'; 
import {MatTable} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {MatPaginator} from '@angular/material/paginator';
import { group } from '@angular/animations';
import {MatExpansionModule,MatAccordion} from '@angular/material/expansion'; 
import {MatButtonModule} from '@angular/material/button'; 

@Component({
  selector: 'app-groups-cont',
  templateUrl: './groups-cont.component.html',
  styleUrls: ['./groups-cont.component.css']
})
export class GroupsContComponent implements OnInit {
  
  alreadyInGroup = true;    //@@@@@@@@@@@ selezionatore della vista opportuna

  @ViewChild('table') table: MatTable<Element>;

  @Input()
  actualUser: Student = { id: '', serial:'', name: '', firstName: '', courseId: '', groupId:''};

  

  dataSource: Student[] = [
    { id: '261098', serial:'1', name: 'ini', firstName: 'enzo', courseId: '', groupId:''},
    { id: '261088', serial:'2', name: 'bianchi', firstName: 'paolo', courseId: '', groupId:''},
    { id: '261078', serial:'3', name: 'verdi', firstName: 'biagio', courseId: '', groupId:''},
    // { id: '261068', serial:'4', name: 'russo', firstName: 'giovanni', courseId: '', groupId:''},
    // { id: '261058', serial:'1', name: 'ferrari', firstName: 'giorgio', courseId: '', groupId:''},
    // { id: '261048', serial:'2', name: 'esposito', firstName: 'mattia', courseId: '', groupId:''},
    // { id: '261038', serial:'4', name: 'freco', firstName: 'corrado', courseId: '', groupId:''},
    // { id: '261032', serial:'4', name: 'marino', firstName: 'Paolo', courseId: '', groupId:''}
  ];


  constructor() { }



  ngOnInit(): void {
  }



  



//@@@@@@@@@@@@@@@@@@@@@@@@@@@@ parte di tabella per registrazione gruppo @@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@

selection = new SelectionModel<Student>(true, []);

freeStudents: Student[] = [
  { id: '261098', serial:'1', name: 'ini', firstName: 'enzo', courseId: '432', groupId:'32'},
  { id: '261088', serial:'2', name: 'bianchi', firstName: 'paolo', courseId: '34', groupId:'33'},
  { id: '261078', serial:'3', name: 'verdi', firstName: 'biagio', courseId: '32', groupId:'32'}
];

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
 
group: Student[] = [{ id: '261098', serial:'1', name: 'ini', firstName: 'enzo', courseId: '432', groupId:'32'}, 
                    { id: '261088', serial:'2', name: 'bianchi', firstName: 'paolo', courseId: '34', groupId:'33'} 
];

groupColumns: string[] = ['select','name', 'firstName'];

groupName:string='gruppo2';


}
