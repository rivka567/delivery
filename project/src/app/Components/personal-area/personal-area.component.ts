import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from 'src/app/Classes/user';
import { UserService } from 'src/app/Services/user.service';

@Component({
  selector: 'app-personal-area',
  templateUrl: './personal-area.component.html',
  styleUrls: ['./personal-area.component.scss']
})
export class PersonalAreaComponent implements OnInit {

  constructor(private userSer:UserService, private route:ActivatedRoute, private router:Router) { }

  ngOnInit(): void {
    this.router.navigate(['/personal-area/personal-details'])
    const id= this.route.snapshot.params['id'];

      }
         
    

}
