import { Component, OnInit,ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
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
import { type } from 'os';
import { types } from 'util';
import { DriveService } from 'src/app/Services/drive.service';
import { EmailManagementService } from 'src/app/Services/email-management.service';
import { validateVerticalPosition } from '@angular/cdk/overlay';
import { Drive } from 'src/app/Classes/drive';
import swal from 'sweetalert';

@Component({
  selector: 'app-package',
  templateUrl: './package.component.html',
  styleUrls: ['./package.component.scss']
})
export class PackageComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  newPackage:Package;
  isPackage=false;
  myFilterDrives:Drive[];
  minDateToDate=new Date();
  minDateFromDate=new Date();
  maxDateFromDate:Date;
  minTime:any
  price:number
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  constructor(private emailSer:EmailManagementService, private userSer:UserService,private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder,private dialog:MatDialog, 
    private packageSer:PackageService, private driveSer:DriveService,private router:Router,private dialogRef:MatDialogRef<PackageComponent>) { 
  
    }

  ngOnInit(): void {
   this.initForm();
  }

  updateMinDateToDate(minDate:Date)
  {
   debugger
   this.minDateToDate=new Date(minDate)
  if(new Date(this.minDateToDate).getDate()==new Date().getDate())
  {
  this.minTime=new Date().getTime();
  }
  }
  
  updatemaxDateFromDate(maxDate:Date)
  {
    this.maxDateFromDate=new Date(maxDate);
  }
  dateClass = (d: Date): MatCalendarCellCssClasses => {
    const date = d.getDate();
    // Highlight the 1st and 20th day of each month.
    return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
  }
  

  initForm() {
   this.form = this.formBuilder.group({
    size:['',Validators.required],
    // customerCode:[this.userSer.currentUser.userCode||'',Validators.required],
    fromLocation:['',Validators.required],
    toLocation:['',Validators.required],
    fromDate:[new Date()||'',Validators.required],
    toDate:['',Validators.required],
    fromTime:['',Validators.required],
    toTime:['',Validators.required],
    describePackage:[''],
    type:['',Validators.required],
    mes:[''||false,Validators.required],
    distance:['']
    })
  }
  
  checkSize(){
    alert(this.form.value.size)
  }

showPrice()
{
  let distance= google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.packageSer.currentPackage.toLocationLat,this.packageSer.currentPackage.toLocationLng), new google.maps.LatLng(this.packageSer.currentPackage.fromLocationLat,this.packageSer.currentPackage.fromLocationLng)); 
  this.price=((distance/1000)*this.driveSer.currentDrive.price)
  swal("עלות המשלוח "+this.price,"-מרחק של כ"+distance/1000%1000+" קילומטר")
}

  addPackage()
  {
  debugger
  this.newPackage=new Package(0,this.userSer.currentUser.userCode,null,0,this.from,this.fromLat,this.fromLng,0,this.to,this.toLat,this.toLng,
    this.form.value.fromDate,this.form.value.toDate,this.form.value.fromTime,this.form.value.toTime,true,
    this.form.value.type,this.form.value.describePackage,this.form.value.size,this.form.value.mes,this.form.value.distance||0);
  
    if(this.isPackage)
  {
    this.showPrice();
  }
    this.packageSer.addPackage(this.newPackage).subscribe(
    myData => {
    console.log("from subscribe",this.newPackage);
    swal({title:"נוסף בהצלחה!",icon:"success"})
    // this.dialogRef.close();
    this.packageSer.currentPackage=myData;
    debugger

    //אם יצר חבילה חדשה לשליחת מייל
    if(this.isPackage)
    {
      this.emailSer.sendPackageToDelivery(this.driveSer.currentDrive,this.userSer.myDriver.userMail,this.userSer.currentUser.userName+" "+"מעוניין/ת במשלוח",this.packageSer.currentPackage,this.price).
      subscribe(
          myData=>{ swal({title:"נשלח בהצלחה!",icon:"success"})
          this.dialogRef.close();
        },
          myErr=>{alert("error")}
      );
    }

    //מביא את כל הנסיעות שמעוניינים לקבל התראה על חבילה תואמת
   this.driveSer.getAllDrives().subscribe(
   myData=>{
    this.myFilterDrives=myData
    debugger
    this.sendEmailToMatchDrives()
   },
   myErr=>{}
   )
    },
    myErr => {
    console.log("from subscribe",this.newPackage); 
    console.log(myErr.message);
  });

  }

  sendEmailToMatchDrives()
  {
    debugger
//בודק מי נרשם לקבלת התראה
  this.myFilterDrives= this.myFilterDrives.filter(d=>d.message==true)
// סינון לפי תאריך נסיעה
if(this.myFilterDrives)
  {
   this.myFilterDrives= this.myFilterDrives.filter(d=>(new Date(d.travelDate)>=new Date(this.packageSer.currentPackage.fromDate)&&new Date(d.travelDate)<= new Date(this.packageSer.currentPackage.toDate)));
  } 
   //סינון לפי מוצא
   if(this.myFilterDrives)
  {
   this.myFilterDrives=  this.myFilterDrives.filter(f=> 
    f.distance>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f.fromLocationLat, f.fromLocationLng), new google.maps.LatLng(this.packageSer.currentPackage.fromLocationLat,this.packageSer.currentPackage.fromLocationLng)));
   }
  //סינון לפי יעד
  if(this.myFilterDrives)
  {
   this.myFilterDrives=  this.myFilterDrives.filter(f=>
   f.distance>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f. toLocationLat, f.toLocationLng), new google.maps.LatLng(this.packageSer.currentPackage.toLocationLat,this.packageSer.currentPackage.toLocationLng)));  
   }

   if(this.myFilterDrives)
   {
     debugger
     this.emailSer.sendEmailToMatchDrives(this.myFilterDrives,this.packageSer.currentPackage,'http://localhost:4200/show-message-p').subscribe(data=>{},err=>{})
   }

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
