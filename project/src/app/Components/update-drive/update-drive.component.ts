import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { title } from 'process';
import { Drive } from 'src/app/Classes/drive';
import { DriveService } from 'src/app/Services/drive.service';
import { UserService } from 'src/app/Services/user.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-update-drive',
  templateUrl: './update-drive.component.html',
  styleUrls: ['./update-drive.component.scss']
})
export class UpdateDriveComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  newDrive:Drive;
  drive:Drive;
  minDate:Date;
  from="";
  fromLat=0;
  fromLng=0;
  to="";
  toLat=0;
  toLng=0;
  
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  constructor(private dialog:MatDialog, private formBuilder: FormBuilder,private driveSer: DriveService, private userSer:UserService) { }
     

  ngOnInit(): void {
    console.log("old drive",this.drive)
    this.initForm();
    this.minDate=new Date();
  }

  initForm() {    
    this.form = this.formBuilder.group({
      driverCode: [this.userSer.currentUser.userCode||''],
      trans:[this.drive.transportation||'',Validators.required],
      driving:[this.drive.drivingTime||'',Validators.required],
      date:[this.drive.travelDate||'',Validators.required],
      fromLocation:[this.drive.fromLocationFormat||'',Validators.required],
      toLocation:[this.drive.toLocationFormat||'',Validators.required],
      price:[this.drive.price||''],
      describeDrive:[this.drive.describeDrive||'']
    })
   
  }
  updateDrive()
  {
    debugger
    //במידה ושינה את 2 הכתובות
    if(this.from&&this.to)
    this.newDrive=new Drive(this.drive.driveCode,this.userSer.currentUser.userCode,null,this.form.value.driving,this.form.value.date,
      0,this.from,this.fromLat,this.fromLng,0,this.to,this.toLat,this.toLng,this.form.value.describeDrive,true,this.form.value.trans,this.form.value.price,this.drive.message,this.drive.distance,this.drive.transportationType,new Date(),this.drive.listWaiting,this.drive.driverName);
      //במידה ושינה רק את המוצא
    else if(this.from&&!this.to)
    this.newDrive=new Drive(this.drive.driveCode,this.userSer.currentUser.userCode,null,this.form.value.driving,this.form.value.date,
      0,this.from,this.fromLat,this.fromLng,this.drive.toLocationId,null,0,0,this.form.value.describeDrive,true,this.form.value.trans,this.form.value.price,this.drive.message,this.drive.distance,this.drive.transportationType,new Date(),this.drive.listWaiting,this.drive.driverName );
      //במידה ושינה רק את היעד
    else if(!this.from&&this.to)
    this.newDrive=new Drive(this.drive.driveCode,this.userSer.currentUser.userCode,null,this.form.value.driving,this.form.value.date,
    this.drive.fromLocationId,null,0,0,0,this.to,this.toLat,this.toLng,this.form.value.describeDrive,true,this.form.value.trans,this.form.value.price,this.drive.message,this.drive.distance,this.drive.transportationType,new Date(),this.drive.listWaiting,this.drive.driverName);
     //במידה ולא שינה כלום
     else if(!this.from&&!this.to)
     this.newDrive=new Drive(this.drive.driveCode,this.userSer.currentUser.userCode,null,this.form.value.driving,this.form.value.date,
      this.drive.fromLocationId,null,0,0,this.drive.toLocationId,null,0,0,this.form.value.describeDrive,true,this.form.value.trans,this.form.value.price,this.drive.message,this.drive.distance,this.drive.transportationType,new Date(),this.drive.listWaiting,this.drive.driverName);    
      debugger
      console.log("new package",this.newDrive);
     this.driveSer.updateDrive(this.newDrive,this.drive.listWaiting).subscribe(
      myData => {console.log("from subscribe",this.newDrive);
      swal({title:"עודכן בהצלחה!",icon:"success"})
      },
      myErr => {console.log("from subscribe",this.newDrive); 
      swal({title:"שגיאה!",text:"נסה שנית ",icon:"error"})
    });
  
  }
  

  public handleAddressFromChange(address: Address) {
    debugger
    this.from=address.formatted_address;
    this.fromLat=address.geometry.location.lat();
    this.fromLng=address.geometry.location.lng();
  // Do some stuff
  }
  public handleAddressToChange(address: Address) {
  debugger
  this.to=address.formatted_address;
  this.toLat=address.geometry.location.lat();
  this.toLng=address.geometry.location.lng();
  // Do some stuff
  }
  public dirs: Array<any> = [{
  origin: { lat: 6.8403134, lng: 80.0021128 },
  destination: { lat: 6.71532762, lng: 80.06215197 },
  renderOptions: { polylineOptions: { strokeColor: '#f00' } },
  }, {
  origin: { lat: 6.4319639, lng: 79.9983415 },
  destination: { lat: 6.73906232, lng: 80.15640132 },
  renderOptions: { polylineOptions: { strokeColor: '#0f0' } },
  }];
  


}
