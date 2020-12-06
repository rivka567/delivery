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
  minDate:Date;

  from="";
  fromLat=0;
  fromLng=0;
  to="";
  toLat=0;
  toLng=0;

  @ViewChild("placesRef") placesRef : GooglePlaceDirective;

  constructor(private driveSer: DriveService, private packageSer: PackageService,private userSer:UserService,
  private dialog:MatDialog,private router:Router) { }

  ngOnInit(): void {
   this.driversFound = new Array();
   this.getAllDrives();
   this.minDate=new Date();
  }

showMore(drive:Drive)
{

}


dateClass = (d: Date): MatCalendarCellCssClasses => {
  const date = d.getDate();
  // Highlight the 1st and 20th day of each month.
  return (date === 1 || date === 20) ? 'example-custom-date-class' : '';
}

searchSpesificDrives(date:Date,time:Time)
{

  this.driveSer.getSpesificDrives(date,time).subscribe(
  myData => {
    this.matchDrives = myData
    console.log(this.matchDrives)
  },
  myErr => {
    console.log("from subscribe");
    console.log(myErr.message);
  });

}

login()
{ 
    const dialogRef = this.dialog.open(ExistUserComponent,{ disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
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

 getUserById(drive:Drive)
 { 

  debugger
    console.log(drive);
    this.userSer.getUserById(drive.driverCode).subscribe(
      myData => {
        this.myUser = myData;
        console.log(this.userSer.currentUser);
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });

  }

  openPackageDialog() {
    if(this.userSer.currentUser==undefined)
    {
      this.login();
      // this.router.navigate(['/travel-list']);
    }
    debugger
    console.log(this.userSer.currentUser);
    if(this.userSer.currentUser!=undefined)
    {
    const dialogRef = this.dialog.open(PackageComponent,{ disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    }
  }

  sendEmail(drive:Drive)
  {
    if(this.userSer.currentUser==undefined)
    {
      this.login();
      // this.router.navigate(['/travel-list']);
    }
    debugger
    if(this.userSer.currentUser!=undefined){
    this.getUserById(drive);
    this.userSer.sendEmail(this.myUser.userMail,"בקשת משלוח",this.userSer.currentUser.userName+"  מעוניין בנסיעה שלך").
    subscribe(data=>alert(data));
  }
  }
  driversToSearch: Drive[];
  driversFound: Drive[];

  searchDriver(date:Date,time:Time) {
    debugger
    this.searchSpesificDrives(date,time);
    if(this.matchDrives)
    this.driversFound=this.matchDrives;
    this.driversToSearch = this.allDrives.map(x => Object.assign({}, x))
    for (let x = 0; x < this.driversToSearch.length; x++) {
      let distanceLocation = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.driversToSearch[x].toLocationLat, this.driversToSearch[x].toLocationLng), new google.maps.LatLng(this.toLat, this.toLng));
      console.log(this.driversToSearch[x].toLocationLat+"  "+this.driversToSearch[x].toLocationLng+" "+distanceLocation)
      if (distanceLocation <4000) {
        let distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.driversToSearch[x].fromLocationLat, this.driversToSearch[x].fromLocationLng), new google.maps.LatLng(this.fromLat, this.fromLng));
        if (distance <4000) {
          // const index=this.serviceP.listPerson.indexOf(this.serviceP.listPerson[x]);
          this.driversFound.push(this.driversToSearch[x]);
          debugger
        }

      }
    }
    this.allDrives=this.driversFound;
  }

  
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




