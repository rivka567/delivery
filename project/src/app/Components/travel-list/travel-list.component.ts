import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DriverProvider } from 'protractor/built/driverProviders';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { User } from 'src/app/Classes/user';
import { DriveService } from 'src/app/Services/drive.service';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';
import { DriveComponent } from '../drive/drive.component';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit {

  allDrives: Array<Drive>;
  matchDrives:Array<Drive>;
  moreDetails=false;
  len:number;
  myUser:User;
  constructor(private driveSer: DriveService, private packageSer: PackageService,private userSer:UserService) { }

  ngOnInit(): void {
    this.driversFound = new Array();
   this.getAllDrives();
   this.len=this.allDrives.length;

  }

show(d:Drive)
{
  // console.log(d);
  // alert(d.driverCode);
  // alert(this.len);
  if(this.moreDetails==false)
  return ('הצג יותר')
  else
  return(' הצג פחות')
}

  getAllDrives() {
    this.driveSer.getDrives().subscribe(
      myData => {
        this.allDrives = myData
        console.log(this.allDrives)
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });
    debugger

  }

  getDriveById() {   
    this.driveSer.getDriveById().subscribe(
    myData => { console.log("add succseful");
    },
    myErr => { alert(myErr.message); });
  }

  getSpesificDrives(myPackage:Package){
    debugger
   console.log( "from travel-list component"+this.packageSer.currentPackage);
    this.driveSer.getSpesificDrives(myPackage).subscribe(
      myData => {
        this.matchDrives = myData
        console.log(this.allDrives)
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });
    debugger
  }

  sendEmail(drive:Drive)
  {
   
    debugger
    console.log(drive);
    this.userSer.getUserById(drive.driverCode).subscribe(
      myData => {
        this.myUser = myData
        console.log(this.myUser)
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });
    console.log(this.myUser.userMail);
    this.userSer.sendEmail(this.myUser.userMail,"בקשת משלוח",this.userSer.currentUser.userName+"  מעוניין בנסיעה שלך").
    subscribe(data=>alert(data));
  }
  driversToSearch: Drive[];
  driversFound: Drive[];

  searchDriver() {
    debugger
    this.getSpesificDrives(this.packageSer.currentPackage);
    this.driversToSearch = this.allDrives.map(x => Object.assign({}, x))
    for (let x = 0; x < this.driversToSearch.length; x++) {
      let distanceLocation = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.driversToSearch[x].toLocationLat, this.driversToSearch[x].toLocationLng), new google.maps.LatLng(this.packageSer.currentPackage.toLocationLat, this.packageSer.currentPackage.toLocationLng));
      if (distanceLocation <4000) {
        let distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.driversToSearch[x].fromLocationLat, this.driversToSearch[x].fromLocationLng), new google.maps.LatLng(this.packageSer.currentPackage.fromLocationLat, this.packageSer.currentPackage.fromLocationLng));
        if (distance <4000) {
          // const index=this.serviceP.listPerson.indexOf(this.serviceP.listPerson[x]);
          this.driversFound.push(this.driversToSearch[x]);
          debugger
        }

      }
    }
  }
}




