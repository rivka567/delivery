import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import { UserService } from 'src/app/Services/user.service';
import { TempComponent } from '../temp/temp.component';
import { User } from 'src/app/Classes/user';
import { PackageComponent } from '../package/package.component';
import { Router } from '@angular/router';
import { Package } from 'src/app/Classes/package';
import { DriveService } from 'src/app/Services/drive.service';
import {MatAccordion} from '@angular/material/expansion';
import * as firebase from 'firebase';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 
})
export class HomeComponent implements OnInit {
  accordion: MatAccordion;
  // travelListForDelivery 
  travelList:Array<Package>=[]
  pack:Package;
  vis=false;
  // סתם:
  f="jerusalem"
  t="tel aviv"
  // travelListForDelivery 
 
  constructor(public dialog: MatDialog, private userSer:UserService,private router:Router,public driveSer:DriveService) {}

  //כשרוצים לגשת לאלמנט בhtml ע"י id
// @ViewChild('id') id:ElementRef<HTMLElement>
  ngOnInit(): void {
      //כשרוצים לגשת לאלמנט בhtml ע"י id
   // this.id.nativeElement.
  
  }
  openDialog() {
    const dialogRef = this.dialog.open(PackageComponent,{ disableClose: true })

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
   this.router.navigate(['/main'])
  }

  //travelListForDelivery 
   //כאן צריך לשנות לפי גוגל מאפ.............
   travelsListByPlace(from,to)
   {
    
       return true;
     //  for(var i=0;i<this.travelList.length;i++)
     //  {
     //     if(this.driveSer.fromPlace==from)
            
     // 
   }
  // travelListForDelivery  

  SendMail(contactAddress:string,subject:string,body:Package)
  {
    debugger
  this.userSer.sendEmail(contactAddress,subject,body).subscribe(data=>alert(data));
  }
 
}

