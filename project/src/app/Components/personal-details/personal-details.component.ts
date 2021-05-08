import { componentFactoryName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';
import { UpdatePersonalDetailsComponent } from '../update-personal-details/update-personal-details.component';

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html',
  styleUrls: ['./personal-details.component.scss']
})
export class PersonalDetailsComponent implements OnInit {

  constructor(public userSer:UserService,private dialog:MatDialog) { }

  myUser:User;
  ngOnInit(): void {
    this.myUser=this.userSer.currentUser;
  }

  openDialog()
  {
    const dialogRef = this.dialog.open(UpdatePersonalDetailsComponent,{ disableClose: true })
    dialogRef.componentInstance.myUser=this.userSer.currentUser;
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
      this.myUser=this.userSer.currentUser;
    });
  }

  // updateUser(code:string,name:string,mail:string)
  // {
    
  //   debugger
  //   this.myUser=new User(code,name,mail);
  //   this.userSer.updateUser(this.myUser).subscribe(
  //     myData=>{
  //       this.myUser=myData
  //     },
  //     myErr=>{
  //       console.log(myErr)
  //     }
  //   )
  // }
}
