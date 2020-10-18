import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-vm-dialog',
  templateUrl: './add-vm-dialog.component.html',
  styleUrls: ['./add-vm-dialog.component.css']
})
export class AddVmDialogComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  form: FormGroup;
}
