import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { DriveService } from 'src/app/Services/drive.service';
import { EmailManagementService } from 'src/app/Services/email-management.service';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-show-message-about-drive',
  templateUrl: './show-message-about-drive.component.html',
  styleUrls: ['./show-message-about-drive.component.scss']
})
export class ShowMessageAboutDriveComponent implements OnInit {
  package:Package;
  drive:Drive;
showPackageDetails=false;
  constructor(private userSer:UserService,private packageSer:PackageService,private driveSer:DriveService,private route:ActivatedRoute,
    private emailSer:EmailManagementService) { }

  ngOnInit(): void {
  //מציג את הנסיעה ללקוח -הנסיעה שמתאימה לחבילה שלו
 const packageId= this.route.snapshot.params['packageId'];
 const driveId= this.route.snapshot.params['driveId'];
 this.getPackageById(packageId);
 this.getDriveById(driveId);

  }


  sendEmailToDelivery()
  {
  let user;
   this.userSer.getUserById(this.drive.driverCode).subscribe(
     data=>{user=data,
    this.userSer.myDriver=data
    },
     err=>{}
   ) 
   let distance= google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.package.toLocationLat,this.package.toLocationLng), new google.maps.LatLng(this.package.fromLocationLat,this.package.fromLocationLng)); 
   let price=((distance/1000)*this.drive.price)

  this.emailSer.sendPackageToDelivery(this.drive,user.userMail,this.userSer.currentUser.userName+" "+"מעוניין/ת במשלוח",this.package,price)
  }
  getPackageById(id:number)
  {
  this.packageSer.getPackageById(id).subscribe(
  data=>
  {
    this.package=data
    this.packageSer.currentPackage=data
    console.log(this.package)
    //הלקוח שנכנס למערכת
    this.userSer.getUserById(this.package.userCustomerCode).subscribe(
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

  getDriveById(id:number)
  {
    this.driveSer.getDriveById(id).subscribe(
      data=>
      {
        this.drive=data
        this.driveSer.currentDrive=data
        console.log(this.drive)
        
      },
      err=>{}
     )
  }

}
