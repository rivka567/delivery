import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Package } from '../../Classes/package';
import { PackageComponent } from '../package/package.component';
import { PackageService } from '../../Services/package.service';
import { UserService } from '../../Services/user.service';
import { Drive } from 'src/app/Classes/drive';
import { User } from 'src/app/Classes/user';
import { DriveService } from 'src/app/Services/drive.service';
import { Time } from '@angular/common';
import { Address } from 'ngx-google-places-autocomplete/objects/address';

@Component({
  selector: 'app-my-packages',
  templateUrl: './my-packages.component.html',
  styleUrls: ['./my-packages.component.scss']
})
export class MyPackagesComponent implements OnInit {

  constructor(private userSer: UserService,private packageSer:PackageService, private dialog:MatDialog,private driveSer:DriveService) { }

  fromDate:string;
  toDate:string;
  time:string;
  fromL:Address;
  toL:Address;

  myListPackage:Package[];
  len:number;
  myPackage:Package;
  ngOnInit(): void {
    this.getPackagesByUserId();
  }

  getPackagesByUserId()
  {
    debugger
      this.packageSer.getPackagesByUserId(this.userSer.currentUser.userCode).subscribe(
      myData => {
        this.myListPackage=myData;
        this.len=this.myListPackage.length;
        if(this.fromDate)
        this.myListPackage=this.myListPackage.filter(p=>new Date(p.travelDate)>= new Date(this.fromDate));
        if(this.toDate)
        this.myListPackage=this.myListPackage.filter(p=>new Date(p.travelDate)>= new Date(this.toDate));
        if(!this.fromDate&&!this.toDate)
        this.myListPackage=this.myListPackage.filter(p=>new Date(p.travelDate)== new Date(this.driveSer.currentDrive.travelDate))
        // this.myListPackage=this.myListPackage.filter(p=>p.drivingTime)
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });
  }
 
  checkPackage(p:Package)
  {
    debugger
    this.packageSer.currentPackage=p;
  }
  send()
  {
    debugger
    this.userSer.sendPackageByEmail(this.driveSer.currentDrive.driveCode,this.userSer.myDriver.userMail,"בקשת משלוח",this.packageSer.currentPackage).subscribe(data=>alert(data));
  }

 
}
