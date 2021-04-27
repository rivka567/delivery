import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { DriveService } from 'src/app/Services/drive.service';
import { EmailManagementService } from 'src/app/Services/email-management.service';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-show-message-about-package',
  templateUrl: './show-message-about-package.component.html',
  styleUrls: ['./show-message-about-package.component.scss']
})
export class ShowMessageAboutPackageComponent implements OnInit {

  package:Package;
  drive:Drive;
  showDriveDetails=false;

  constructor(private userSer:UserService,private emailSer:EmailManagementService,private packageSer:PackageService,private driveSer:DriveService,private route:ActivatedRoute) { }

  ngOnInit(): void {
  //מציג את החבילה לשליח -החבילה שמתאימה לנסיעה שלו
 const packageId= this.route.snapshot.params['packageId'];
 const driveId= this.route.snapshot.params['driveId'];
 this.getPackageById(packageId);
 this.getDriveById(driveId);

  }

  sendEmailToCustomer()
  {
    let user;
    this.userSer.getUserById(this.drive.driverCode).subscribe(
      data=>{user=data,
     this.userSer.myCustomer=data
     },
      err=>{}
    ) 
    let distance= google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.package.toLocationLat,this.package.toLocationLng), new google.maps.LatLng(this.package.fromLocationLat,this.package.fromLocationLng)); 
    let price=((distance/1000)*this.drive.price)
 
   this.emailSer.sendPackageByEmail(this.drive,user.userMail,this.userSer.currentUser.userName+" "+"מעוניין לקחת חבילה שלך",this.package,price)
  
  }

  getPackageById(id:number)
  {
  this.packageSer.getPackageById(id).subscribe(
  data=>
  {
    this.package=data
    this.packageSer.currentPackage=this.package
    console.log(this.package)
  },
  err=>{}
 )
  }

  getDriveById(id:number)
  {
    this.driveSer.getDriveById(id).subscribe(
      data=>
      {
        this.drive=data
        this.driveSer.currentDrive=this.drive
        console.log(this.drive)
        //השליח שנכנס למערכת
        this.userSer.getUserById(this.drive.driverCode).subscribe(
          data=>
          {
            this.userSer.currentUser=data
          },
          err=>{}
        )
      },
      err=>{}
     )
  }


}
