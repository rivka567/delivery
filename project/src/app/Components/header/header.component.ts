import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { DriveComponent } from '../drive/drive.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(public dialog: MatDialog,public userSer:UserService,private router:Router) { }

  ngOnInit(): void {
  }
  openDialog() {
    if(this.userSer.currentUser!=undefined)
    {
    const dialogRef = this.dialog.open(DriveComponent,{ disableClose: true });

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
    this.router.navigate(['/main'])
  }
  else
  alert("עליך להתחבר או להירשם לפני השימוש באתר")
  }

  checkLogin()
  {
    if(this.userSer.currentUser==undefined)
    alert("עליך להירשם או להתחבר לפני השימוש באתר")
    else
    this.router.navigate(['/home'])
  }

  }
