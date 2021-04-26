import { Component, OnInit, ViewChild } from '@angular/core';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { DriveService } from 'src/app/Services/drive.service';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';
import {MatAccordion} from '@angular/material/expansion';
import { WaitingMessagesService } from 'src/app/Services/waiting-messages.service';
import { HappinessComponent } from '../happiness/happiness.component';
import { MatDialog } from '@angular/material/dialog';
import { identifierModuleUrl } from '@angular/compiler';
import { SendMessageComponent } from '../send-message/send-message.component';
import { matDatepickerAnimations } from '@angular/material/datepicker';

@Component({
  selector: 'app-personal-messages',
  templateUrl: './personal-messages.component.html',
  styleUrls: ['./personal-messages.component.scss']
})
export class PersonalMessagesComponent implements OnInit {

  constructor(private packageSer:PackageService,private userSer:UserService,
    private driveSer:DriveService,private wait:WaitingMessagesService,private dialog:MatDialog) { }

  listPackages:Package[];
  listDrives:Drive[];
  lenlistPackages:number;
  lenlistDrives:number;
  panelOpenState = false;
  @ViewChild(MatAccordion) accordion: MatAccordion;
  public showPackages=true;
  public showDrives=false;

  ngOnInit(): void {
    this.getPackagesByUserId()
    this.getDrivesByUserId()
  }
  getPackagesByUserId()
  {   
    debugger
      this.packageSer.getPackagesByUserId(this.userSer.currentUser.userCode).subscribe(
      myData => {
        debugger
        this.listPackages=myData;
        this.listPackages.forEach(l => {console.log(l.listWaiting)});
        this.lenlistPackages=this.listPackages.length;
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });

  }
  getDrivesByUserId()
  {   
    debugger
      this.driveSer.getDrivesByUserId(this.userSer.currentUser.userCode).subscribe(
      myData => {
        debugger
        this.listDrives=myData;
        this.lenlistDrives=this.listDrives.length;
        this.listDrives.forEach(l => {console.log(l.listWaiting)});
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });
  }
  
  finishPackage(id:string,name:string)
  {
    const dialogRef = this.dialog.open(HappinessComponent,{ disableClose: true })
    dialogRef.componentInstance.idDelivery =id;
    // dialogRef.componentInstance.customerName =name;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  changeStatusToClose(id:number)
  {
    this.driveSer.changeStatusToClose(id,false).subscribe(
      myData=>{alert(myData)},
      myErr=>{alert(myErr)}    
    );
  }

  confirmDrive(p:Package,confirmDrive:Drive,listToDelete:Drive[])
  {
    debugger
   listToDelete= listToDelete.filter(d=>d.driveCode!=confirmDrive.driveCode);
    this.driveSer.confirmDrive(p,confirmDrive,listToDelete).subscribe(
      myData=>{alert(myData)},
      myErr=>{alert(myErr)}
    );
  }
  //לקוח מוחק נסיעה מרשימת השליחים המעוניינים בנסיעה שלו
  deleteWaitingMessageFromCustomer(p:Package,driveToDelete:Drive)
  {
  this.wait.deleteWaitingMessageFromCustomer(p,driveToDelete).subscribe(myData=>{alert(myData)})
  }
//שליח מוחק חבילה משימת הלקוחות המעוניינים בנסיעה שלו
  deleteWaitingMessageFromDelivery(d:Drive,packageToDelete:Package)
  {
    this.wait.deleteWaitingMessageFromDelivery(d,packageToDelete).subscribe(myData=>{alert(myData)})
  }
  sendMessageFromCustomer(p:Package,d:Drive)
  {
    const dialogRef = this.dialog.open(SendMessageComponent,{ disableClose: true })
  dialogRef.componentInstance.package=p;
  dialogRef.componentInstance.waitingD=d;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); 
  }

  sendMessageFromDelivery(d:Drive,p:Package)
  {
    const dialogRef = this.dialog.open(SendMessageComponent,{ disableClose: true })
  dialogRef.componentInstance.drive=d;
  dialogRef.componentInstance.waitingP=p;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    }); 
  }

  showBtn=-1;

showUndoBtn(index){
  
  if(this.showBtn==index)
  this.showBtn=-1;
  else
  this.showBtn=index;
}
}