import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-update-personal-details',
  templateUrl: './update-personal-details.component.html',
  styleUrls: ['./update-personal-details.component.scss']
})
export class UpdatePersonalDetailsComponent implements OnInit {

  constructor(private userSer:UserService) { }

  myUser:User;
  ngOnInit(): void {
    this.myUser=this.userSer.currentUser;
  }
  
  updateUser(code:string,name:string,mail:string)
  {
    
    debugger
    this.myUser=new User(code,name,mail);
    this.userSer.updateUser(this.myUser).subscribe(
      myData=>{
        this.userSer.currentUser=myData
        alert("update")
      },
      myErr=>{
        console.log(myErr)
      }
    )
  }
}
