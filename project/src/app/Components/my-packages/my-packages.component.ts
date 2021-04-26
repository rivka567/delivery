import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Package } from '../../Classes/package';
import { PackageComponent } from '../package/package.component';
import { PackageService } from '../../Services/package.service';
import { UserService } from '../../Services/user.service';
import { Drive } from 'src/app/Classes/drive';
import { User } from 'src/app/Classes/user';
import { DriveService } from 'src/app/Services/drive.service';
import { Address } from 'ngx-google-places-autocomplete/objects/address';
import { Time } from '@angular/common';
import { EmailManagementService } from 'src/app/Services/email-management.service';

@Component({
  selector: 'app-my-packages',
  templateUrl: './my-packages.component.html',
  styleUrls: ['./my-packages.component.scss']
})
export class MyPackagesComponent implements OnInit {

  constructor(private emailSer:EmailManagementService, private userSer: UserService,private packageSer:PackageService, private dialog:MatDialog,private driveSer:DriveService) { }

  myListPackage:Package[];
  myFilterPackages:Package[];
  len:number;
  myPackage:Package;
  travelDate:Date;
  fromLlat:number;
  fromLlng:number;
  toLlat:number;
  toLlng:number;
  time:Time;
  currentDrive:Drive;
  price:number;
  ngOnInit(): void {
    this.getPackagesByUserId();

  }

  getPackagesByUserId()
  {
    debugger
      this.packageSer.getPackagesByUserId(this.userSer.currentUser.userCode).subscribe(
      myData => {
        this.myListPackage=myData;
        debugger
        this.myFilterPackages=myData;
       // סינון לפי תאריך נסיעה
       this.myFilterPackages= this.myFilterPackages.filter(p=>new Date(this.driveSer.currentDrive.travelDate)>= new Date(p.fromDate)&&new Date(this.driveSer.currentDrive.travelDate)<= new Date(p.toDate));
        //סינון לפי מוצא
        debugger
        console.log(this.currentDrive)
  //    this.myFilterPackages=  this.myFilterPackages.filter(f=> 
  //      5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f.fromLocationLat, f.fromLocationLng), new google.maps.LatLng(this.fromLlat,this.fromLlng)));
      this.myFilterPackages=  this.myFilterPackages.filter(f=> 
      5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f.fromLocationLat, f.fromLocationLng), new google.maps.LatLng(this.driveSer.currentDrive.fromLocationLat,this.driveSer.currentDrive.fromLocationLng)));
    //סינון לפי יעד
    //   this.myFilterPackages=  this.myFilterPackages.filter(f=>
    //    5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f. toLocationLat, f.toLocationLng), new google.maps.LatLng(this.toLlat,this.toLlng)));
     this.myFilterPackages=  this.myFilterPackages.filter(f=>
        5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f. toLocationLat, f.toLocationLng), new google.maps.LatLng(this.driveSer.currentDrive.toLocationLat,this.driveSer.currentDrive.toLocationLng))); 
      // //סינון לפי שעה
     
        this.len=this.myFilterPackages.length;
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });
  }
 
  showPackaeDialog()
  {
    const dialogRef = this.dialog.open(PackageComponent,{ disableClose: true })
    dialogRef.componentInstance.isPackage=true;
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`)}
        );
  }
  showAllPackages()
  {
    this.myFilterPackages=this.myListPackage;
    this.len=this.myFilterPackages.length;
  }
  checkPackage(p:Package)
  {
    this.packageSer.currentPackage=p;
    debugger
    let distance= google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.packageSer.currentPackage.toLocationLat,this.packageSer.currentPackage.toLocationLng), new google.maps.LatLng(this.packageSer.currentPackage.fromLocationLat,this.packageSer.currentPackage.fromLocationLng)); 
    this.price=((distance/1000)*this.driveSer.currentDrive.price)
    alert(distance/1000+"*"+this.driveSer.currentDrive.price+"="+this.price)
  }
  sendEmail()
  {
  //this.showPrice()
    debugger
    this.emailSer.sendPackageByEmail(this.driveSer.currentDrive,this.userSer.myDriver.userMail,this.userSer.currentUser.userName+" "+"מעוניין/ת במשלוח",this.packageSer.currentPackage,this.price).subscribe(data=>alert(data));
  }

  showPrice()
  {
 console.log("distance=" ,google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.packageSer.currentPackage.toLocationLat,this.packageSer.currentPackage.toLocationLng), new google.maps.LatLng(this.packageSer.currentPackage.fromLocationLat,this.packageSer.currentPackage.fromLocationLng))); 
console.log("price="+this.driveSer.currentDrive.price);
 var distance= google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.packageSer.currentPackage.toLocationLat,this.packageSer.currentPackage.toLocationLng), new google.maps.LatLng(this.packageSer.currentPackage.fromLocationLat,this.packageSer.currentPackage.fromLocationLng)); 
var price=((distance/1000)*this.driveSer.currentDrive.price)
 console.log("calc price=",price);
}
 
}
