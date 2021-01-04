import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, EmailValidator } from '@angular/forms';
import { User } from 'src/app/Classes/user';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
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
  hide=true;
  delivery=false;
  listUser:Array<User>=[];
  constructor(private dialog:MatDialog,private router:Router, private activatedRoute:ActivatedRoute, private formBuilder: FormBuilder,
   private userSer: UserService,) { }

  ngOnInit(): void {
    this.initForm();
    // this.activatedRoute.params.subscribe(
    //   myParams=>{
    //     this.userSer.getUsers().subscribe(
    //       myData=>{
    //         this.listUser=myData;
    //       },
    //     )}
    // )
  }

  initForm() {
   this.form = this.formBuilder.group({
      password:['',[Validators.required,Validators.minLength(3)]],
      name:['',[Validators.required,Validators.pattern("[א-ת-a-z-A-Z]*")]],
      telephone:['',[Validators.required,Validators.pattern("[0-9]*")]],
      gmail:['',[Validators.required,Validators.email]],
      age:['',Validators.required],
      mes:[''],
    })
  }

  addUser() {
    debugger
 this.submitted=true;
 this.newUser=new User(this.form.value.password,this.form.value.name,this.form.value.telephone,this.form.value.gmail,this.form.value.age,this.form.value.mes)
 this.userSer.addUser(this.newUser).subscribe(
  myData => { alert(myData);
    this.userSer.currentUser=this.newUser;
    console.log(this.newUser);
},
  myErr => { console.log(myErr.message);});
  }
}
