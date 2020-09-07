import { Component, OnInit } from '@angular/core';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';
import { Delivery } from 'src/app/Classes/delivery';
import { DeliveryServiceService } from 'src/app/Services/delivery-service.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import {ExistDeliveryComponent} from '../exist-delivery/exist-delivery.component';


@Component({
  selector: 'app-new-delivery',
  templateUrl:'./new-delivery.component.html',
  styleUrls: ['./new-delivery.component.scss'],
  providers: [
    { provide: MatFormFieldControl, useExisting: NewDeliveryComponent }   
  ]
})
export class NewDeliveryComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  newDelivery:Delivery;
  listDelivery:Array<Delivery>=[];
  constructor(private dialog:MatDialog, private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder,private deliverySer: DeliveryServiceService,) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe(
      myParams=>{
        this.deliverySer.getDeliveries().subscribe(
          myData=>{
            this.listDelivery=myData;
          },
        )}
    )
  }

  initForm() {
   this.form = this.formBuilder.group({
    
      id: ['',Validators.required],
      name: [''],
      date:['',Validators.required],
      driving:[''],
      fromLocation:['',Validators.required],
      toLocation:['',Validators.required],
      packageCode:['',Validators.required],
      gmail:[''],
      reminder:[''],
      telephone:['',Validators.required]
     
    })

  }

  addDelivery() {
 this.submitted=true;
 this.newDelivery=new Delivery(this.form.value.id,this.form.value.name,this.form.value.date,this.form.value.driving,this.form.value.fromLocation,
  this.form.value.toLocation,this.form.value.packageCode,this.form.value.gmail,this.form.value.reminder,this.form.value.telephone)
 this.deliverySer.addDelivery(this.newDelivery).subscribe(
  myData => { console.log("add sucssesful");},
  myErr => { console.log(myErr.message); });



  }
  openDialog() {
    const dialogRef = this.dialog.open(ExistDeliveryComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  // dateClass = (d: Date): MatCalendarCellCssClasses => {
  //   const date = d.getDate();
  //   // Highlight the 1st and 20th day of each month.
  //   return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  // }

  // TODO : remove
  // email = new FormControl('', [Validators.required, Validators.email]);
  // getErrorMessage() {
  //   if (this.email.hasError('required')) {
  //     return 'You must enter a value';
  //   }

  //   return this.email.hasError('email') ? 'Not a valid email' : '';
  // }
}
