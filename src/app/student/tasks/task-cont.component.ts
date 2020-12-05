import { DataSource } from '@angular/cdk/table';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { endWith } from 'rxjs/operators';
import { AuthService } from 'src/app/auth/auth.service';
import { Essay } from 'src/app/essay.model';
import { Image } from 'src/app/image.model';
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
  studId: string;
  essay: Essay;

  columnsToDisplay: string[] = ['id', 'voto', 'stato', 'lastModified'];
  essayImages: Image[];
  tasks: Task[];
  hasStorical: boolean;


  /*Form aggiunta elaborato*/
  selectedFiles: FileList;
  currentFileUpload: File;
  selectedFile = null;
  changeImage = false;
  form: FormGroup;
 


  constructor(private activatedRoute: ActivatedRoute, private studentService: StudentService, private authService: AuthService, private sanitizer: DomSanitizer) {
    this.taskId=0;
    this.hasStorical=false;
   }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe( p => {
      this.coursename = p['course_name'];
      this.studId = this.authService.getStudentId();
      this.loadTasks();
    });
    this.inizializza_form();
  }



loadTasks():void {
  this.studentService.getTasksForCourse(this.coursename).subscribe(v => {
    this.tasks = v;
    this.tasks.forEach( tsk => {
      let objectURL = 'data:image/png;base64,' + tsk.description;
      tsk.description = this.sanitizer.bypassSecurityTrustUrl(objectURL);
    });
  });
}

clickedTask(id: number):void {
  this.taskId = id;
  this.essay = null;
  this.hasStorical=false;

  //TODO: aggiungere dialog con viualizzazione img Task
  
  this.studentService.getEssayIfExists(this.coursename, id, this.studId).subscribe(
    res => {
      this.essayId = res.id;
      this.essay = res;
      console.log('exist essay id = '+ res.id);

      this.getStorical();
    },
    err => {
      this.studentService.createFirstEssay(this.coursename, id).subscribe(
        ess => {
          console.log('new essay id = '+ ess.id);
          this.essay = ess;
          this.essayId = ess.id;
          this.getStorical();
        }
      );
    }
  );
  
  
  
  
}



  showStorical(){
    if(this.hasStorical===true)
      this.hasStorical=false;
    else
      this.hasStorical=true;
  }



  getStorical(){
    this.studentService.getEssayStorical(this.coursename, this.studId,this.taskId,this.essayId) .subscribe(
      img => {
        this.essayImages = img;
        this.essayImages.forEach(img => {
          let objectURL = 'data:image/png;base64,' + img.data;
          img.data = this.sanitizer.bypassSecurityTrustUrl(objectURL);
        });
        console.log(this.essayImages);
      }
    );
  }




change($event) {
  this.changeImage = true;
}

changedImage(event) {
  this.selectedFile = event.target.files[0];
}

selectFile(event) {
  this.selectedFiles = event.target.files;
}

inizializza_form() {
  this.form = new FormGroup({
    'testo': new FormControl()
  });
}


addEssay():void {
  this.currentFileUpload = this.selectedFiles.item(0);
  this.studentService.addStudentEssay(this.coursename, this.taskId,this.essayId,this.currentFileUpload).subscribe(
    s => {
      console.log(s);   
      this.getStorical();
      this.selectedFiles = undefined;
    
    },

    err => {
      alert("Si è verificato un errore!")
    }

  );
}  








 






}


