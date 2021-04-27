import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Happiness } from 'src/app/Classes/happiness';
import { HappinessService } from 'src/app/Services/happiness.service';


@Component({
  selector: 'app-happiness',
  templateUrl: './happiness.component.html',
  styleUrls: ['./happiness.component.scss']
})
export class HappinessComponent implements OnInit {

  @Input('rating') public rating: number = 3;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'accent';
  @Output() public ratingUpdated = new EventEmitter();

  public snackBarDuration: number = 2000;
  public ratingArr = [];
  idDelivery:string;
  form:FormGroup;
  myHappiness:Happiness;
  submitted=false;

  starColor:StarRatingColor = StarRatingColor.accent;
  starColorP:StarRatingColor = StarRatingColor.primary;
  starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(private snackBar: MatSnackBar,private happinSer:HappinessService) {
  }


  ngOnInit() {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
    
  }

  addHappiness(name:string, happiness:string)
  {
    debugger
this.myHappiness=new Happiness(0,this.idDelivery,name,new Date(),this.rating,happiness)
this.happinSer.addHappiness(this.myHappiness).subscribe(
  myData=>{alert("succsess")},
  myErr=>{alert("error!!"); }); 
  
  }
  onRatingChanged(rating){
    console.log(rating);
    this.rating = rating;
  }

  onClick(rating:number) {
    console.log(rating)
    this.rating=rating;
    this.snackBar.open('You rated ' + rating + ' / ' + this.starCount, '', {
      duration: this.snackBarDuration
    });
    this.ratingUpdated.emit(rating);
    return false;
  }

  showIcon(index:number) {
    if (this.rating >= index + 1) {
      return 'star';
    } else {
      return 'star_border';
    }
  }

}
export enum StarRatingColor {
  primary = "primary",
  accent = "accent",
  warn = "warn"
}


