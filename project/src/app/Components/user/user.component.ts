import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { User } from 'src/app/Classes/user';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/Services/user.service';
import { ExistUserComponent } from '../exist-user/exist-user.component';
import { PackageComponent } from '../package/package.component';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  form: FormGroup;
  submitted=false;
  newUser:User;
  listUser:Array<User>=[];
  constructor(private dialog:MatDialog, private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder,
    public userSer: UserService,) { }

  ngOnInit(): void {
    this.initForm();
    this.activatedRoute.params.subscribe(
      myParams=>{
        this.userSer.getUsers().subscribe(
          myData=>{
            this.listUser=myData;
          },
        )}
    )
  }

  initForm() {
   this.form = this.formBuilder.group({
      code:['',Validators.required],
      name:['',Validators.required],
      telephone:['',Validators.required],
      gmail:['',Validators.required],
    })
  }

  addUser() {
 this.submitted=true;
 this.newUser=new User(this.form.value.code,this.form.value.name,this.form.value.telephone,this.form.value.gmail)
 this.userSer.addUser(this.newUser).subscribe(
  myData => { alert(myData);
    this.userSer.currentUser=this.newUser;
},
  myErr => { console.log(myErr.message);});
  const dialogRef = this.dialog.open(PackageComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  
  }
  openDialog() {
    const dialogRef = this.dialog.open(ExistUserComponent);
    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

 
}
