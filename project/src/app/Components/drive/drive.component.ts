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
  static rand=1;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;


  constructor(private dialog:MatDialog, private activatedRoute:ActivatedRoute,
     private formBuilder: FormBuilder,private driveSer: DriveService, private userSer:UserService) { }
     

  ngOnInit(): void {
    this.initForm();
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

  randFunction()
  {
    return DriveComponent.rand=(DriveComponent.rand*1000)/20;
  }
  
  initForm() {
    console.log("this.userSer.currentUser.userCode  "+this.userSer.currentUser.userCode);
    
    this.form = this.formBuilder.group({
      driverCode: [this.userSer.currentUser.userCode||''],
      driving:['',Validators.required],
      date:['',Validators.required],
      fromLocation:[''],
      toLocation:[''],
      packageSizeCode:['',Validators.required],
      reminder:[''],
      transportation:[''],
      describeDrive:['']
     // wasPerformed:['',Validators.required]
    })
   
  }
a:boolean
  addDrive() {
    debugger
 this.submitted=true;
 this.newDrive=new Drive(this.form.value.driverCode,null,this.form.value.driving,this.form.value.date,
  this.from,this.fromLat,this.fromLng,this.to,this.toLat,this.toLng,this.form.value.packageSizeCode,
  this.form.value.reminder,this.form.value.describeDrive);
 this.driveSer.addDrive(this.newDrive).subscribe(
  myData => { console.log(myData);
  this.driveSer.allDrives.push(this.newDrive);
},
  myErr => { console.log(myErr.message); });
  // const dialogRef = this.dialog.open(TravelListForDeliveryComponent);
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
