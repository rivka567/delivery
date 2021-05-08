
import { Happiness } from 'src/app/Classes/happiness';
import { HappinessService } from 'src/app/Services/happiness.service';
import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { DriveService } from 'src/app/Services/drive.service';
import { Drive } from 'src/app/Classes/drive';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-show-all-happiness',
  templateUrl: './show-all-happiness.component.html',
  styleUrls: ['./show-all-happiness.component.scss']
})
export class ShowAllHappinessComponent implements OnInit {

  constructor(private HappiSer:HappinessService,private driveSer:DriveService,private snackBar: MatSnackBar) { }

  listHappinessByDeliveryId:Happiness[]=[];
  deliveryId:string;
  @Input('color') public color: string = 'primary';
  @Output() public ratingUpdated = new EventEmitter();

  public snackBarDuration: number = 2000;
  public ratingArr = [];
  public rating:number;
  public starCount: number = 5;
  public len:number;

   starColor:StarRatingColor = StarRatingColor.lightskyblue;

  // starColor:StarRatingColor = StarRatingColor.accent;
  // starColorP:StarRatingColor = StarRatingColor.primary;
  // starColorW:StarRatingColor = StarRatingColor.warn;

  ngOnInit(): void {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    this.getHappinessByDeliveryId();
  }

  getHappinessByDeliveryId()
  {
    debugger
    this.HappiSer.getHappinessByDeliveryId(this.deliveryId).subscribe(
      myData=>
    {
      this.listHappinessByDeliveryId=myData;
      this.len=this.listHappinessByDeliveryId.length;
      console.log(myData);
     },
      myErr=>{console.log(myErr)} );
  }

  showIcon(index:number,level:number) {
    this.rating=level;
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}

export enum StarRatingColor {
  lightskyblue = "lightskyblue",
  // accent = "accent",
  // warn = "warn"
}
