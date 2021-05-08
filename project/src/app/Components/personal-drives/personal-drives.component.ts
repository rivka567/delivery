import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Drive } from 'src/app/Classes/drive';
import { DriveService } from 'src/app/Services/drive.service';
import { UserService } from 'src/app/Services/user.service';
import swal from 'sweetalert';
import { DriveComponent } from '../drive/drive.component';
import { ShowAllHappinessComponent } from '../show-all-happiness/show-all-happiness.component';
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

checkListWaitingForDrive(d:Drive)
{
  debugger
  if(d.listWaiting.length!=0)
  {
  let filterDrives=d.listWaiting;
  //בדיקה האם החבילה הזו נסגרה עם לקוחות
  filterDrives=filterDrives.filter(d=>d.status==false)
  if(filterDrives.length!=0)
 swal({title:"נסיעה זו נסגרה עם "+filterDrives.length+" לקוחות",text:"האם אתה בטוח שברצונך למחוק נסיעה זו ותשלח הודעת ביטול ללקוחות אלו",icon:"warning"})
  else
  alert("נסיעה זו מקושרת לחבילות אחרות")
  }
else
swal({text:"האם אתה בטוח שברצונך למחוק נסיעה זו?",icon:"warning"})
this.deleteDrive(d)
}


deleteDrive(d:Drive)
{
  this.driveSer.deleteDrive(d,d.listWaiting).subscribe(
    myData => {
    this.myListDrive=myData;
    swal({
      title: "נמחק בהצלחה",
      icon: "success",     
      
    })
    },
    myErr => {
      console.log(myErr.message);
      swal({
        title: "שגיאה בעת ניסיון המחיקה",
        text:"נסה שנית",
        icon: "error",     
        
      })
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
