import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Package } from '../../Classes/package';
import { PackageComponent } from '../package/package.component';
import { PackageService } from '../../Services/package.service';
import { UserService } from '../../Services/user.service';
import { Drive } from 'src/app/Classes/drive';
import { User } from 'src/app/Classes/user';
import { DriveService } from 'src/app/Services/drive.service';

@Component({
  selector: 'app-my-packages',
  templateUrl: './my-packages.component.html',
  styleUrls: ['./my-packages.component.scss']
})
export class MyPackagesComponent implements OnInit {

  constructor(private userSer: UserService,private packageSer:PackageService, private dialog:MatDialog,private driveSer:DriveService) { }

  myListPackage:Package[];
  len:number;
  myPackage:Package;
  ngOnInit(): void {
    this.getPackagesByUserId();
  }

  getPackagesByUserId()
  {
    debugger
      this.packageSer.getAllPackages().subscribe(
      myData => {
        this.myListPackage=myData;
        //תמיד נשאר כאן כל הנסיעות
        this.packageSer.allPackages=myData;
        this.myListPackage= this.myListPackage.filter(p=>p.userCustomerCode==this.userSer.currentUser.userCode);
        this.len=this.myListPackage.length;
      },
      myErr => {
        console.log("from subscribe");
        console.log(myErr.message);
      });
  }
 
  checkPackage(p:Package)
  {
    debugger
    this.packageSer.currentPackage=p;
  }
  send()
  {
    debugger
    this.userSer.sendPackageByEmail(this.driveSer.currentDrive.driveCode,this.userSer.myDriver.userMail,"בקשת משלוח",this.packageSer.currentPackage).subscribe(data=>alert(data));
  }

 
}
