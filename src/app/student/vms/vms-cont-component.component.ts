import { Component, ViewChild, EventEmitter ,ElementRef, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import {MatTable} from '@angular/material/table';
import {Student} from 'src/app/student.model'
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import { Vm } from '../../vm.model';
import {MatDialogModule,MatDialog} from '@angular/material/dialog'; 
import {AddVmDialogComponent} from './add_vm/add-vm-dialog.component';
import {EditVmDialogComponent} from './edit_vm/edit-vm-dialog.component';
import { AuthService } from 'src/app/auth/auth.service';
import { StudentService } from 'src/app/service/student.service';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-vms-cont-component',
  templateUrl: './vms-cont-component.component.html',
  styleUrls: ['./vms-cont-component.component.css']
})
export class VmsContComponentComponent implements OnInit {
  inAteamObs: Observable<any>;
  studentID: string;
  coursename: string;
  teamId: number;
  dataSource: Vm[] = [];

  constructor(public dialog: MatDialog, private activatedRoute: ActivatedRoute, private studentService: StudentService, private authService: AuthService) {
      this.dataSource= [];
            
      //console.log('constructor  ');
   }


  ngOnInit(): void {

     this.studentID = this.authService.getStudentId();
      this.activatedRoute.params.subscribe( p => {
      this.coursename = p['course_name'];

      this.inAteamObs = this.studentService.studentHasTeam(this.studentID, this.coursename);

      this.studentService.getStudentTeamByCourse(this.studentID, p['course_name']).subscribe( t =>  {
         this.teamId = t.id;
         
         this.getTeamVms(this.studentID, this.teamId);
      });
    });
    //console.log('ngOnInit  ');
    
  }


  

    @Input()
    actualVm: Vm = { id: null, vcpu: null, gbdisk: null, gbram: null, status: null,idCreatore: null, screenVm: null};
    
      

    //ADD
    openDialogAdd(): void {
      const dialogRef = this.dialog.open(AddVmDialogComponent, {
        width: '300px',
        data: { studId: this.studentID, coursename: this.coursename, teamId: this.teamId }
    });
      dialogRef.afterClosed().subscribe( end => {
        this.getTeamVms(this.studentID, this.teamId);
      });
      
    }



    //EDIT
    openDialogEdit(vmId: number): void {
      let vmtoedit:Vm[] = this.dataSource.filter(e => e.id === vmId);
      console.log(vmtoedit);
      const dialogRef = this.dialog.open(EditVmDialogComponent, {
        width: '300px',
        data: { studId: this.studentID, coursename: this.coursename, teamId: this.teamId, vm: vmtoedit[0], vmId: vmId }
    });
      dialogRef.afterClosed().subscribe( 
        res => {
        this.getTeamVms(this.studentID, this.teamId);
      }
      );
      
    }




    getTeamVms(stud_id: string, teamId: number): void {
    //GetMapping("/{id}/teams/{teamId}/vms")                getVm from team
      this.studentService.getStudentVMsByCourse(stud_id,teamId).subscribe( v => {
        this.dataSource = v;
      });

    }


    changeVMstatus(vmId: number): void {
      //PutMapping("/{id}/teams/{teamid}/vms/{vmId}/switch")
      this.studentService.changeStatusToVM(this.studentID, this.teamId, vmId).subscribe( end => {
        this.getTeamVms(this.studentID, this.teamId);
      });
    }

    
    deleteVM(vmId: number): void {
      //DeleteMapping("/{id}/teams/{teamid}/vms/{vmId}")
      this.studentService.deleteVM(this.studentID, this.teamId, vmId).subscribe( end => {
        this.getTeamVms(this.studentID, this.teamId);
      });
    }
   

    connect(vmId: number): void {
      alert('connessionee');
    }

}