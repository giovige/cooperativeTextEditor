import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { endWith } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Essay } from 'src/app/essay.model';
import { StudentService } from 'src/app/service/student.service';
import { Task } from 'src/app/task.model';

@Component({
  selector: 'app-task-cont',
  templateUrl: './task-cont.component.html',
  styleUrls: ['./task-cont.component.css']
})
export class TaskContComponent implements OnInit {
  
  coursename: string;
  taskId: number;
  essayId: number;

  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService, private authService: AuthService) {
    this.taskId=0;
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( p => {
      this.coursename = p['course_name'];
      this.loadTasks();
    });
  }

  
  /*----------------------------------- lista consegne ---------------------------------------------*/

  /* tasks: Task[] = [{id: 1, dataRilascio: '01012020' ,dataScadenza: '31122020', description: ''},
  {id: 2, dataRilascio: '01012020' ,dataScadenza: '31122020', description: ''},
  {id: 3, dataRilascio: '02012020' ,dataScadenza: '31122020', description: ''},
  ]; */

  tasks: Task[];



/*----------------------------------- lista elaborati ---------------------------------------------*/
columnsToDisplay: string[] = ['id', 'voto', 'stato', 'lastModified'];
essayControl = new FormControl();


essays: Essay[];



clickedTask(id: number):void {
  this.taskId = id;
  this.loadEssays(this.taskId);
}

loadTasks():void {
  this.studentService.getTasksForCourse(this.coursename).subscribe(v => {
    this.tasks = v;
  });
}


loadEssays(taskId: number):void {
  this.studentService.getEssaysByTask(this.coursename, taskId).subscribe(
    v => {
      this.essays = v;
    }
  );
}


addEssay(taskId: number):void {
  this.studentService.addStudentEssay(this.coursename, taskId).subscribe();
}



}


