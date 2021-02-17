import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Package } from 'src/app/Classes/package';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';
import { PackageComponent } from '../package/package.component';
import { UpdatePackageComponent } from '../update-package/update-package.component';

@Component({
  selector: 'app-personal-packages',
  templateUrl: './personal-packages.component.html',
  styleUrls: ['./personal-packages.component.scss']
})
export class PersonalPackagesComponent implements OnInit {

  constructor(private packageSer:PackageService,private userSer:UserService,private dialog:MatDialog) { }

  myListPackage:Package[];
  len:number;

  ngOnInit(): void {
  this.getPackagesByUserId()

  }

  getPackagesByUserId()
  {   
    debugger
      this.packageSer.getPackagesByUserId(this.userSer.currentUser.userCode).subscribe(
      myData => {
        debugger
        this.myListPackage=myData;
        this.myListPackage.forEach(p=>console.log("listWaiting----",p.listWaiting));
        this.len=this.myListPackage.length;
      },
      myErr => {
        console.log(myErr.message);
      });

  }

  deletePackage(p:Package)
  {
      console.log("akert ")
     // Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
    debugger
      this.packageSer.deletePackage(p.packageCode,p.listWaiting).subscribe(
      myData => {
    this.myListPackage=myData;
      },
      myErr => {
        console.log(myErr.message);
      });
  }


  openPackageDialog() {
          const dialogRef = this.dialog.open(PackageComponent,{ disableClose: true })
          dialogRef.afterClosed().subscribe(result => {
            console.log(`Dialog result: ${result}`);
          });
    
 }
 OpenUpdatePackage(p:Package)
{
  debugger
  const dialogRef = this.dialog.open(UpdatePackageComponent,{ disableClose: true })
  dialogRef.componentInstance.package =p;
  dialogRef.afterClosed().subscribe(result => {
    console.log(`Dialog result: ${result}`);
    
  }); 
}
    
  checkdrive(idDrive:number)
  {

  }
  
  deletedrive(idDrive:number)
  {
    
  }
}
