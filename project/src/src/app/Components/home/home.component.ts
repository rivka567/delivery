import { Component, OnInit } from '@angular/core';
import { OrderComponent} from '../order/order.component'
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
 
})
export class HomeComponent implements OnInit {
 

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }
  openDialogOrder() {
    const dialogRef = this.dialog.open(OrderComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }
  
}
