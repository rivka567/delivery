import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Package } from '../../Classes/package';
import { PackageComponent } from '../package/package.component';
import { PackageService } from '../../Services/package.service';
import { UserService } from '../../Services/user.service';
import { Drive } from 'src/app/Classes/drive';
import { User } from 'src/app/Classes/user';

@Component({
  selector: 'app-my-packages',
  templateUrl: './my-packages.component.html',
  styleUrls: ['./my-packages.component.scss']
})
export class MyPackagesComponent implements OnInit {

  constructor(private userSer: UserService,private packageSer:PackageService, private dialog:MatDialog) { }

  myListPackage:Package[];
  len:number;
  myPackage:Package;
  ngOnInit(): void {
    this.getPackagesByUserId();
  }

  getPackagesByUserId()
  {
    debugger
     this.packageSer.getPackagesByUserId(this.userSer.currentUser.userCode).subscribe(
       myData=>{
       this.myListPackage=myData;
       this.len=this.myListPackage.length;
       debugger
       console.log( this.myListPackage);
       
       },
       myErr=>{
         console.log(myErr);
       }
     )
  }
 
  sendEmail(p:Package)
  {
    debugger
    this.myPackage=p;
  }
  send()
  {
    debugger
    this.userSer.sendEmail(this.userSer.myDriver.userMail,"בקשת משלוח",this.myPackage).subscribe(data=>alert(data));
  }

  openPackageDialog()
  {
    const dialogRef = this.dialog.open(PackageComponent,{ disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
}
