import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { stringify } from 'querystring';
import { Package } from 'src/app/Classes/package';
import { PackageService } from 'src/app/Services/package.service';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { TravelListComponent } from '../travel-list/travel-list.component';
import { DatePipe, Time } from '@angular/common';
import { disableDebugTools } from '@angular/platform-browser';
import { cpuUsage } from 'process';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  newPackage:Package;
  minDate: Date;
  
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  // size:FormControl;
  constructor(private userSer:UserService,private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder,private dialog:MatDialog, private packageSer:PackageService,
    private router:Router) { 
    this.minDate = new Date();
    }
  
  ngOnInit(): void {
   this.initForm();
  }

 
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();
    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  }
  

  initForm() {
   this.form = this.formBuilder.group({
    size:['',Validators.required],
    customerCode:[this.userSer.currentUser.userCode||'',Validators.required],
    fromLocation:['',Validators.required],
    toLocation:['',Validators.required],
    drivingTime:['',Validators.required],
    travelDate:['',Validators.required],
    describeHappiness:[''],
    happinessLevel:[''],
    describePackage:[''],
    type:['',Validators.required],
    })
  }
  checkSize(){
    alert(this.form.value.size)
  }
  savePackageAtService()
  {
    debugger
    this.newPackage=new Package(this.form.value.customerCode,null,this.from,this.fromLat,this.fromLng,this.to,this.toLat,this.toLng,
      this.form.value.travelDate,this.form.value.drivingTime,false,this.form.value.happinessLevel,this.form.value.describeHappiness,
      this.form.value.type,this.form.value.describePackage,this.form.value.size);
      console.log(this.newPackage);
      this.packageSer.currentPackage=this.newPackage;
      debugger
      console.log("from package component"+this.packageSer.currentPackage);
      this.openDialog();
  }

  addPackage()
  {
  debugger
  alert("add package function");
  this.newPackage=new Package(this.form.value.customerCode,null,this.from,this.fromLat,this.fromLng,this.to,this.toLat,this.toLng,
    this.form.value.travelDate,this.form.value.drivingTime,false,this.form.value.happinessLevel,this.form.value.describeHappiness,
    this.form.value.type,this.form.value.describePackage,this.form.value.size);
  console.log(this.newPackage);
  this.packageSer.addPackage(this.newPackage).subscribe(
    myData => {console.log("from subscribe",this.newPackage);
     console.log("add sucssesful");
    this.openDialog();
    },
    myErr => {console.log("from subscribe",this.newPackage); 
    console.log(myErr.message);
  });
    this.packageSer.currentPackage=this.newPackage;
    debugger
    console.log("from package component"+this.packageSer.currentPackage);
  }

  openDialog() {
    const dialogRef = this.dialog.open(TravelListComponent,{ disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
   this.router.navigate(['/main'])
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
