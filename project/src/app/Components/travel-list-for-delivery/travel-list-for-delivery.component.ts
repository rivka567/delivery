import { Component, OnInit } from '@angular/core';
import { Package } from 'src/app/Classes/package';
import { DriveService } from 'src/app/Services/drive.service';

@Component({
  selector: 'app-travel-list-for-delivery',
  templateUrl: './travel-list-for-delivery.component.html',
  styleUrls: ['./travel-list-for-delivery.component.scss']
})
export class TravelListForDeliveryComponent implements OnInit {
  travelList:Array<Package>=[]
  pack:Package;
  vis:false;
    constructor(public driveSer:DriveService) { }
  
    ngOnInit(): void {
    }
  
    //כאן צריך לשנות לפי גוגל מאפ.............
    travelsListByPlace(from,to)
    {
      
      //  for(var i=0;i<this.travelList.length;i++)
      //  {
      //     if(this.driveSer.fromPlace==from)
             
      // 
    }
  
    moreDetailsOnTravel()
    {
  
    }
   
  
}
