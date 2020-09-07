import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatButton } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { NewCustomerComponent } from '../new-customer/new-customer.component';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  size:FormControl;
  constructor(private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder,private dialog:MatDialog) { }
  
  ngOnInit(): void {
   // this.initForm();
   
  }

  initForm() {
   this.form = this.formBuilder.group({
    //  size:this.formBuilder.control({
    
    // }),
     describe:[""]
    })

  }

  saveSize()
  {
  
  }
  addOrder()
  {
this.submitted=true;
alert(this.form.value.size)
  }

  openDialog() {
    const dialogRef = this.dialog.open(NewCustomerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
