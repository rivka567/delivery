import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Drive } from 'src/app/Classes/drive';
import { Package } from 'src/app/Classes/package';
import { DriveService } from 'src/app/Services/drive.service';

@Component({
  selector: 'app-travel-list',
  templateUrl: './travel-list.component.html',
  styleUrls: ['./travel-list.component.scss']
})
export class TravelListComponent implements OnInit {

  allDrives:Array<Drive>;

  constructor(private driveSer:DriveService) { }

  ngOnInit(): void {
 this.getAllDrives();
  }

  getAllDrives()
  {
  this.driveSer.getDrives().subscribe(
      myData => {this.allDrives=myData
      console.log(this.allDrives)},
      myErr => {console.log("from subscribe"); 
      console.log(myErr.message);});
      debugger
    
  }

 

}
