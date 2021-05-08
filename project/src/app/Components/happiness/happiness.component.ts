import { Component, OnInit, Input, Output, EventEmitter, ViewEncapsulation } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute } from '@angular/router';
import { Happiness } from 'src/app/Classes/happiness';
import { HappinessService } from 'src/app/Services/happiness.service';
import swal from 'sweetalert'

@Component({
  selector: 'app-happiness',
  templateUrl: './happiness.component.html',
  styleUrls: ['./happiness.component.scss']
})
export class HappinessComponent implements OnInit {

  @Input('rating') public rating: number = 3;
  @Input('starCount') public starCount: number = 5;
  @Input('color') public color: string = 'primary';
  @Output() public ratingUpdated = new EventEmitter();

  public snackBarDuration: number = 2000;
  public ratingArr = [];
  idDelivery:string;
  idDeliveryFromURL:string;
  form:FormGroup;
  myHappiness:Happiness;
  submitted=false;

  starColor:StarRatingColor = StarRatingColor.primary;
  // starColorP:StarRatingColor = StarRatingColor.primary;
  // starColorW:StarRatingColor = StarRatingColor.warn;

  constructor(private snackBar: MatSnackBar,private happinSer:HappinessService,private route:ActivatedRoute) {
  }


  ngOnInit() {
    console.log("a "+this.starCount)
    for (let index = 0; index < this.starCount; index++) {
      this.ratingArr.push(index);
    }
  this.idDeliveryFromURL= this.route.snapshot.params['idDelivery'];
  }

  addHappiness(name:string, happiness:string)
  {
    debugger
    if(this.idDelivery)
 this.myHappiness=new Happiness(0,this.idDelivery,name,new Date(),this.rating,happiness)
 else
 this.myHappiness=new Happiness(0,this.idDeliveryFromURL,name,new Date(),this.rating,happiness)

 this.happinSer.addHappiness(this.myHappiness).subscribe(
  myData=>{swal({title:"תודה רבה על חוות דעתך!",text:"נוסף בהצלחה",icon:"success"})},
  myErr=>{swal({title:"שגיאה!",text:"חוות דעתך לא נקלטה במערכת , נסה שוב",icon:"error"}) }); 
  
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
  // accent = "accent",
  // warn = "warn"
}


