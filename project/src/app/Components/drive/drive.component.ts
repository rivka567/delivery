import { Component, OnInit,ViewChild } from '@angular/core';
import { Validators, FormGroup, FormBuilder } from '@angular/forms';
import { Drive } from 'src/app/Classes/drive';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DriveService } from 'src/app/Services/drive.service';
import { UserService } from 'src/app/Services/user.service';
import { ExistUserComponent } from '../exist-user/exist-user.component';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { isNullOrUndefined } from 'util';
import { PackageService } from 'src/app/Services/package.service';
import { EmailManagementService } from 'src/app/Services/email-management.service';


@Component({
  selector: 'app-drive',
  templateUrl: './drive.component.html',
  styleUrls: ['./drive.component.scss']
})
export class DriveComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  newDrive:Drive;
  listDrive:Array<Drive>=[];
  minDate:Date;
  isDrive:boolean;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;


  constructor(private emailSer:EmailManagementService, private dialog:MatDialog, private activatedRoute:ActivatedRoute,private packageSer:PackageService,
     private formBuilder: FormBuilder,private driveSer: DriveService, private userSer:UserService) { }
     

  ngOnInit(): void {
    this.initForm();
    this.minDate=new Date();
    // this.activatedRoute.params.subscribe(
    //   myParams=>{
    //     this.driveSer.getDrives().subscribe(
    //       myData=>{
    //         this.listDrive=myData;
    //       },
    //     )}
    // )
    // this.newDrive=new Drive(5,null,null,null,null,null,0,0,null,0,0,null,0,null,null,null,false);

  }

  initForm() {
    console.log("this.userSer.currentUser.userCode  "+this.userSer.currentUser.userCode);
    
    this.form = this.formBuilder.group({
      trans:['',Validators.required],
      driverCode: [this.userSer.currentUser.userCode||''],
      driving:['',Validators.required],
      date:['',Validators.required],
      fromLocation:[''],
      toLocation:[''],
      price:[''],
      describeDrive:['']
    })
   
  }
  addDrive() {
    debugger
 this.submitted=true;
 this.newDrive=new Drive(0,this.form.value.driverCode,null,this.form.value.driving,this.form.value.date,
  0,this.from,this.fromLat,this.fromLng,0,this.to,this.toLat,this.toLng,this.form.value.describeDrive,
  true,this.form.value.trans,this.form.value.price,false,500);
 this.driveSer.addDrive(this.newDrive).subscribe(
  myData => { 
  alert("add sucssesful");
  this.driveSer.currentDrive=myData;
  debugger
  if(this.isDrive)
  {
    debugger

    this.emailSer.sendDriveByEmail(this.packageSer.currentPackage, this.userSer.myCustomer.userMail,this.userSer.currentUser.userName+" "+"מעוניין לקחת חבילה שלך",this.driveSer.currentDrive)
    .subscribe(
        myData=>{alert(myData)},
        myErr=>{alert("error")}
    );
  }
},
  myErr => { console.log(myErr.message); });


  }

    from="";
    fromLat=0;
    fromLng=0;
    to="";
    toLat=0;
    toLng=0;
  public handleAddressFromChange(address: Address) {
    debugger
    this.from=address.formatted_address;
    this.fromLat=address.geometry.location.lat();
    this.fromLng=address.geometry.location.lng();
    console.log(address.formatted_address +" "+address.geometry.location.lat()+ " "+address.geometry.location.lng())
  // Do some stuff
}
public handleAddressToChange(address: Address) {
  debugger
  this.to=address.formatted_address;
  this.toLat=address.geometry.location.lat();
  this.toLng=address.geometry.location.lng();
  console.log(address.formatted_address +" "+address.geometry.location.lat()+ " "+address.geometry.location.lng())
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
