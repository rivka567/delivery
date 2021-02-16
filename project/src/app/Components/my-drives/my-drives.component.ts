import { Component, Inject, OnInit } from '@angular/core';
import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { DriveService } from 'src/app/Services/drive.service';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';
import { DriveComponent } from '../drive/drive.component';

@Component({
  selector: 'app-my-drives',
  templateUrl: './my-drives.component.html',
  styleUrls: ['./my-drives.component.scss']
})
export class MyDrivesComponent implements OnInit {

  constructor( private driveSer:DriveService,private userSer:UserService,private dialog:MatDialog,private packageSer:PackageService) { }
  myListDrive:Drive[];
  len:number;
  myDrive:Drive;
  @Inject(MAT_DIALOG_DATA) public data: any


  ngOnInit(): void {
console.log("data");
    this.getDrivesByUserId()
    
  }

  getDrivesByUserId()
  {
    debugger
      this.driveSer.getAllDrives().subscribe(
      myData => {
        this.myListDrive=myData;
        //תמיד נשאר כאן כל הנסיעות
        this.driveSer.allDrives=myData;
        this.myListDrive= this.myListDrive.filter(d=>d.driverCode==this.userSer.currentUser.userCode);
        this.len=this.myListDrive.length;
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
  send()
  {
   debugger 
   this.userSer.sendDriveByEmail(this.packageSer.currentPackage.packageCode, this.userSer.myCustomer.userMail,"בקשת נסיעה",this.driveSer.currentDrive)
   .subscribe(data=>alert(data));
  }

 
}
