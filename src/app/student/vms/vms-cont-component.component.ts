import { Component, ViewChild, EventEmitter ,ElementRef, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import {MatTable} from '@angular/material/table';
import {Student} from 'src/app/student.model'
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import { Vm } from '../../vm.model';
import {MatDialogModule,MatDialog} from '@angular/material/dialog'; 
import {AddVmDialogComponent} from './add-vm-dialog.component';
import { AuthService } from 'src/app/auth/auth.service';
import { StudentService } from 'src/app/service/student.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vms-cont-component',
  templateUrl: './vms-cont-component.component.html',
  styleUrls: ['./vms-cont-component.component.css']
})
export class VmsContComponentComponent implements OnInit {

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

      this.studentService.getStudentTeamByCourse(this.studentID, p['course_name']).subscribe( t =>  {
         this.teamId = t.id;
         
         this.getTeamVms(this.studentID, this.teamId);
      });
    });
    //console.log('ngOnInit  ');
    

  }


  

    @Input()
    actualVm: Vm = { id: null, vcpu: null, GBDisk: null, GBRam: null, status: null,idCreatore: null, screenVm: null};
    
    
    
    /* dataSource: Vm[] = [
      { id: 1, vcpu: 13, GBDisk: 54, GBRam: 76, status: 1, idCreatore: 's263206'},
      { id: 2, vcpu: 54, GBDisk: 548, GBRam: 6, status: 0, idCreatore: 's200043'},
      { id: 3, vcpu: 545, GBDisk: 86, GBRam: 65, status: 0, idCreatore: 's263206'}
    ]; */

  


    openDialog(): void {
      const dialogRef = this.dialog.open(AddVmDialogComponent, {
        width: '300px',
        data: { studId: this.studentID, coursename: this.coursename, teamId: this.teamId }
    });
      dialogRef.afterClosed().subscribe( end => {
        this.getTeamVms(this.studentID, this.teamId);
      });
      
    }




    getTeamVms(stud_id: string, teamId: number): void {
    //GetMapping("/{id}/teams/{teamId}/vms")                getVm from team
      this.studentService.getStudentVMsByCourse(stud_id,teamId).subscribe( v => {
        this.dataSource = v;
        //console.log(this.dataSource);
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


    modifyVM(vmId: number): void {
      alert('modifichiamoo');
    }
    

    connect(vmId: number): void {
      alert('connessionee');
    }

}