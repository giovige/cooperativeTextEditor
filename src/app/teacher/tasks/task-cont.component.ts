import { Component, OnInit } from '@angular/core';
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

}
