import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/Services/user.service';
import { User } from 'src/app/Classes/user';
import { MatDialog } from '@angular/material/dialog';
import { PackageComponent } from '../package/package.component';
import { BuiltinType } from '@angular/compiler';
import { UserComponent } from '../user/user.component';
import { FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { EmailManagementService } from 'src/app/Services/email-management.service';
import { Validators } from '@angular/forms';

@Component({
  selector: 'app-exist-user',
  templateUrl: './exist-user.component.html',
  styleUrls: ['./exist-user.component.scss']
})
export class ExistUserComponent implements OnInit {

  user:User =new User();
  hide=true;
  
  constructor(private formBuilder:FormBuilder, private emailSer:EmailManagementService, private UserSer: UserService,private dialog:MatDialog) { }
  showEmailInput=false;
  form:FormGroup;
  submitted=false;

  ngOnInit(): void {
  this.initForm();
  }

initForm(){
  this.form = this.formBuilder.group({
    password:['',[Validators.required,Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}")]],
  })
  }

  openDialog() {
    const dialogRef = this.dialog.open(UserComponent,{ disableClose: true })
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  
  }

  getUserById(id:string)
  { 
    debugger    
    if(id)
    {
        this.UserSer.getUserById(id).subscribe(
        myData => { this.user = myData; 
        this.UserSer.currentUser=myData;
       },
        myErr => { alert("לקוח זה לא קיים במערכת"); });
      }
        else
        alert("לא הוקש סיסמא")
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
  if(!mail)
  alert("הקש כתובת מייל")
  else{
    this.emailSer.sendCodeByEmail(mail).subscribe(
      myData=>{alert(myData)},
      myErr=>{console.log(myErr)}    
      );
    }
  }

}
