import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DriverProvider } from 'protractor/built/driverProviders';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { DriveService } from 'src/app/Services/drive.service';
import { PackageService } from 'src/app/Services/package.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit {

  allDrives: Array<Drive>;

  constructor(private driveSer: DriveService, private packageSer: PackageService) { }

  ngOnInit(): void {
    this.driversFound = new Array();
//this.getSpesificDrives(this.packageSer.package)
    this.getAllDrives();

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
  driversToSearch: Drive[];
  driversFound: Drive[];

  searchDriver() {
    debugger
    this.driversToSearch = this.allDrives.map(x => Object.assign({}, x))
    for (let x = 0; x < this.driversToSearch.length; x++) {
      let distanceLocation = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.driversToSearch[x].toLocationLat, this.driversToSearch[x].toLocationLng), new google.maps.LatLng(this.packageSer.package.toLocationLat, this.packageSer.package.toLocationLng));
      if (distanceLocation < 500) {
        let distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.driversToSearch[x].fromLocationLat, this.driversToSearch[x].fromLocationLng), new google.maps.LatLng(this.packageSer.package.fromLocationLat, this.packageSer.package.fromLocationLng));
        if (distance < 500) {

          // const index=this.serviceP.listPerson.indexOf(this.serviceP.listPerson[x]);
          this.driversFound.push(this.driversToSearch[x]);
          debugger
        }

      }
    }
  }
}




