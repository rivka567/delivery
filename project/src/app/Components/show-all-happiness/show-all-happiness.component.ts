
import { Happiness } from 'src/app/Classes/happiness';
import { HappinessService } from 'src/app/Services/happiness.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DriveService } from 'src/app/Services/drive.service';
import { Drive } from 'src/app/Classes/drive';

@Component({
  selector: 'app-show-all-happiness',
  templateUrl: './show-all-happiness.component.html',
  styleUrls: ['./show-all-happiness.component.scss']
})
export class ShowAllHappinessComponent implements OnInit {

  constructor(private HappiSer:HappinessService,private driveSer:DriveService) { }
any:Array<Drive>=[];
  listHappinessByDeliveryId:Happiness[]=[];
  deliveryId:string;
   @Input('rating') public rating: number = 3;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'accent';
  @Output() public ratingUpdated = new EventEmitter();

  public snackBarDuration: number = 2000;
  public ratingArr = [];
 
  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  ngOnInit(): void {
   //this.getHappinessByDeliveryId();
  //  this.GetAllHappiness();
  //   console.log("a "+this.starCount)
  //   for (let index = 0; index < this.starCount; index++) {
  //     this.ratingArr.push(index);
  //   }
    this.GetAllHappiness();
  }
  GetAllHappiness()
  {
    debugger
    this.HappiSer.GetAllHappiness().subscribe(
      myData=>
     {
        console.log(myData);
     },
      myErr=>{console.log(myErr)} 
      );

    // this.driveSer.getAllDrives().subscribe(
    //   myData => {
    //     debugger;
    //     this.any=myData;
    //    console.log(myData)
    //   },
    //   myErr => {
    //    alert("erorrrrr")
    //   });
  }

  getHappinessByDeliveryId()
  {
    debugger
    this.HappiSer.getHappinessByDeliveryId(this.deliveryId).subscribe(
      myData=>{this.listHappinessByDeliveryId=myData;
        console.log(myData);
     },
      myErr=>{console.log(myErr)}
    )
  }
  onRatingChanged(rating){
    console.log(rating);
    this.rating = rating;
  }

  onClick(rating:number) {
    console.log(rating)
    this.rating=rating;
    this.ratingUpdated.emit(rating);
    return false;
  }


}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}
