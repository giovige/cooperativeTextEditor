import { Component, ViewChild, EventEmitter ,ElementRef, OnInit, Output, Input, AfterViewInit } from '@angular/core';
import {MatTable} from '@angular/material/table';
import {Student} from 'src/app/student.model'
import {SelectionModel, DataSource} from '@angular/cdk/collections';
import { Vm } from '../../vm.model';


@Component({
  selector: 'app-vms-cont-component',
  templateUrl: './vms-cont-component.component.html',
  styleUrls: ['./vms-cont-component.component.css']
})
export class VmsContComponentComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  @ViewChild('table') table: MatTable<Element>;

    @Input()
    actualVm: Vm = { id: null, vcpu: null, GBDisk: null, GBRam: null, status: null, idCreatore: '', team: null, owners: null};
    
    
    dataSource: Vm[] = [
      { id: 1, vcpu: 13, GBDisk: 54, GBRam: 76, status: 1, idCreatore: '261088', team: null, owners: null},
      { id: 2, vcpu: 54, GBDisk: 548, GBRam: 6, status: 0, idCreatore: '261088', team: null, owners: null},
      { id: 3, vcpu: 545, GBDisk: 86, GBRam: 65, status: 0, idCreatore: '261088', team: null, owners: null}
    ];


    selection = new SelectionModel<Vm>(true, []);
/*
    freeStudents: Student[] = [
      { id: '261098', serial:'1', name: 'ini', firstName: 'enzo', courseId: '432', groupId:'32'},
      { id: '261088', serial:'2', name: 'bianchi', firstName: 'paolo', courseId: '34', groupId:'33'},
      { id: '261078', serial:'3', name: 'verdi', firstName: 'biagio', courseId: '32', groupId:'32'}
    ];*/
    
    
    
    
    
    vmsColumns: string[] = ['select', 'id', 'vcpu','GBDisk','GBRam','status'];
    
    
    sendRequest() {     //@@@@@@invia richiesta  
      console.log();
      console.log();
      console.log();
      console.log(this.selection);
    
    }



}