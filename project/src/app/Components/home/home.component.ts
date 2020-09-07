import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserComponent } from '../user/user.component';
import { UserService } from 'src/app/Services/user.service';
import { TempComponent } from '../temp/temp.component';
import { User } from 'src/app/Classes/user';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 
})
export class HomeComponent implements OnInit {
 
  constructor(public dialog: MatDialog, private userSer:UserService) { }

  ngOnInit(): void {
  }
  openDialogOrder() {
    const dialogRef = this.dialog.open(UserComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  SendMail(sender:string,contactAddress:string,subject:string,body:string)
  {
    debugger
  this.userSer.sendEmail(sender,contactAddress,subject,body).subscribe(data=>alert(data));
  }
 
}

