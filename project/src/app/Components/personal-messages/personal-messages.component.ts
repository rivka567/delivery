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
  finishPackage(id:string)
  {
    const dialogRef = this.dialog.open(HappinessComponent,{ disableClose: true })
    dialogRef.componentInstance.idDelivery =id;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  deleteWaitingMessage(idP:number,idD:number,type:string)
  {
  this.wait.deleteMessage(idP,idD,type).subscribe(myData=>{alert(myData)})
  }
  changeStatus(status:boolean,newStatus:boolean)
  {
    if(status==false&&newStatus==true)
    {

    }
    this.wait.changeStatus(newStatus).subscribe(myData=>{alert(myData)});
  }

  showBtn=-1;

showUndoBtn(index){
  
  if(this.showBtn==index)
  this.showBtn=-1;
  else
  this.showBtn=index;
}
}
