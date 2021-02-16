import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import Swal from 'sweetalert2';
import { DriveComponent } from '../drive/drive.component';
import { ExistUserComponent } from '../exist-user/exist-user.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog,public userSer:UserService,private router:Router) { }

  ngOnInit(): void {
  }

  openUserDialog() {
    const dialogRef = this.dialog.open(ExistUserComponent,{ disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  openDialog() {
    if(this.userSer.currentUser!=undefined)
    {
    const dialogRef = this.dialog.open(DriveComponent,{ disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  else
  alert("עליך להתחבר או להירשם לפני השימוש באתר")
  }
logOut()
{
  
  this.userSer.currentUser=undefined;
  console.log(this.userSer.currentUser);
 
}

  checkLogin()
  {
    if(this.userSer.currentUser==undefined)
    alert("עליך להירשם או להתחבר לפני השימוש באתר")
  
  }
  alertWithSuccess(){
    console.log("akert ")
    Swal.fire('Thank you...', 'You submitted succesfully!', 'success')
  }
  }
