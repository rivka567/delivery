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
import swal from 'sweetalert'

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
  formEmail:FormGroup;

  get f() { return this.form.controls; }
  get fe() { return this.form.controls; }


  ngOnInit(): void {
  this.initForm();
  this.initFormEmail();
  }

initForm(){
  this.form = this.formBuilder.group({
    //Validators.pattern("(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{7,}")
    password:['',[Validators.required,Validators.minLength(6)]],
  })
  }

  initFormEmail()
  {
    this.formEmail=this.formBuilder.group({
      email:['',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]],
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
        myErr => { swal({title:"משתמש זה לא קיים במערכת",text:"נסה שנית ",icon:"error"}); });
      }
        else
        swal("לא הוקש סיסמא")
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
      myData=>{
        if(myData=='מייל זה לא קיים במערכת')
        swal({title:myData,text:"נסה שנית",icon:"error"})
        else
        swal({title:"נשלח בהצלחה",icon:"success"})
      },
      myErr=>{}    
      );
    }
  }

}
