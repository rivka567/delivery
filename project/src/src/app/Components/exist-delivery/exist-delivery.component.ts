import { Component, OnInit } from '@angular/core';
import { Delivery } from 'src/app/Classes/delivery';
import { DeliveryServiceService } from 'src/app/Services/delivery-service.service';


@Component({
  selector: 'app-exist-delivery',
  templateUrl: './exist-delivery.component.html',
  styleUrls: ['./exist-delivery.component.scss']
})
export class ExistDeliveryComponent implements OnInit {
  deliveryList: Array<Delivery>;
  delivery: Delivery = new Delivery();


  constructor(private deliverySer: DeliveryServiceService) { }

  ngOnInit(): void {
  }

 
  getDeliveryById(id: number) {
  
    
      this.deliverySer.getDeliveryById(id).subscribe(
        myData => { this.delivery = myData; },
        myErr => { alert(myErr.message); });
     
  }
}
