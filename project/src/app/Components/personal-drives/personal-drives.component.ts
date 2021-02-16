import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Drive } from 'src/app/Classes/drive';
import { DriveService } from 'src/app/Services/drive.service';
import { UserService } from 'src/app/Services/user.service';
import { DriveComponent } from '../drive/drive.component';
import { UpdateDriveComponent } from '../update-drive/update-drive.component';

@Component({
  selector: 'app-personal-drives',
  templateUrl: './personal-drives.component.html',
  styleUrls: ['./personal-drives.component.scss']
})
export class PersonalDrivesComponent implements OnInit {

  constructor( private driveSer:DriveService,private userSer:UserService,private dialog:MatDialog) { }
  myListDrive:Drive[];
  len:number;

  ngOnInit(): void {

    this.getDrivesByUserId()
    
  }
 
  getDrivesByUserId()
  {
      this.driveSer.getDrivesByUserId(this.userSer.currentUser.userCode).subscribe(
      myData => {
        debugger
        this.myListDrive=myData;
        this.myListDrive.forEach(d=>console.log("listWaiting----",d.listWaiting));
        this.len=this.myListDrive.length;
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });
  
}

deleteDrive(d:Drive)
{
  debugger
    this.driveSer.deleteDrive(d.driveCode,d.listWaiting).subscribe(
    myData => {
  this.myListDrive=myData;
    },
    myErr => {
      console.log(myErr.message);
    });
}

  openDriveDialog()
  {
    debugger
    const dialogRef = this.dialog.open(DriveComponent,{ disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });

  }

  OpenUpdateDrive(d:Drive)
  {
    debugger
    const dialogRef = this.dialog.open(UpdateDriveComponent,{ disableClose: true })
    dialogRef.componentInstance.drive =d;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      
    }); 
  }
}
