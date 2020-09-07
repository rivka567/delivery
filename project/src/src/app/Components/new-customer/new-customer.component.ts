import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Customer } from 'src/app/Classes/customer';
import { CustomerService } from 'src/app/Services/customer.service';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.scss']
})
export class NewCustomerComponent implements OnInit {

  form:FormGroup;
  submitted=false;
  newCustomer:Customer;
  constructor( private formBuilder: FormBuilder,private customerSer:CustomerService) { }

  ngOnInit(): void {
    this.initForm();
  }

  initForm() {
    this.form = this.formBuilder.group({
     
       id: ['',Validators.required],
       name: [''],
       date:['',Validators.required],
       driving:['',Validators.required],
       fromLocation:['',Validators.required],
       toLocation:[''],
       rediness:[''],
       packageCode:[''],
       gmail:[''],
       telephone:['',Validators.required],
       deliveryCode:['',Validators.required],
       delConfirm:[''],
       waitConfirm:[''],
       reminder:[''],
       levelHappiness:[''],
       happiness:['']
     })
   }
   addCustomer() {
    this.submitted=true;
    this.newCustomer=new Customer(this.form.value.id, this.form.value.name, this.form.value.date, this.form.value.driving, this.form.value.fromLocation,  this.form.value.toLocation,
    this.form.value.rediness,this.form.value.packageCode,this.form.value.gmail,this.form.value.telephone, this.form.value.deliveryCode,this.form.value.delConfirm, this.form.value.waitConfirm,
  this.form.value.reminder,this.form.value.levelHappiness,this.form.value.happiness)
     this.customerSer.addCustomer(this.newCustomer).subscribe(
     myData => { console.log("add sucssesful");},
     myErr => { console.log(myErr.message); })
    }
}
