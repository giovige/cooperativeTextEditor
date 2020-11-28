import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { StudentService } from 'src/app/service/student.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Vm } from 'src/app/vm.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-add-vm-dialog',
  templateUrl: './add-vm-dialog.component.html',
  styleUrls: ['./add-vm-dialog.component.css']
})
export class AddVmDialogComponent implements OnInit {
  
  form: FormGroup;
  vcpu = new FormControl('', [Validators.required]);
  gbdisk = new FormControl('', [Validators.required]);
  gbram = new FormControl('', [Validators.required]);
  studId: string;
  coursename: string;
  teamId: number; 

  testo = new FormControl();
  selectedFiles: FileList;
  currentFileUpload: File;
  selectedFile = null;
  changeImage = false;


  constructor(private fb: FormBuilder, private studentService : StudentService, private authService: AuthService, 
    public dialogRef: MatDialogRef<AddVmDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) {
    this.form = this.fb.group({
      testo: [''],
      vcpu: ['', Validators.required],
      gbdisk: ['', Validators.required],
      gbram: ['', Validators.required]
    });
    this.studId = data.studId;
    this.coursename = data.coursename;
    this.teamId = data.teamId;
   }

  ngOnInit(): void {
  }


  getErrorvcpuMessage() {
    if(this.vcpu.hasError('required')){
      return 'vcpu value required';
    }
}

  getErrorgbdiskMessage(){
    if(this.gbdisk.hasError('required')){
      return 'gbdisk value required';
    }
  }


  getErrorgbramMessage(){
    if(this.gbram.hasError('required')){
      return 'gbram value required';
    }
  }

/* 

  addVM(): void {         //PostMapping("/{id}/teams/{teamId}/vm")
    console.log('addVM');
    const val = this.form.value;
    
    if(!this.form.invalid) {
      console.log('tutto okk');
      let vmtoAdd: Vm;
      vmtoAdd=val;
      this.studentService.createNewVM(this.studId, this.teamId, vmtoAdd).subscribe(
        ok => {
          this.dialogRef.close();
        }
      );
    }
  }

 */

    change($event) {
      this.changeImage = true;
    }

    changedImage(event) {
      this.selectedFile = event.target.files[0];
    }
    
    selectFile(event) {
      this.selectedFiles = event.target.files;
    }

   addVM(): void {        
   this.currentFileUpload = this.selectedFiles.item(0);
   const val = this.form.value;
   if(!this.form.invalid) {
     let vmtoAdd: Vm;
     vmtoAdd=val;
     this.studentService.createNewVM(this.studId, this.teamId, vmtoAdd).subscribe(
       v => {
        console.log(v);   
        vmtoAdd = v;
        //adesso setto la immagine
        this.studentService.setImageVM(this.studId, this.teamId, vmtoAdd.id, this.currentFileUpload).
         subscribe(v => {
           //console.log(v)
          },
         err => alert("Si è verificato un errore nell'aggiunta dell'immagine!"));
        //fine set img

        this.selectedFiles = undefined;

        this.dialogRef.close();
       },
       err => alert("Si è verificato un errore nella creazione vm!")
     );
   }
 }


}