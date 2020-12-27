import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete/ngx-google-places-autocomplete.directive';
import { DriverProvider } from 'protractor/built/driverProviders';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { User } from 'src/app/Classes/user';
import { DriveService } from 'src/app/Services/drive.service';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';
import { DriveComponent } from '../drive/drive.component';
import { ExistUserComponent } from '../exist-user/exist-user.component';
import { PackageComponent } from '../package/package.component';
import { cpuUsage } from 'process';
import { MatCalendarCellCssClasses } from '@angular/material/datepicker';
import { Time } from '@angular/common';
import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateAdapter } from '@angular/material/core';
import { MyPackagesComponent } from 'src/app/Components/my-packages/my-packages.component';


@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit {

  options:FormGroup;
  matchDrives:Array<Drive>;
  moreDetails=false;
  len:number;
  myUser:User;
  minDate:Date;
  driversToSearch: Drive[];
  driversFound: Drive[] = new Array();
  from="";
  fromLat=0;
  fromLng=0;
  to="";
  toLat=0;
  toLng=0;
  date:'dd-MM-yyyy';
  hideme=[];
  panelOpenState = false;
  time1:any;
  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  constructor(private driveSer: DriveService, private packageSer: PackageService,private userSer:UserService,
  private dialog:MatDialog,private router:Router,private dateAdapter: DateAdapter<Date>) { 
   // this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy

  }

  ngOnInit(): void {
   this.minDate=new Date();
   this.getAllDrives();
  }

dateClass = (d: Date): MatCalendarCellCssClasses => {
  const date = d.getDate();
  // Highlight the 1st and 20th day of each month.
  return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
}

getAllDrives() {
  this.driveSer.getAllDrives().subscribe(
    myData => {
      this.driversFound=myData;
      //תמיד נשאר כאן כל הנסיעות
      this.driveSer.allDrives=myData;
      this.len=this.driversFound.length;
    },
    myErr => {
      console.log("from subscribe");
      console.log(myErr.message);
    });
 
}

 getUserById(drive:Drive)
 { 

    console.log(drive);
    this.userSer.getUserById(drive.driverCode).subscribe(
      myData => {
        this.userSer.myDriver = myData;
        console.log(this.userSer.currentUser);
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });

  }

  openPackageDialog() {
debugger
    if(this.userSer.currentUser==undefined)
    {
      const dialogRef = this.dialog.open(ExistUserComponent,{ disableClose: true })
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
        const dialogRef2 = this.dialog.open(PackageComponent,{ disableClose: true })
        dialogRef2.afterClosed().subscribe(result => {
          console.log(`Dialog result: ${result}`);
        });
      });
     
    }
    else if(this.userSer.currentUser)
    {
      const dialogRef = this.dialog.open(PackageComponent,{ disableClose: true })
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`);
      });
    }

  }

  sendEmail(drive:Drive)
  {
    // if(this.userSer.currentUser==undefined)
    //   this.login();
    // debugger
    // if(this.userSer.currentUser!=undefined){
    // this.getUserById(drive);
    // this.userSer.sendEmail(this.myUser.userMail,"בקשת משלוח",this.userSer.currentUser.userName+"  מעוניין בנסיעה שלך").
    // subscribe(data=>alert(data));
    // }
    this.getUserById(drive)
    const dialogRef = this.dialog.open(MyPackagesComponent,{ disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    })
  }


filterDrives(fromDate:string,toDate:string,from:Address,to:Address,time:string) {
  debugger
  this.driversFound=this.driveSer.allDrives;
  if(fromDate)
  {
    this.driversFound=this.driversFound.filter(d=>new Date(d.travelDate)>= new Date(fromDate));
  }
  if(toDate)
  {
    this.driversFound=this.driversFound.filter(d=>new Date(d.travelDate)<=new Date(toDate));

  }
  if(from)
  {
   let aa=new Address()
   this.driveSer.from=from;
    this.driversFound=  this.driversFound.filter(f=> 4000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f.fromLocationLat, f.fromLocationLng), new google.maps.LatLng(this.fromLat, this.fromLng)))
  }
  if(to)
  { 
  // this.driveSer.get123().subscribe(mydate=>{this.driveSer.aa=mydate
  //   console.log(this.driveSer.aa);
  //   })
    this.driveSer.to=to;
    this.driversFound=  this.driversFound.filter(f=> 4000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f. toLocationLat, f.toLocationLng), new google.maps.LatLng(this.toLat,this.toLng)))

  }
if(time)
{
 // let t=new timeStamp("10:30")
 // alert(t);
 let h=time.substring(0,2)
 let m=time.substring(3,5)
let t=new Date(1,1,2020,parseInt(h),parseInt(m),0,0)
 
  this.driversFound=  this.driversFound.filter(f=> (new Date(f.timeInDate).getHours() > t.getHours()-1||
   (new Date(f.timeInDate).getHours() == t.getHours() &&new Date(f.timeInDate).getMinutes()>=t.getMinutes()))
  && (new Date(f.timeInDate).getHours()< t.getHours()+1||
  (new Date(f.timeInDate).getHours() == t.getHours() &&new Date(f.timeInDate).getMinutes()>=t.getMinutes())))
}
this.len=this.driversFound.length;
}

  
public handleAddressFromChange(address: Address) {
debugger
//console.log(address);

this.from=address.formatted_address;
  this.fromLat=address.geometry.location.lat();
  this.fromLng=address.geometry.location.lng();
  console.log(address.formatted_address +" "+address.geometry.location.lat()+ " "+address.geometry.location.lng())
  // Do some stuff
}
public handleAddressToChange(address: Address) {
  debugger
  console.log(address)
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


sortBy(value:any)
{
  debugger
if(value=='from' && this.fromLat!=null &&this.fromLng!=null)
{
  this.driversFound.sort((a, b) => {
    console.log("a",google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a.fromLocationLat, a.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng) ))
    console.log("b", google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(b.fromLocationLng, b.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng)))
    console.log("a-b=" ,google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a.fromLocationLat, a.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng) )-google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(b.fromLocationLat, b.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng)))
    return  google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a.fromLocationLat, a.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng) )-google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(b.fromLocationLat, b.fromLocationLng), new google.maps.LatLng(this.fromLat,this.fromLng))})
}
if(value=='to' && this.toLng!=null &&this.toLat!=null)
{
  this.driversFound.sort((a, b) => {
   return  google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(a.toLocationLat, a.toLocationLng), new google.maps.LatLng(this.toLat,this.toLng) )-google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(b.toLocationLat, b.toLocationLng), new google.maps.LatLng(this.toLat,this.toLng))})
}
if(value=='time')
{
  
}
}
}




