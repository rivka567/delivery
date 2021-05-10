import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { title } from 'process';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';
import swal from 'sweetalert';

@Component({
  selector: 'app-update-personal-details',
  templateUrl: './update-personal-details.component.html',
  styleUrls: ['./update-personal-details.component.scss']
})
export class UpdatePersonalDetailsComponent implements OnInit {

  constructor(private userSer:UserService,private formBuilder:FormBuilder) { }

  myUser:User;
  form:FormGroup;
  get f(){return this.form.controls;}

  ngOnInit(): void {
    debugger
    console.log(this.myUser);
    debugger
    this.initForm();
  }

  initForm()
  {
    this.form=this.formBuilder.group({
      code:[ this.myUser.userCode],
      name:[this.myUser.userName||'',[Validators.required,Validators.pattern("[א-ת-a-z-A-Z]*")]],
      email:[this.myUser.userMail||'',[Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]]
    })
  }
  
  updateUser()
  {
    
    debugger
    this.myUser=new User(this.myUser.userCode,this.form.value.name,this.form.value.email);
    this.userSer.updateUser(this.myUser).subscribe(
      myData=>{
        this.userSer.currentUser=myData
        swal({title:"עודכן בהצלחה!",icon:"success"})
      },
      myErr=>{
        console.log({title:"שגיאה בעדכון המשתמש!",text:"נסה שנית",icon:"error"})
      }
    )
  }
}
