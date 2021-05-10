import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { DriveService } from 'src/app/Services/drive.service';
import { EmailManagementService } from 'src/app/Services/email-management.service';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';
import swal from 'sweetalert';
import { DriveComponent } from '../drive/drive.component';

@Component({
  selector: 'app-my-drives',
  templateUrl: './my-drives.component.html',
  styleUrls: ['./my-drives.component.scss']
})
export class MyDrivesComponent implements OnInit {

  constructor(private emailSer:EmailManagementService, private driveSer:DriveService,private userSer:UserService,private dialog:MatDialog,private packageSer:PackageService) { }
  myListDrive:Drive[];
  myFilterDrives:Array<Drive>=[]
  len:number;
  myDrive:Drive;
  currentPackage:Package;
  @Inject(MAT_DIALOG_DATA) public data: any


  ngOnInit(): void {
console.log("data");
    this.getDrivesByUserId()
    
  }

  getDrivesByUserId()
  {
    debugger
      this.driveSer.getDrivesByUserId(this.userSer.currentUser.userCode).subscribe(
      myData => {
        this.myListDrive=myData;
        this.myListDrive=this.myListDrive.filter(d=>d.status==true)
        debugger
        if(this.packageSer.currentPackage.listWaiting.length>0)
        {
          //מוחק מהרשימה את הנסיעות שכבר מקושרות לחבילה זו
          this.packageSer.currentPackage.listWaiting.forEach(d => {
            let driveInListWaiting=this.myListDrive.find(d1=>d1.driveCode==d.driveCode)
            if(driveInListWaiting)
           this.myListDrive= this.myListDrive.filter(d2=>d2.driveCode!=d.driveCode)
          });
        }

        this.myFilterDrives=this.myListDrive;
       // סינון לפי תאריך נסיעה
       this.myFilterDrives= this.myFilterDrives.filter(d=>new Date(d.travelDate)>=new Date(new Date().getFullYear(),new Date().getMonth(),new Date().getDate(),0,0,0,0)&& (new Date(d.travelDate)>=new Date(this.packageSer.currentPackage.fromDate)&&new Date(d.travelDate)<= new Date(this.packageSer.currentPackage.toDate)));
        //סינון לפי מוצא
  //   this.myFilterDrives=  this.myFilterDrives.filter(f=> 
  //   5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f.fromLocationLat, f.fromLocationLng), new google.maps.LatLng(this.currentPackage.fromLocationLat,this.currentPackage.fromLocationLng)));
    this.myFilterDrives=  this.myFilterDrives.filter(f=> 
    5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f.fromLocationLat, f.fromLocationLng), new google.maps.LatLng(this.packageSer.currentPackage.fromLocationLat,this.packageSer.currentPackage.fromLocationLng)));

  //סינון לפי יעד
   //  this.myFilterDrives=  this.myFilterDrives.filter(f=>
   //  5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f. toLocationLat, f.toLocationLng), new google.maps.LatLng(this.currentPackage.toLocationLat,this.currentPackage.toLocationLng)));
   this.myFilterDrives=  this.myFilterDrives.filter(f=>
   5000>google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(f. toLocationLat, f.toLocationLng), new google.maps.LatLng(this.packageSer.currentPackage.toLocationLat,this.packageSer.currentPackage.toLocationLng)));  
   //סינון לפי שעה
     
        this.len=this.myFilterDrives.length;
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });
  }

  checkDrive(d:Drive)
  {
    debugger
    //הנסיעה שאני מעוניין בה-שמתאימה לחבילת הלקוח
    this.driveSer.currentDrive=d;
  }
  sendEmail()
  {
  // if(this.packageSer.currentPackage.listWaiting.length==0)
   debugger 
   this.emailSer.sendDriveByEmail(this.packageSer.currentPackage, this.userSer.myCustomer.userMail,this.userSer.currentUser.userName+" "+"מעוניין לקחת חבילה שלך",this.driveSer.currentDrive)
   .subscribe(data=> {swal({title:"הבקשה נשלחה בהצלחה",icon:'success'})} ,
   err=>{ swal({title:"בקשה לא נשלחה",text:"נסה שנית",icon:'error'}) } );
  
  // else{
  //   //בודק האם בעבר נשלחה בקשה לנסיעה זו
  //   let driveInListWaiting=this.packageSer.currentPackage.listWaiting.find(d=>d.driveCode=this.driveSer.currentDrive.driveCode)
  //    if(driveInListWaiting)
  //        swal({title:"בקשה זו בוצעה בעבר",text:"לצפייה בפרטי הבקשה היכנס לאזור ההודעות ",icon:"error"})
  //   else
  //   this.emailSer.sendDriveByEmail(this.packageSer.currentPackage, this.userSer.myCustomer.userMail,this.userSer.currentUser.userName+" "+"מעוניין לקחת חבילה שלך",this.driveSer.currentDrive)
  //   .subscribe(data=> { swal({title:"הבקשה נשלחה בהצלחה",icon:'success'})} ,
  //   err=>{ swal({title:"שגיאה!",icon:'error'}) });
  // }
  }

  showDriveDialog()
  {
    const dialogRef = this.dialog.open(DriveComponent,{ disableClose: true })
    dialogRef.componentInstance.isDrive=true;
      dialogRef.afterClosed().subscribe(result => {
        console.log(`Dialog result: ${result}`)}
        );
  }
  showAllDrives()
  {
    this.myFilterDrives=this.myListDrive;
    this.len=this.myFilterDrives.length;

  }
 
}
