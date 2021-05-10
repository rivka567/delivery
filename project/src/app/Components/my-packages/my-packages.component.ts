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
import swal from 'sweetalert';
import { title } from 'process';

@Component({
  selector: 'app-my-packages',
  templateUrl: './my-packages.component.html',
  styleUrls: ['./my-packages.component.scss']
})
export class MyPackagesComponent implements OnInit {

  constructor(private emailSer:EmailManagementService, private userSer: UserService,private packageSer:PackageService, private dialog:MatDialog,private driveSer:DriveService) { }

  myListPackage:Array<Package>=[]
  myFilterPackages:Array<Package>=[]
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
      this.packageSer.getPackagesByUserId(this.userSer.currentUser.userCode).subscribe(
      myData => {
        debugger
        this.myListPackage=myData;
        //מציג חבילות שעדיין פתוחות
        this.myListPackage=this.myListPackage.filter(p=>p.status==true)
        if(this.driveSer.currentDrive.listWaiting.length>0)
        {
          debugger
          //מוחק מהרשימה את החבילות שכבר מקושרות לנסיעה זו
          this.driveSer.currentDrive.listWaiting.forEach(p => {
            let packageInListWaiting=this.myListPackage.find(p1=>p1.packageCode==p.packageCode)
            if(packageInListWaiting)
           this.myListPackage= this.myListPackage.filter(p2=>p2.packageCode!=p.packageCode)
          });
        }
        debugger
        this.myFilterPackages=this.myListPackage;
       // סינון לפי תאריך נסיעה
  if(this.myFilterPackages)
  {  
    this.myFilterPackages= this.myFilterPackages.filter(p=>new Date(this.driveSer.currentDrive.travelDate)>= new Date(p.fromDate)&&new Date(this.driveSer.currentDrive.travelDate)<= new Date(p.toDate));
  }
    //סינון לפי מוצא    
  //    this.myFilterPackages=  this.myFilterPackages.filter(f=> 
  //      5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f.fromLocationLat, f.fromLocationLng), new google.maps.LatLng(this.fromLlat,this.fromLlng)));
  if(this.myFilterPackages) 
  {  this.myFilterPackages=  this.myFilterPackages.filter(f=> 
      5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f.fromLocationLat, f.fromLocationLng), new google.maps.LatLng(this.driveSer.currentDrive.fromLocationLat,this.driveSer.currentDrive.fromLocationLng)));
  }
      //סינון לפי יעד
    //   this.myFilterPackages=  this.myFilterPackages.filter(f=>
    //    5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f. toLocationLat, f.toLocationLng), new google.maps.LatLng(this.toLlat,this.toLlng)));
    if(this.myFilterPackages) 
     { this.myFilterPackages=  this.myFilterPackages.filter(f=>
        5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f. toLocationLat, f.toLocationLng), new google.maps.LatLng(this.driveSer.currentDrive.toLocationLat,this.driveSer.currentDrive.toLocationLng))); 
      }  
     //סינון לפי שעה
     

        this.len=this.myFilterPackages.length;
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });
  }
 
  openPackaeDialog()
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
    // swal("עלות המשלוח "+this.price,"-מרחק של כ"+distance/1000+" קילומטר")
    swal("עלות המשלוח "+this.price,"-מרחק של כ"+distance/1000+" קילומטר")

  }
  sendEmail()
  {
 
    debugger
    // if(this.driveSer.currentDrive.listWaiting.length==0)
    this.emailSer.sendPackageToDelivery(this.driveSer.currentDrive,this.userSer.myDriver.userMail,this.userSer.currentUser.userName+" "+"מעוניין/ת במשלוח",this.packageSer.currentPackage,this.price).subscribe(data=>
    {   swal({title:"הבקשה נשלחה בהצלחה",icon:'success'}) } ,
    err=>{ swal({title:"בקשה לא נשלחה",text:"נסה שנית",icon:'error'}) } );
    // else{
    //   let packageInListWaiting=this.driveSer.currentDrive.listWaiting.find(p=>p.packageCode==this.packageSer.currentPackage.packageCode)
    //      if(packageInListWaiting)
    //        swal({title:"בקשה זו בוצעה בעבר",text:"לצפייה בפרטי הבקשה היכנס לאזור ההודעות ",icon:"error"})
    //     else
    //     this.emailSer.sendPackageToDelivery(this.driveSer.currentDrive,this.userSer.myDriver.userMail,this.userSer.currentUser.userName+" "+"מעוניין/ת במשלוח",this.packageSer.currentPackage,this.price).subscribe(data=>
    //       {   swal({title:"הבקשה נשלחה בהצלחה",icon:'success'}) } ,
    //       err=>{ swal({title:"שגיאה!",icon:'error'}) } );
         
    // }
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
