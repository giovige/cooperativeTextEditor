import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Essay } from 'src/app/essay.model';
import { Task } from 'src/app/task.model';

@Component({
  selector: 'app-task-cont',
  templateUrl: './task-cont.component.html',
  styleUrls: ['./task-cont.component.css']
})
export class TaskContComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  tasks: Task[] = [{id: 1, dataRilascio: '01012020' ,dataScadenza: '31122020'},
                  {id: 2, dataRilascio: '01012020' ,dataScadenza: '31122020'},
                  {id: 3, dataRilascio: '02012020' ,dataScadenza: '31122020'},
  ];



  typesOfShoes: string[] = ['Boots', 'Clogs', 'Loafers', 'Moccasins', 'Sneakers'];



/*@@@@@@@@@@@@@@@@ lista elaborati */
columnsToDisplay: string[] = ['id', 'voto', 'stato'];
essayControl = new FormControl();


essays: Essay[] = [
  { id: 1, voto: 30,stato: 0},
  { id: 2, voto: 30,stato: 1},
  { id: 3, voto: 30,stato: 0},
  { id: 1, voto: 30,stato: 1},
  { id: 2, voto: 30,stato: 1},
  { id: 3, voto: 30,stato: 1},
];

addEssay() {     //@@@@@@invia elaborato  
  console.log('addessay()');
}

/* @@@@@@@@@@@@@@@@@@@@@*/

}


