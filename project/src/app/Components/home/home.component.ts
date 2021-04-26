import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import { UserService } from 'src/app/Services/user.service';
import { TempComponent } from '../temp/temp.component';
import { User } from 'src/app/Classes/user';
import { PackageComponent } from '../package/package.component';
import { ActivatedRoute, Router } from '@angular/router';
import { Package } from 'src/app/Classes/package';
import { DriveService } from 'src/app/Services/drive.service';
import {MatAccordion} from '@angular/material/expansion';
import * as firebase from 'firebase';
import { Subscription } from 'rxjs/internal/Subscription';
import { PackageService } from 'src/app/Services/package.service';

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
  package:Package;
  // סתם:
  f="jerusalem"
  t="tel aviv"
  // travelListForDelivery 
 
  constructor(private packageSer:PackageService, private route: ActivatedRoute,public dialog: MatDialog, private userSer:UserService,private router:Router,public driveSer:DriveService) {}

  //כשרוצים לגשת לאלמנט בhtml ע"י id
// @ViewChild('id') id:ElementRef<HTMLElement>
  ngOnInit(): void {
      //כשרוצים לגשת לאלמנט בhtml ע"י id
   // this.id.nativeElement.
  const id= this.route.snapshot.params['id'];
this.getPackage(id);
  }

  getPackage(id:number)
  {

  this.packageSer.getPackageById(id).subscribe(
  data=>{this.package=data},
  err=>{console.log(err)})
  
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

  // SendMail(contactAddress:string,subject:string,body:Package)
  // {
  //   debugger
  // this.userSer.sendEmail(contactAddress,subject,body).subscribe(data=>alert(data));
  // }
 
}

