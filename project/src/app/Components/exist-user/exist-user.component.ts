import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Classes/user';
import { MatDialog } from '@angular/material/dialog';
import { PackageComponent } from '../package/package.component';
import { BuiltinType } from '@angular/compiler';
import { UserComponent } from '../user/user.component';
import { ValidatorFn } from '@angular/forms';

@Component({
  selector: 'app-exist-user',
  templateUrl: './exist-user.component.html',
  styleUrls: ['./exist-user.component.scss']
})
export class ExistUserComponent implements OnInit {

  user:User =new User();

  constructor(private UserSer: UserService,private dialog:MatDialog) { }
  vis=false;
 

  ngOnInit(): void {
   console.log(this.vis);

  }

  openDialog() {
    const dialogRef = this.dialog.open(UserComponent,{ disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  
  }

  getUserById(id:string) {   
        this.UserSer.getUserById(id).subscribe(
        myData => { this.user = myData; 
        this.UserSer.currentUser=myData;
        },
        myErr => { alert(myErr.message); });
     
  }

  openDialogPackage() {
    const dialogRef = this.dialog.open(PackageComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  sendCodeByEmail(mail:string)
  {
  debugger
    this.UserSer.sendCodeByEmail(mail).subscribe(
      myData=>{alert(myData)},
      myErr=>{console.log(myErr)}
      
      );
  }

}
