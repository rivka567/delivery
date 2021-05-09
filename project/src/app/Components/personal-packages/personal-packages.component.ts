import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Package } from 'src/app/Classes/package';
import { PackageService } from 'src/app/Services/package.service';
import { UserService } from 'src/app/Services/user.service';
import swal from 'sweetalert';
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
if(p.listWaiting.length==0){
    swal({
      title: "האם אתה בטוח שברצונך למחוק חבילה זו?",
      text: "לחבילה זו אין בקשות",
      icon: "warning",
      buttons:true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
       this.packageSer.deletePackage(p.packageCode,p.listWaiting).subscribe(
      myData => {
       this.myListPackage=myData;
       swal({title:"נמחק בהצלחה",icon:"success"})
      },
      myErr => {
        swal({title:"שגיאה בניסיון המחיקה ",icon:"error"})
      });
      }
    });
  }   
    debugger
    if(p.listWaiting.length>0)
    {
if(p.status==true)
    {
swal({
  title: "האם אתה בטוח שברצונך למחוק חבילה זו?",
  text: "חבילה זו כבר נסגרה עם שליח",
  icon: "warning",
  buttons:true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
   this.packageSer.deletePackage(p.packageCode,p.listWaiting).subscribe(
  myData => {
   this.myListPackage=myData;
   swal({title:"נמחק בהצלחה",icon:"success"})
  },
  myErr => {
    swal({title:"שגיאה בניסיון המחיקה ",icon:"error"})
  });
  }
});
}

else{
  swal({
    title: "האם אתה בטוח שברצונך למחוק חבילה זו?",
    text: "לחבילה זו יש בקשות למשלוח",
    icon: "warning",
    buttons:true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
     this.packageSer.deletePackage(p.packageCode,p.listWaiting).subscribe(
    myData => {
     this.myListPackage=myData;
     swal({title:"נמחק בהצלחה",icon:"success"})
    },
    myErr => {
      swal({title:"שגיאה בניסיון המחיקה ",icon:"error"})
    });
    }
  });
}
   }

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
