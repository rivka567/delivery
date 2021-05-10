import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { User } from 'src/app/Classes/user';
import { DriveService } from 'src/app/Services/drive.service';
import { EmailManagementService } from 'src/app/Services/email-management.service';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';
import  swal from 'sweetalert';

@Component({
  selector: 'app-show-message-about-drive',
  templateUrl: './show-message-about-drive.component.html',
  styleUrls: ['./show-message-about-drive.component.scss']
})
export class ShowMessageAboutDriveComponent implements OnInit {
  package:Package;
  drive:Drive;
showPackageDetails=false;
user:User;
  constructor(private userSer:UserService,private packageSer:PackageService,private driveSer:DriveService,private route:ActivatedRoute,
    private emailSer:EmailManagementService) { }

  ngOnInit(): void {
  //מציג את הנסיעה ללקוח -הנסיעה שמתאימה לחבילה שלו
 const packageId= this.route.snapshot.params['packageId'];
 const driveId= this.route.snapshot.params['driveId'];
 debugger
 this.getPackageById(packageId);
 this.getDriveById(driveId);
 
  }

  getPackageById(id:number)
  {
  this.packageSer.getPackageById(id).subscribe(
  data=>
  {
    debugger
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
        debugger
        this.drive=data
        this.driveSer.currentDrive=data
        //השליח שבחרתי בו
        this.userSer.getUserById(this.drive.driverCode).subscribe(
          data=>{
         this.userSer.myDriver=data
         },
          err=>{}
        ) 
        
      },
      err=>{}
     )
  }
  sendEmailToDelivery()
  {
  
   let distance= google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(this.package.toLocationLat,this.package.toLocationLng), new google.maps.LatLng(this.package.fromLocationLat,this.package.fromLocationLng)); 
   let price=((distance/1000)*this.drive.price)


  this.emailSer.sendPackageToDelivery(this.drive,this.userSer.myDriver.userMail,this.userSer.currentUser.userName+" "+"מעוניין/ת במשלוח",this.package,price).subscribe(
    data=>{
      swal({title:"נשלח בהצלחה!",icon:"success"})
     }
    ,err=>{}
  )
  }
  

}
